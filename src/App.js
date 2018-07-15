// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import getWeb3 from './utils/getWeb3'

import Landing from './Landing'
import LoadingPage from './LoadingPage'


class App extends Component {
  state = {
    web3: null,
    step: 0,
    // AccountsInstance: null,
    // accounts: null
  }

  async componentWillMount() {
    try {
      const results = await getWeb3;
      this.setState({ web3: results.web3 })

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

  handleStepClick() {
    this.setState({
      step: this.state.step + 1,
    });
  }

  render() {
    return (
      <Router>
        { this.state.web3 === null ? <LoadingPage /> : <div>
          <Route exact path="/" render={(props) => (
            <Landing handleStepClick={this.handleStepClick.bind(this)} {...props} {...this.state} /> 
          )} />
          {/*<Route exact path="/student/signup" render={(props) => ( <StudentSignup {...props} {...this.state} /> )} />*/}
        </div> }
      </Router>
    )
  }
}

export default App;
