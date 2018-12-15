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
import { setToken, setValue } from "../storage/index.js";
import { API_URL } from '../env/environment.js';
import { connect } from "react-redux";
import { setUser } from '../redux/actions';
import { GET_USER } from '../utils/gql.js';
import apolloClient from '../utils/apolloClient.js';

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

class LoginScreen extends Component {
    state = {
        loading: false,
        username: '',
        password: ''
    }

    submit = async ({ username, password } = this.state) => {
        // this.setState({ loading: true });
        let response = await fetch(`${API_URL}/users/check`, {
            method: 'post',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            let _response = await response.json()
            if (_response) {
                axios({
                    url: `${API_URL}/login`,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        username: username,
                        password: password
                    }
                }).then(async response => {
                    const { data } = response;
                    setToken(data.token);
                    setValue('username', username)
                    let { data: { user } } = await apolloClient.query({ query: GET_USER, variables: { username: username }, fetchPolicy: 'no-cache' })
                    this.props.setUser(user)
                    this.props.navigation.navigate('Logged')
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
            } else {
                alert('Bu hesap belirsiz süreliğine engellenmiştir.')
            }
        } else {
            alert('API hizmeti ile ilgili bir sorun mevcut.')
        }
        this.setState({ loading: false })
    };

    handleSubmit = ({ username, password } = this.state) => {
        if (username === '' || password === '') {
            Alert.alert(
                'Hata',
                'Kullanıcı adı ve şifre boş bırakılamaz',
                [],
                { cancelable: true }
            )
        } else {
            this.submit()
        }
    }

    render() {
        const { loading, username, password } = this.state
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <Text style={{ fontSize: 20, paddingBottom: 20 }}>
                    Giriş Yapın
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={username}
                        onChangeText={value => this.setState({ username: value })}
                        style={styles.inputs}
                        placeholder="Kullanıcı Adı"
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={password}
                        onChangeText={value => this.setState({ password: value })}
                        style={styles.inputs}
                        placeholder="Şifre"
                        secureTextEntry
                        underlineColorAndroid='transparent'
                    />
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

export default connect(null, { setUser })(LoginScreen)