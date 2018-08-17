import React from 'react';
import { Button, Message } from 'semantic-ui-react'

const MessageTemplate = (props) => (
  <Message>
    <Message.Header>{props.header}</Message.Header>
    {props.children}
  </Message>
)

const VerifyPage = (props) => {
  return (
    {
      header: 'Step 6. Verify your record!',
      subtitle: 'Your Ethereum and Twitter identity link are now published on IPFS.',
      content: (
        <div>
          <MessageTemplate header={'Multihash'}>
            <p>{props.multihash}</p>
          </MessageTemplate>
          <MessageTemplate header={'Address'}>
            <p>{props.address}</p>
          </MessageTemplate>
          <MessageTemplate header={'Message'}>
            <textarea disabled value={props.message} />
          </MessageTemplate>
          <MessageTemplate header={'Signature'}>
            <textarea disabled value={props.signature} />
          </MessageTemplate>
          <Button primary disabled={(props.disabled[6])} onClick={props.onClick}/>
        </div>
      ),
    }
  );
};

export default VerifyPage;