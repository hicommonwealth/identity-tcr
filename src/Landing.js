// @flow
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button, Container, Header, Input, Card, Icon } from 'semantic-ui-react'
import styled from 'styled-components';

const Section = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

const BannerSection = styled(Section)`
  background-color: white;
  background-size: cover;
  
  div.ui.text.container {
    padding-top: 10%;
  }

  div.btn-container {
    display: flex;
    justify-content: space-between;

    button {
      width: 50%;
    }
  }

  div.ui.input {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 4rem;
    }

    h2.ui.header {
      margin-bottom: 30px;
      margin-top: 0;
      font-size: 2rem;
    }
  }

  div.data-container {
    display: flex;
    justify-content: space-between;

    p {
      width: 100%;
    }
  }
`;

const STEPS = (props) => [{
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}];

const ContentCard = ({ key, header, subtitle, content, disabled }) => (
  <Card key={key} fluid>
    <Card.Content>
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{subtitle}</Card.Meta>
      <Card.Description>
        {content}
      </Card.Description>
    </Card.Content>
  </Card>
)

const renderSteps = (props) => {
  const components = [];
  const disabled = []
  for (var i = 0; i <= props.step; i++) {
    if (i < props.step) {
      disabled.push(true);
      components.push(ContentCard({ ...STEPS({ ...props, disabled })[i], key: i, }));
    } else {
      disabled.push(false);
      components.push(ContentCard({ ...STEPS({ ...props, disabled })[i], key: i, }));
    }
  }

  return components[components.length - 1];
};

const StyledBannerSection = (props) => <BannerSection>
  <Container text>
    <Header as='h1'>Commonwealth</Header>
    <Header as='h2'>Social identity link and verification service</Header>

    <React.Fragment>{ 
      renderSteps(props)
    }</React.Fragment>
  </Container>
</BannerSection>

class Landing extends Component {
  render() {
    return (
      <div>
        <StyledBannerSection { ...this.props } />
      </div>
    );
  }
}

export default Landing;