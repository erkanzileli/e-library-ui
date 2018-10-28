import {createDrawerNavigator} from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import SettingsNavigator from './SettingsNavigator'
import BookNavigator from './BookNavigator'
import AuthorNavigator from "./AuthorNavigator";
import Drawer from "../component/Drawer";

export default createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            drawerLabel: 'Home'
        },
        Book: {
            screen: BookNavigator,
            drawerLabel: 'Book'
        },
        Author: {
            screen: AuthorNavigator,
            drawerLabel: 'Author'
        },
        Settings: {
            screen: SettingsNavigator,
            drawerLabel: 'Settings'
        }
    },
    {
        initialRouteName: 'Home',
        contentComponent: Drawer
    }
)
