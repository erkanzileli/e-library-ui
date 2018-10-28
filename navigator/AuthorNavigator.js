import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import AuthorListScreen from "../screen/Author/AuthorListScreen";

export default createStackNavigator(
    {
        Authors: {
            screen: AuthorListScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Authors',
                headerLeft: <Icon style={{ marginLeft: 15 }} name='menu' onPress={() => navigation.openDrawer()} />
            })
        }
    },
    {
        initialRouteName: 'Authors'
    }
)
