// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import getWeb3 from './utils/getWeb3'
import getIpfs from './utils/getIpfs'
import ethUtil from './utils/ethUtil';

import Landing from './Landing'
import LoadingPage from './LoadingPage'

class App extends Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      twitterHandle: '',
      step: 0,
      address: null,
      message: '',
      signature: '',
      ipfs: null,
    }
  }

  async componentWillMount() {
    try {
      const results = await getWeb3;
      const node = await getIpfs;
      const contracts = await ethUtil.getContracts(results.web3);
      const contractParams = await ethUtil.getContractParameters(contracts);

      this.setState({
        address: results.web3.eth.coinbase,
        contracts: contracts,
        contractParams: contractParams,
        web3: results.web3,
        ipfs: node,
      });

    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    // TODO: Handle updates on network changes to reload contracts and more.
    // this.state.web3.currentProvider.publicConfigStore.on('update', callback);
  }

  onClick(data) {
    if (data) {
      switch (data.action) {
        case 'SIGNATURE':
          this.setState({
            message: data.payload.msgParams.data,
            signature: data.payload.msgParams.sig,
          });
          break;
        case 'IPFS_PUBLISH':
          this.setState({
            multihash: data.payload.multihash,
          });
          break;
        case 'TWEET':
          break;
        case 'IPFS_VERIFY':
          this.setState({
            ...data.payload,
          });
          break;
        default:
          break;
      }
    }

    this.setState({ step: this.state.step + 1 });
  }

  onInputChange(e) {
    this.setState({
      twitterHandle: e.target.value,
    });
  }

  render() {
    return (
      <Router>
        { this.state.web3 === null ? <LoadingPage /> : <div>
          <Route exact path="/" render={(props) => (
            <Landing {...props} {...this.state}
              onClick={this.onClick.bind(this)}
              onInputChange={this.onInputChange.bind(this)}/> 
          )} />
          {/*<Route exact path="/student/signup" render={(props) => ( <StudentSignup {...props} {...this.state} /> )} />*/}
        </div> }
      </Router>
    )
  }
}

export default App;
