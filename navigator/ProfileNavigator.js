import { createStackNavigator } from 'react-navigation'
import ProfileHomeScreen from '../screen/Profile/ProfileHomeScreen';

export default createStackNavigator(
    {
        ProfileHome: {
            screen: ProfileHomeScreen,
            navigationOptions: () => ({
                title: 'Profil',
            })
        }
    },
    {
        initialRouteName: 'ProfileHome'
    }
)
