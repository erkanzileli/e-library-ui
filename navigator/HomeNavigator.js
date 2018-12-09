import { createStackNavigator, map } from 'react-navigation'
import HomeScreen from '../screen/Home/HomeScreen'
import BookDetailScreen from '../screen/BookDetailScreen';
import { BookCreateScreen } from '../screen/Home/Book/BookCreateScreen';

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
    },
    CreateBook: {
      screen: BookCreateScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
)
