import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import BookListScreen from '../screen/Book/BookListScreen'

export default createStackNavigator(
  {
    Books: {
      screen: BookListScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Books',
        headerLeft: <Icon style={{ marginLeft: 15 }} name='menu' onPress={() => navigation.openDrawer()} />
      })
    }
  },
  {
    initialRouteName: 'Books'
  }
)
