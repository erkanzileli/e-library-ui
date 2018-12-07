import React from "react";

import Loader from "../component/Loader";
import { getToken } from "../storage";

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    title: "Loading"
  };

  async componentDidMount() {
    const token = await getToken();
    if (token) {
      // forward to HomeScreen
      this.props.navigation.navigate('Login')
    } else {
      // forward to LoginScreen
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return <Loader loading={true} />;
  }
}
