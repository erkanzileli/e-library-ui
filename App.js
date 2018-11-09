import React from 'react'
import AppNavigator from './navigator/AppNavigator'
import { Root } from 'native-base';

export default class App extends React.Component {
  render () {
    return <Root>
      <AppNavigator />
    </Root>
  }
}
