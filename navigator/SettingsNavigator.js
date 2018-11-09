import { createStackNavigator } from 'react-navigation'
import SettingsScreen from '../screen/SettingsScreen'

export default createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    initialRouteName: 'Settings'
  }
)
