import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../screen/Home/HomeScreen'

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
          title: 'Kitaplar',
      })
    }
  },
  {
    initialRouteName: 'Home'
  }
)
