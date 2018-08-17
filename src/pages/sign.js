import React from 'react';
import { Button, Input } from 'semantic-ui-react'

import ethUtil from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';

const SignPage = (props) => {
  return (
    {
      header: 'Step 2. Sign a message with your Twitter handle',
      subtitle: 'Create a digital signature of a message, indicating ownership of an address.',
      content: (
        <div className={'btn-container'}>
          <Input
            value={props.twitterHandle}
            placeholder={'Enter your Twitter handle.'}
            onChange={(e) => (props.onInputChange(e))}
          />
          <Button primary disabled={props.twitterHandle.length === 0} onClick={() => {
            const timestamp = new Date(Date.now());
            const twitterHandle = props.twitterHandle;
            const from = props.web3.eth.coinbase;
            

            const text = `
            # Commonwealth Identity Attestation Agreement #

            By signing this message, the owner of the Ethereum address ${from} pledges potential ownership over the Twitter handle ${twitterHandle}. 

            The finality of such a pledge will be granted through further process in the Commonwealth Identity TCR.

            This message is dated at ${timestamp} and signed hereafter.
            `;
            

            const msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'))
            const params = [msg, from];
            const method = 'personal_sign';

            props.web3.currentProvider.sendAsync({ method, params, from }, function (err, result) {
              if (err) return console.error(err)
              if (result.error) return console.error(result.error)

              const msgParams = { data: msg, sig: result.result };
              const recovered = sigUtil.recoverPersonalSignature(msgParams)

              if (recovered === from ) {
                console.log('SigUtil Successfully verified signer as ' + from)
                props.onClick({
                  action: 'SIGNATURE',
                  payload: { msgParams },
                });
              } else {
                console.dir(recovered)
                console.log('SigUtil Failed to verify signer when comparing ' + recovered.result + ' to ' + from)
                console.log('Failed, comparing %s to %s', recovered, from)
              }
            });
          }}>{'Sign the message'}</Button>
        </div>
      ),
    }
  );
};

export default SignPage;