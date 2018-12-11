import React from 'react'
import AppNavigator from './navigator/AppNavigator'
import { Root } from 'native-base';
import { Provider } from "react-redux";
import store from "./redux/store";

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <Root>
        <AppNavigator />
      </Root>
    </Provider>
  }
}
