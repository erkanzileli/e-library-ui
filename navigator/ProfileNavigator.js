import { createStackNavigator } from 'react-navigation'
import ProfileScreen from '../screen/Profile/ProfileHomeScreen';

export default createStackNavigator(
    {
        ProfileHome: {
            screen: ProfileScreen,
            navigationOptions: () => ({
                title: 'Profil',
            })
        }
    },
    {
        initialRouteName: 'ProfileHome'
    }
)
