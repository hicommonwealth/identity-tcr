import React from 'react';
import { Header } from 'semantic-ui-react'

const VerifyPage = (props) => {
  return (
    {
      header: 'Step 6. Verify your record!',
      subtitle: 'Your Ethereum and Twitter identity link are now published on IPFS.',
      content: (
        <div>
          <div className={'data-container'}>
            <Header as='h3'>Multihash:</Header>
            <p>&nbsp;{props.multihash}</p>
          </div>
          <div className={'data-container'}>
            <Header as='h3'>Address:</Header>
            <p>&nbsp;{props.ipfsData.address}</p>
          </div>
          <div className={'data-container'}>
            <Header as='h3'>Hash:</Header>
            <p>&nbsp;{props.ipfsData.hash}</p>
          </div>
          <div className={'data-container'}>
            <Header as='h3'>Signature:</Header>
            <p>&nbsp;{props.ipfsData.signature}</p>
          </div>
        </div>
      ),
    }
  );
};

export default VerifyPage;