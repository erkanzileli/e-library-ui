import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import BookNavigator from './BookNavigator'
import { Icon } from 'native-base';

export default createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: () => ({
                title: 'Anasayfa',
                tabBarIcon: <Icon name='home'/>
            })
        },
        Books: {
            screen: BookNavigator,
            navigationOptions: () => ({
                title: 'Kitaplar',
                tabBarIcon: <Icon name='book'/>
            })
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            labelStyle: {
                fontSize: 13
            },
            iconStyle: {

            }
        }
    }
)
