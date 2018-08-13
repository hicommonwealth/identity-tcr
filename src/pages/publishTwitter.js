import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const PublishTwitterPage = (props) => {
  return (
    {
      header: 'Step 4. Post the transcript on Twitter to link your identities',
      subtitle: 'Attest to your signature with your social identity.',
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
              window.twttr.events.bind(
                'tweet',
                function (event) {
                  setTimeout(() => {
                    return props.onClick({
                      action: 'TWEET',
                      payload: { event },
                    });
                  }, 5000);
                }
              );
            }}
            disabled={(props.disabled[3])}>
            Tweet
          </Button>
        </div>
      ),
    }
  );
};

export default PublishTwitterPage;