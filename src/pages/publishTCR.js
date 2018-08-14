import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const PublishTwitterPage = (props) => {
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
          <Button primary
            onClick={() => {
              const { Token, Registry } = props.contracts;
              const listingHash = props.web3.sha3(props.multihash);
              const amount = props.contractParams.Parameterizer.minDeposit;
              const data = props.multihash;

              // approve token transfer before applying for a listing, assume min amount
              Token.approve(Registry.address, amount, { from: props.web3.eth.coinbase })
              .then(() => {
                // once approved, apply for listing using IPFS hash
                props.contracts.Registry.apply(listingHash, amount, data)
                .then(result => {
                  props.onClick({
                    action: 'TCR_APPLY',
                    payload: result,
                  });
                });
              });
            }}
            disabled={(props.disabled[6])}>
            Publish
          </Button>
        </div>
      ),
    }
  );
};

export default PublishTwitterPage;