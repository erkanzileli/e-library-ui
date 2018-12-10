import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import { Icon } from 'native-base';
import ProfileNavigator from './ProfileNavigator';
import ManagementNavigator from './ManagementNavigator';
import { getUserRole } from '../utils/authorization';

let tabs = {
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
    },
    // Management = {
    //     screen: ManagementNavigator,
    //     navigationOptions: () => getUserRole().then(role => {
    //         if (role === 'admin') {
    //             return route = {
    //                 title: 'Yönetim',
    //                 tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='settings' />
    //             }
    //         } return null
    //     })
    // }
}


const _tabs = () => {
    let tabs = {
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
    getUserRole().then(role => {
        if (role === 'admin') {
            tabs.Management = {
                screen: ManagementNavigator,
                navigationOptions: () => ({
                    title: 'Yönetim',
                    tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='settings' />
                })
            }
        }
        return tabs
    })
}


if (true) {
    console.warn('asdasd')
}

const options = {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        showLabel: false
    }
}

async function checkRole() {
    if (await getUserRole() === 'admin') {
        tabs.Management = {
            screen: ManagementNavigator,
            navigationOptions: () => ({
                title: 'Yönetim',
                tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='settings' />
            })
        }
    }
}

export default createBottomTabNavigator(tabs, options)
