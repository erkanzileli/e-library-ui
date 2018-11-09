import { createStackNavigator } from 'react-navigation'
import BookListScreen from '../screen/Book/BookListScreen'

export default createStackNavigator(
  {
    Books: {
      screen: BookListScreen,
      navigationOptions: () => ({
          title: 'Kitaplar',
      })
    }
  },
  {
    initialRouteName: 'Books'
  }
)
