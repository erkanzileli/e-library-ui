import React from 'react'
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import { Icon } from 'native-base';
import ProfileNavigator from './ProfileNavigator';
import ManagementNavigator from './ManagementNavigator';
import { getUserRole } from '../utils/authorization';

const options = {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        showLabel: false
    }
}

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

let adminTabs = {
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
    Management: {
        screen: ManagementNavigator,
        navigationOptions: () => ({
            title: 'Yönetim',
            tabBarIcon: ({ tintColor }) => <Icon style={{ color: tintColor }} type='MaterialCommunityIcons' name='settings' />
        })
    }
}

class SwitcherScreen extends React.Component {
    constructor(props) {
        super(props)
        this.redirect(props.navigation)
    }

    redirect = async navigation => {
        const role = await getUserRole()
        if (role === 'admin') {
            navigation.navigate('AdminHome')
        } else {
            navigation.navigate('Home')
        }
    }

    render() {
        return <></>
    }
}

let switches = {
    AdminHome: {
        screen: createBottomTabNavigator(adminTabs, options)
    },
    Home: {
        screen: createBottomTabNavigator(tabs, options)
    },
    Switcher: {
        screen: SwitcherScreen
    }
}

export default createSwitchNavigator(switches, { initialRouteName: 'Switcher' })
