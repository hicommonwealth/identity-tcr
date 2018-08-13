import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const PublishIPFSPage = (props) => {
  return (
    {
      header: 'Step 3. Publish the signed message and additional data to IPFS.',
      subtitle: 'Store this record to begin the proof process.',
      content: (
        <div className={'btn-container'}>
          <Input
            value={props.signature}
            disabled
          />
          <Button primary disabled={(props.disabled[2])} onClick={() => {
            const obj = {
              Data: new Buffer(JSON.stringify({
                address: props.web3.eth.coinbase,
                hash: props.hash,
                signature: props.signature,
                timestamp: props.timestamp,
              })),
              Links: [],
            };

            props.ipfs.object.put(obj, (err, node) => {
              if (err) console.error('Error putting object', obj);
              else props.onClick({
                action: 'IPFS_PUBLISH',
                payload: {
                  multihash: node.toJSON().multihash,
                },
              });
            });
          }}>{'Publish to IPFS'}</Button>
        </div>
      ),
    }
  );
};

export default PublishIPFSPage;