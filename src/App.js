// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import getWeb3 from './utils/getWeb3'
import getIpfs from './utils/getIpfs'

import Landing from './Landing'
import LoadingPage from './LoadingPage'

const NETWORKS = {
  rinkeby: {
    // Not wholly important for usage
    Migrations: "0x6c749471db11d19453ec9fb26f7d066911d69939",
    DLL: "0x1af320ce14ea844f4098b9e98c607e84e26c3051",
    AttributeStore: "0x6abf4e152eda3c317ce03e671b052c14d70f8d5e",
    PLCRFactory: "0x9c82cb53efe7be593c51c1492eb8f8d52cdad37d",
    ParameterizerFactory: "0x3f17962ce2435a5af92e0bb7ca3762fd78fcb14a",
    RegistryFactory: "0x29e7d60a15647ed711d6ad92ee7cb8b3c75c24c2",
    // Important for usage
    Token: "0xe9f742fcd0e57d6e53fb75934bd6b0624de42e37",
    PLCRVoting: "0x296b7d18b079f834d3ee461eb621f0a7929dc226",
    Parameterizer: "0x2288aaba6c00f72d342c44fc8290997820669585",
    Registry: "0x113a65cb91d4085f0a8faf8f51f6ac73e5ab14fd",
  }
}

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

      results.web3.version.getNetwork((err, netId) => {
        this.setState({
          netId: netId,
          web3: results.web3,
          message: `sha3(Date.now()||${results.web3.eth.coinbase.slice(2)})`,
          ipfs: node,
        });
      })

      // // configure and include the smart contract
      // const contract = require('truffle-contract')
      // const Accounts = contract(AccountsContract)
      
      // Accounts.setProvider(this.state.web3.currentProvider)
    
      // // Get accounts.
      // this.state.web3.eth.getAccounts(async (error, accounts) => {
      //   const instance = await Accounts.deployed();
      //   this.setState({ accounts: accounts, AccountsInstance: instance });
      // })
    } catch (e) {
      console.log('Error finding web3.')
    }
  }

  componentDidMount() {
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
