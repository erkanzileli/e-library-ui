import React from "react";
import { connect } from "react-redux";
import { setUser, setLoading } from '../redux/actions';

import Loader from "../component/Loader";
import { getToken } from "../storage";
import apolloClient from "../utils/apolloClient";
import { GET_USER } from "../utils/gql";
import { getUserName } from "../utils/authorization";

class SplashScreen extends React.Component {
  async componentDidMount() {
    const token = await getToken();
    if (token) {
      // fetch user's data
      this.props.setLoading(true)
      let { data: { user } } = await apolloClient.query({ query: GET_USER, variables: { username: await getUserName() }, fetchPolicy: 'no-cache' })
      this.props.setUser(user)
      this.props.setLoading(false)
      // forward to HomeScreen
      this.props.navigation.navigate('Logged')
    } else {
      // forward to LoginScreen
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    const { loading } = this.props
    return <Loader loading={loading} />;
  }
}

const mapReducerToProps = state => {
  const { commonReducer: { loading } } = state
  return { loading }
}

export default connect(mapReducerToProps, { setUser, setLoading })(SplashScreen)