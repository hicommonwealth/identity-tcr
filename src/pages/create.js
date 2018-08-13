import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const CreatePage = (props) => {
  return (
    {
      header: 'Step 1. Create or input an Ethereum public address.',
      subtitle: 'Automatically pulled if web3 instance is found in browser.',
      content: (
        <div className={'btn-container'}>
          <Input
            placeholder={'Enter your Ethereum address'}
            value={(props.web3) ? props.web3.eth.coinbase : null}
            disabled={(props.web3.eth.coinbase) ? true : false}
          />
          <Button primary disabled={(props.disabled[0])} onClick={props.onClick}>{'Proceed to signing step'}</Button>
        </div>
      ),
    }
  );
};

export default CreatePage;