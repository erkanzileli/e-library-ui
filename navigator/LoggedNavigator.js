import { createDrawerNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import SettingsNavigator from './SettingsNavigator'
import BookNavigator from './BookNavigator'
import AuthorNavigator from "./AuthorNavigator";

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
    Authors: {
      screen: AuthorNavigator,
      drawerLabel: 'Authors'
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
