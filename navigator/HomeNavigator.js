import { createStackNavigator, map } from 'react-navigation'
import HomeScreen from '../screen/Home/HomeScreen'
import BookDetailScreen from '../screen/BookDetailScreen';
import BookCreateScreen from '../screen/Home/Book/BookCreateScreen';
import BookEditScreen from '../screen/BookEditScreen';

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
    BookEdit: {
      screen: BookEditScreen
    },
    CreateBook: {
      screen: BookCreateScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
)
