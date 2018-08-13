import React from 'react';
import { Button, Input } from 'semantic-ui-react'

const SignPage = (props) => {
  return (
    {
      header: 'Step 2. Sign a message with your Ethereum private key',
      subtitle: 'Create a digital signature of a message, indicating ownership of an address.',
      content: (
        <div className={'btn-container'}>
          <Input
            value={props.message}
            disabled
          />
          <Button primary disabled={(props.disabled[1])} onClick={() => {
            const timestamp = Buffer.from(Date.now().toString(), 'utf-8');
            const address = Buffer.from(props.web3.eth.coinbase.slice(2), 'utf-8');
            const hash = props.web3.sha3(Buffer.concat([timestamp, address]).toString());

            props.web3.eth.sign(props.web3.eth.coinbase, hash, (err, result) => {
              if (err) console.error(`Error signing message: ${err}`);
              else props.onClick({
                action: 'SIGNATURE',
                payload: {
                  signature: result,
                  timestamp: timestamp.toString(),
                  hash: hash.toString(),
                },
              });
            });
          }}>{'Sign the message'}</Button>
        </div>
      ),
    }
  );
};

export default SignPage;