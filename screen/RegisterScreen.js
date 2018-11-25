import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler
} from 'react-native';

export default class RegisterScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>
          Üye Olun
        </Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="E-Posta"
            keyboardType="email-address"
            underlineColorAndroid='transparent' />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Kullanıcı Adı"
            secureTextEntry={true}
            underlineColorAndroid='transparent' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Şifre"
            secureTextEntry={true}
            underlineColorAndroid='transparent' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Şifre Tekrar"
            secureTextEntry={true}
            underlineColorAndroid='transparent' />
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Üye Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Hesabım Var</Text>
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
