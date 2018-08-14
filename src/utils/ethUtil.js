import Promise from 'bluebird';
import Contract from 'truffle-contract';

import RegistryABI from '../contracts/Registry';
import TokenABI from '../contracts/EIP20';
import ParameterizerABI from '../contracts/Parameterizer';
import PLCRVotingABI from '../contracts/PLCRVoting';

import config from '../config';

const Utility = {
  getContracts: async (web3) => {
    const Registry = Contract(RegistryABI);
    const Token = Contract(TokenABI);
    const Parameterizer = Contract(ParameterizerABI);
    const PLCRVoting = Contract(PLCRVotingABI);

    let network;
    
    return new Promise((resolve, reject) => {
      web3.version.getNetwork( async (err, netId) => {
        switch (netId) {
          case "1":
            network = config.networks.mainnet;
            break;
          case "3":
            network = config.networks.ropsten;
            break;
          case "4":
            network = config.networks.rinkeby;
            break;
          default:
            reject('This is an unknown network.');
        }

        Registry.setProvider(web3.currentProvider);
        Token.setProvider(web3.currentProvider);
        Parameterizer.setProvider(web3.currentProvider);
        PLCRVoting.setProvider(web3.currentProvider);

        const contracts = await Promise.props({
          Registry: Registry.at(network.Registry),
          Token: Token.at(network.Token),
          Parameterizer: Parameterizer.at(network.Parameterizer),
          PLCRVoting: PLCRVoting.at(network.PLCRVoting),
        });

        resolve(contracts);
      });
    });
  },

  getContractParameters: async (contracts) => {
      const propPromises = Object.keys(config.contractParameters).map(contractName => {
        const promises = config.contractParameters[contractName].map(param => {
          return { [param]: contracts[contractName].get(param) };
        }).reduce((prev, curr) => (Object.assign({}, prev, curr)));
 
        return { [contractName]: Promise.props(promises) };
      }).reduce((prev, curr) => (Object.assign({}, prev, curr)));

      return await Promise.props(propPromises);
  },
};

export default Utility;