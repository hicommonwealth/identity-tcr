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
              // TODO: approve the registry to transfer tokens on behalf of user
              // TODO: once approved, apply for listing using IPFS hash
              // FIXME: UNTESTED and NOT MERGED INTO DEMO YET
              const listingHash = props.web3.sha3(props.multihash);
              const amount = props.tcrMinAmount;
              const data = props.multihash;
              props.contracts.Regsitry.apply(listingHash, amount, data)
              .then(result => {
                props.onClick({
                  action: 'TCR_APPLY',
                  payload: result,
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