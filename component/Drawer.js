import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { removeToken} from "../storage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    footer: {},
    item: {}
});

class Drawer extends Component {

    handleLogoutPress = () => {
        Alert.alert(
            'Uyarı',
            'Çıkış yapmak istediğinize emin misiniz?',
            [
                {
                    text: 'Çıkış Yap',
                    onPress: () => this.logout()
                },
                {text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            {cancelable: true}
        )
    };

    logout = async () => {
        await removeToken();
        await this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Login'}))
    };

    render() {
        const {navigation: {navigate}} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.item}>
                        <Text onPress={() => navigate('Home')}>
                            Home
                        </Text>
                    </View>
                    <View style={styles.item}>

                        <Text onPress={() => navigate('Book')}>
                            Book
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text onPress={() => navigate('Author')}>
                            Author
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text onPress={() => navigate('Settings')}>
                            Settings
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text onPress={() => this.handleLogoutPress()}>Logout</Text>
                </View>
            </View>
        );
    }
}

export default Drawer
