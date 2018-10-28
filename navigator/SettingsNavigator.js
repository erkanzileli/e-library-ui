import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import SettingsScreen from '../screen/SettingsScreen'

export default createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Settings',
        headerLeft: <Icon style={{ marginLeft: 15 }} name='menu' onPress={() => navigation.openDrawer()} />
      })
    }
  },
  {
    initialRouteName: 'Settings'
  }
)
