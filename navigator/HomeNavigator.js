import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../screen/HomeScreen'
import DemoScreen from '../screen/DemoScreen'
import { Icon } from 'native-base'

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        headerLeft: <Icon style={{ marginLeft: 15 }} name='menu' onPress={() => navigation.openDrawer()} />
      })
    },
    Demo: {
      screen: DemoScreen,
      navigationOptions: () => ({
        title: 'Demo'
      })
    }
  },
  {
    initialRouteName: 'Home'
  }
)
