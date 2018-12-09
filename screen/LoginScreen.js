import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import axios from 'axios'

import Loader from "../component/Loader.js";
import { setToken } from "../storage/index.js";

export default class LoginScreen extends Component {
    state = {
        loading: false
    }

    handleSubmit = async ({ username, password } = this.state) => {
        await this.setState({ loading: true });
        await axios({
            url: 'http://192.168.43.181:8080/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: 'admin',
                password: '123qweasd'
            }
        }).then(async response => {
            const { data } = response;
            await setToken(data.token);
            await this.props.navigation.navigate('Logged')
        }).catch(async error => {
            const { response: { status } } = error;
            if (status === 401) {
                Alert.alert(
                    'Hata',
                    'Kullanıcı adı veya şifre yanlış',
                    [],
                    { cancelable: true }
                )
            } else {
                console.warn(error)
            }
        });
        this.setState({ loading: false })
    };

    render() {
        const { loading } = this.state
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <Text style={{ fontSize: 20, paddingBottom: 20 }}>
                    Giriş Yapın
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Kullanıcı Adı"
                        underlineColorAndroid='transparent' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Şifre"
                        secureTextEntry
                        underlineColorAndroid='transparent' />
                </View>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.handleSubmit()}
                >
                    <Text style={styles.loginText}>Giriş Yap</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>Hesabım Yok</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
