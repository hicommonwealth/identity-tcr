// @flow
import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoadingPage = () => <div>
  <Dimmer active>
    <Loader />
  </Dimmer>
</div>


export default LoadingPage;