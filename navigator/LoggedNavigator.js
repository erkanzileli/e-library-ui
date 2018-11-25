import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import { Icon } from 'native-base';
import ProfileNavigator from './ProfileNavigator';
import ManagementNavigator from './ManagementNavigator';
import { getUserRole } from '../utils/authorization';

const tabs = {
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
}

const options = {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        showLabel: false
    }
}

if (getUserRole() === 'admin') {
    tabs.Management = {
        screen: ManagementNavigator,
        navigationOptions: () => ({
            title: 'Yönetim',
            tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='settings' />
        })
    }
}

export default createBottomTabNavigator(tabs, options)
