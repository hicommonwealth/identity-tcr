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
`;

const STEPS = (props) => [{
  header: 'Step 1. Create or input an Ethereum public address.',
  subtitle: 'Automatically pulled if web3 instance is found in browser.',
  content: (
    <div className={'btn-container'}>
      <Input
        placeholder={'Enter your Ethereum address'}
        value={(props.web3) ? props.web3.eth.accounts[0] : null}
        disabled={(props.web3.eth.accounts[0]) ? true : false}
      />
      <Button primary disabled={disabled} onClick={props.onClick}>{'Proceed to signing step'}</Button>
    </div>
  ),
}, {
  header: 'Step 2. Attest to your Ethereum identity on Twitter.',
  subtitle: 'Tweet a message, claiming ownership on your public address.',
  content: {
    component: 'Sign the message',
    value: props.message,
    onClick: () => {

    },
  }
}];

const ContentGenerator = ({ content, disabled }) => (
  <div className={content.className}>
    <Input
      placeholder={content.placeholder}
      value={content.value}
      disabled={(content.value) ? true : false}
    />
    { content.component }
  </div>
);

const ContentCard = ({ key, header, subtitle, content, disabled }) => (
  <Card key={key} fluid>
    <Card.Content>
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{subtitle}</Card.Meta>
      <Card.Description>
        <ContentGenerator content={content} disabled={disabled}/>
      </Card.Description>
    </Card.Content>
  </Card>
)

const renderSteps = ({ step, onClick, web3, message }) => {
  const components = [];
  for (var i = 0; i <= step; i++) {
    if (i < step) {
      components.push(ContentCard({ ...STEPS({ onClick, web3, message })[i], disabled: true, key: i, }));
    } else {
      components.push(ContentCard({ ...STEPS({ onClick, web3, message })[i], key: i, }));
    }
  }

  return components;
};

const StyledBannerSection = ({ web3, onStepClick, step, message }) => <BannerSection>
  <Container text>
    <Header as='h1'>Commonwealth</Header>
    <Header as='h2'>Social identity link and verification service</Header>

    <React.Fragment>{ 
      renderSteps({
        step: step,
        onClick: onStepClick,
        web3: web3,
        message: message,
      })
    }</React.Fragment>
  </Container>
</BannerSection>

class Landing extends Component {
  render() {
    return (
      <div>
        <StyledBannerSection
          web3={this.props.web3}
          step={this.props.step}
          message={this.props.message}
          onStepClick={this.props.handleStepClick}
          />
      </div>
    );
  }
}

export default Landing;