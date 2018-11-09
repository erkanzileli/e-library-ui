import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../screen/HomeScreen'

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
          title: 'Anasayfa',
      })
    }
  },
  {
    initialRouteName: 'Home'
  }
)
