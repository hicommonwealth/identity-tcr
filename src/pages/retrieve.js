import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const RetrievePage = (props) => {
  return (
    {
      header: 'Step 5. Retrieve your record!',
      subtitle: 'Your Ethereum and Twitter identities are now linked.',
      content: (
        <div className={'btn-container'}>
          <Input
            value={props.multihash}
            disabled
          />
          <Button primary disabled={(props.disabled[4])} onClick={() => {
            props.ipfs.object.get(props.multihash, (err, result) => {
              if (err) console.error('Error retrieving multihash data', err);
              else props.onClick({
                action: 'IPFS_VERIFY',
                payload: JSON.parse(result.toJSON().data),
              });
            });
          }}>{'Verify data from IPFS'}</Button>
        </div>
      ),
    }
  );
};

export default RetrievePage;