import { createSwitchNavigator } from 'react-navigation'
import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'
import LoadingScreen from '../screen/LoadingScreen'
import LoggedNavigator from './LoggedNavigator'

export default createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },
    Logged: {
      screen: LoggedNavigator
    },
    Loading: {
      screen: LoadingScreen
    }
  },
  {
    initialRouteName: 'Login'
  }
)
