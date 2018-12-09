import { createStackNavigator } from 'react-navigation'
import ProfileHomeScreen from '../screen/Profile/ProfileHomeScreen';
import { EditProfileScreen } from '../screen/Profile/EditProfileScreen';

export default createStackNavigator(
    {
        ProfileHome: {
            screen: ProfileHomeScreen,
            navigationOptions: () => ({
                title: 'Profil',
            })
        },
        ProfileEdit: {
            screen: EditProfileScreen,
            navigationOptions: () => ({
                title: 'Profilinizi Düzenleyin',
            })
        }
    },
    {
        initialRouteName: 'ProfileHome'
    }
)
