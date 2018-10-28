import { createDrawerNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import SettingsNavigator from './SettingsNavigator'
import BookNavigator from './BookNavigator'

export default createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      drawerLabel: 'Home'
    },
    Books: {
      screen: BookNavigator,
      drawerLabel: 'Books'
    },
    Settings: {
      screen: SettingsNavigator,
      drawerLabel: 'Settings'
    }
  },
  {
    initialRouteName: 'Home'
  }
)
