import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Toast } from 'native-base';
import { API_URL } from '../env/environment';

function validations(values) {
  let result = {
    firstName: true,
    lastName: true,
    email: true,
    username: true,
    password: true,
    passwordRepeat: true
  }
  if (values.username && !/^.{0,50}$/.test(values.username)) {
    result.username = false
  }
  if (!values.username) {
    result.username = false
  }
  if (values.firstName && !/^.{0,50}$/.test(values.firstName)) {
    result.firstName = false
  }
  if (!values.firstName) {
    result.firstName = false
  }
  if (values.lastName && !/^.{0,50}$/.test(values.lastName)) {
    result.lastName = false
  }
  if (!values.lastName) {
    result.lastName = false
  }
  if (values.password !== values.passwordRepeat) {
    result.password = false
    result.passwordRepeat = false
  }
  if (values.password && !/^.{0,15}$/.test(values.password)) {
    result.password = false
  }
  if (!values.password) {
    result.password = false
  }
  if (!values.passwordRepeat) {
    result.passwordRepeat = false
  }
  if (values.passwordRepeat && !/^.{0,15}$/.test(values.passwordRepeat)) {
    result.passwordRepeat = false
  }
  if (values.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      result.email = false
    }
    if (!/^.{0,254}$/.test(values.email)) {
      result.email = false
    }
  }
  return result
}


export default class RegisterScreen extends Component {
  state = {
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    passwordRepeat: null
  }

  submit = async ({ firstName, lastName, username, email, password } = this.state) => {
    let response = await fetch(`${API_URL}/users/sign-up`, {
      method: 'post',
      body: JSON.stringify({ firstName, lastName, username, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 500) {
      Alert.alert(
        'Hata',
        'Bu kullanıcı veya e-posta adresi zaten kullanımda',
        [],
        { cancelable: true }
      )
    }
    if (response.status === 200) {
      let _response = await response.json()
      Toast.show({
        text: "Lütfen giriş yapın!",
        duration: 3000,
        type: 'success'
      })
      this.props.navigation.navigate('Login')
    }
  }

  handleSubmit = () => {
    const validate = validations(this.state)
    let valid = true
    Object.keys(validate).forEach(key => {
      if (!validate[key]) {
        valid = false
      }
    })
    if (!valid) {
      Toast.show({
        text: "Alanların doğruluğunu kontrol edin veya boş bırakmayın!",
        buttonText: "Tamam",
        duration: 3000,
        type: 'danger'
      })
    } else {
      this.submit()
    }

  }

  render() {
    const { username, email, password, passwordRepeat, firstName, lastName } = this.state
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>
          Üye Olun
        </Text>

        <ScrollView>
        <View style={styles.inputContainer}>
            <TextInput
              value={firstName}
              onChangeText={value => this.setState({ firstName: value })}
              style={styles.inputs}
              placeholder="İsim"
              underlineColorAndroid='transparent' />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={lastName}
              onChangeText={value => this.setState({ lastName: value })}
              style={styles.inputs}
              placeholder="Soyisim"
              underlineColorAndroid='transparent' />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={value => this.setState({ email: value })}
              style={styles.inputs}
              placeholder="E-Posta"
              keyboardType="email-address"
              underlineColorAndroid='transparent' />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              onChangeText={value => this.setState({ username: value })}
              style={styles.inputs}
              placeholder="Kullanıcı Adı"
              underlineColorAndroid='transparent' />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={value => this.setState({ password: value })}
              style={styles.inputs}
              placeholder="Şifre"
              secureTextEntry={true}
              underlineColorAndroid='transparent' />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={passwordRepeat}
              onChangeText={value => this.setState({ passwordRepeat: value })}
              style={styles.inputs}
              placeholder="Şifre Tekrar"
              secureTextEntry={true}
              underlineColorAndroid='transparent' />
          </View>

        </ScrollView>

        <TouchableOpacity
          style={
            [styles.buttonContainer,
            styles.loginButton]
          }
          onPress={this.handleSubmit}
        >
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
