import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const PublishTCRPage = (props) => {
  return (
    {
      header: 'Step 7. Publish the record hash to the Commonwealth Token Curated Registry',
      subtitle: 'Create the identity links from Ethereum <-> IPFS <-> Twitter',
      content: (
        <div className={'btn-container'}>
          <Input
            value={props.multihash}
            disabled
          />
          <Button primary onClick={() => {
              // refer: https://github.com/kangarang/tcr-ui/blob/master/docs/IPFS.md
              const listingHash = props.web3.sha3(props.twitterHandle);
              const amount = props.contractParams.Parameterizer.minDeposit;
              const data = props.multihash;

              const Token = props.web3.eth.contract(props.contracts.Token.abi).at(props.contracts.Token.address);
              const Registry = props.web3.eth.contract(props.contracts.Registry.abi).at(props.contracts.Registry.address);

              const cb = (e) => {
                console.log(e, arguments, 'callback from batch tx')
              };

              // TODO: Find better solution to this although this seems to be the status quo
              var batch = props.web3.createBatch()

              // FIXME: These transactions are out of order because MetaMask presents them in reverse,
              //        therefore we add them in reversed order so the user processes them correctly.
              //        
              //        refer to: https://github.com/rstormsf/Dapptester/blob/master/src/App.js for a workaround used below
              //        refer to: https://github.com/MetaMask/metamask-extension/issues/3425
              batch.add(Registry.apply(listingHash, amount, data, { from: props.web3.eth.coinbase }, cb));
              batch.add(Token.approve(Registry.address, amount, { from: props.web3.eth.coinbase }, cb));
              batch.execute();
            }}
            disabled={(props.disabled[6])}>
            Publish
          </Button>
        </div>
      ),
    }
  );
};

export default PublishTCRPage;