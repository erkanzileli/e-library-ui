import { createStackNavigator } from 'react-navigation'
import BookList from '../component/Book/BookList';

export default createStackNavigator(
  {
    Books: {
      screen: BookList,
      navigationOptions: () => ({
        title: 'Kitaplarım',
      })
    }
  },
  {
    initialRouteName: 'Books'
  }
)
