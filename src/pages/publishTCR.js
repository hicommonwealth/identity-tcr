import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const PublishTwitterPage = (props) => {
  return (
    {
      header: 'Step 7. Publish the final record to the Commonwealth Token Curated Registry',
      subtitle: 'Create the identity links from Ethereum <-> IPFS <-> Twitter',
      content: (
        <div className={'btn-container'}>
          <Input
            value={props.signature}
            disabled
          />
          <Button primary
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=Attesting%20to%20my%20Ethereum%20identity%20using%20the%20Commonwealth%20protocol!%0A%0AIPFS Multihash: ${props.multihash}%0AEthereum%20address: ${props.web3.eth.coinbase}`}
            onClick={() => {
              props.web3.eth.Contract(props.tcrContractABI).at(props.tcrContractAddress)
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