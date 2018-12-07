import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../screen/Home/HomeScreen'
import BookDetailScreen from '../screen/BookDetailScreen';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
          title: 'Kitaplar',
      })
    },
    BookDetail: {
      screen: BookDetailScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
)
