// @flow
import React, { Component } from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoadingPage = () => <div>
  <Dimmer active>
    <Loader />
  </Dimmer>
</div>


export default LoadingPage;