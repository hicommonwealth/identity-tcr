/* global artifacts */

const RegistryFactory = artifacts.require('tcr/RegistryFactory.sol');
const DLL = artifacts.require('dll/DLL.sol');
const AttributeStore = artifacts.require('attrstore/AttributeStore.sol');
const ParameterizerFactory = artifacts.require('tcr/ParameterizerFactory.sol');

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../conf/config.json'));
const paramConfig = config.paramDefaults;

async function setup() {
  const registryFactory = await RegistryFactory.deployed();
  const registryReceipt = await registryFactory.newRegistryWithToken(
    config.token.supply,
    config.token.name,
    config.token.decimals,
    config.token.symbol,
    [
      paramConfig.minDeposit,
      paramConfig.pMinDeposit,
      paramConfig.applyStageLength,
      paramConfig.pApplyStageLength,
      paramConfig.commitStageLength,
      paramConfig.pCommitStageLength,
      paramConfig.revealStageLength,
      paramConfig.pRevealStageLength,
      paramConfig.dispensationPct,
      paramConfig.pDispensationPct,
      paramConfig.voteQuorum,
      paramConfig.pVoteQuorum,
    ],
    config.name,
  );

  const {
    token,
    plcr,
    parameterizer,
    registry,
  } = registryReceipt.logs[0].args;

  return { token, plcr, parameterizer, registry };
}

module.exports = (deployer) => {
  // link libraries
  deployer.link(DLL, RegistryFactory);
  deployer.link(AttributeStore, RegistryFactory);

  return deployer.deploy(RegistryFactory, ParameterizerFactory.address)
  .then(async () => {
    const addr = await setup();
    console.log(addr);
  });
};
