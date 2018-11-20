import React from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import axios from 'axios'

import Loader from "../component/Loader.js";
import {setToken} from "../storage/index.js";

const options = [
    {
        label: "Açık",
        value: true
    },
    {
        label: "Kapalı",
        value: false
    }
];

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false
        };
    }

    handleSubmit = async ({username, password} = this.state) => {
        await this.setState({loading: true});
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
            const {data} = response;
            await setToken(data.token);
            await this.props.navigation.navigate('Logged')
        }).catch(async error => {
            const {response: {status}} = error;
            if (status === 401) {
                Alert.alert(
                    'Hata',
                    'Kullanıcı adı veya şifre yanlış',
                    [],
                    {cancelable: true}
                )
            } else {
                console.warn(error)
            }
        });
        this.setState({loading: false})
    };

    render() {
        const {navigate} = this.props.navigation;
        const {username, password, loading} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Loader loading={loading}/>
                <StatusBar barStyle="light-content"/>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <TouchableWithoutFeedback
                        style={styles.container}
                        onPress={Keyboard.dismiss}
                    >
                        <View style={styles.logoContainer}>
                            <Text style={styles.logo}>L O G O</Text>
                            <Text style={styles.infoText}>Hesap Bilgileri</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={value => this.setState({username: value})}
                                    style={styles.input}
                                    value={username}
                                    placeholder="Kullanıcı Adı Giriniz! "
                                    placeholderTextColor="white"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    underlineColorAndroid="rgba(255,255,255,0)"
                                    autoCorrect={false}
                                    autoFocus={false}
                                    onSubmitEditing={() => this.refs.txtPass.focus()}
                                />

                                <TextInput
                                    onChangeText={value => this.setState({password: value})}
                                    style={styles.input}
                                    value={password}
                                    placeholder="Parola Giriniz! "
                                    placeholderTextColor="white"
                                    secureTextEntry
                                    returnKeyType="go"
                                    underlineColorAndroid="rgba(255,255,255,0)"
                                    autoCorrect={false}
                                    autoFocus={false}
                                    ref={"txtPass"}
                                />
                                <TouchableOpacity
                                    onPress={() => this.handleSubmit()}
                                    style={styles.btnContainer}
                                >
                                    <Text style={styles.btnText}>GİRİS YAP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(32, 53, 70)",
        justifyContent: "center"
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    logo: {
        color: "white",
        fontWeight: "bold",
        fontSize: 28
    },
    infoText: {
        color: "yellow",
        fontSize: 14,
        marginTop: 5,
        marginBottom: 25,
        textAlign: "center",
        opacity: 0.6
    },
    inputContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20
    },
    input: {
        borderColor: "white",
        color: "white",
        borderWidth: 2,
        borderRadius: 10,
        height: 40,
        margin: 5,
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 10
    },
    btnContainer: {
        borderRadius: 30,
        marginHorizontal: 10,
        margin: 10,
        paddingVertical: 15,
        backgroundColor: "#f7c744"
    },
    btnText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
});
