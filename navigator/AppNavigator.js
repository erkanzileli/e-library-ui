import { createSwitchNavigator } from 'react-navigation'
import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'
import SplashScreen from '../screen/SplashScreen'
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
    Splash: {
      screen: SplashScreen
    }
  },
  {
    initialRouteName: 'Login'
  }
)
