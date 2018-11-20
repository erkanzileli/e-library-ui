import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import { Icon } from 'native-base';
import ProfileNavigator from './ProfileNavigator';

export default createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: () => ({
                title: 'Anasayfa',
                tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='home' />
            })
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: () => ({
                title: 'Profil',
                tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='account' />
            })
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            showLabel: false
        }
    }
)
