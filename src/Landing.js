// @flow
import React, { Component } from 'react'
import { Container, Header, Card } from 'semantic-ui-react'
import BannerSection from './components/BannerSection';
import Pages from './pages';

const STEPS = [
  Pages.CreatePage,
  Pages.SignPage,
  Pages.PublishIPFSPage,
  Pages.PublishTwitterPage,
  Pages.RetrievePage,
  Pages.VerifyPage,
];

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
    } else {
      disabled.push(false);
    }

    const contentCard = ContentCard({ ...STEPS[i]({ ...props, disabled }), key: i, })
    components.push(contentCard);
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