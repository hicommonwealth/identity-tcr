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
      step: 0,
      message: null,
      signature: null,
      ipfs: null,
      ipfsData: {
        address: null,
        hash: null,
        signature: null,
      }
      // AccountsInstance: null,
      // accounts: null
    }
  }

  async componentWillMount() {
    try {
      const results = await getWeb3;
      const node = await getIpfs;
      const contracts = await ethUtil.getContracts(results.web3);
      const contractParams = await ethUtil.getContractParameters(contracts);

      this.setState({
        contracts: contracts,
        contractParams: contractParams,
        web3: results.web3,
        message: `sha3(Date.now()||${results.web3.eth.coinbase.slice(2)})`,
        ipfs: node,
      })
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
            signature: data.payload.signature,
            hash: data.payload.hash,
            timestamp: data.payload.timestamp,
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
            ipfsData: data.payload,
          });
          break;
        default:
          break;
      }
    }

    this.setState({ step: this.state.step + 1 });
  }

  render() {
    return (
      <Router>
        { this.state.web3 === null ? <LoadingPage /> : <div>
          <Route exact path="/" render={(props) => (
            <Landing onClick={this.onClick.bind(this)} {...props} {...this.state} /> 
          )} />
          {/*<Route exact path="/student/signup" render={(props) => ( <StudentSignup {...props} {...this.state} /> )} />*/}
        </div> }
      </Router>
    )
  }
}

export default App;
