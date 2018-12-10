import { AsyncStorage } from 'react-native'


export const getValue = async (key) => {
    return await AsyncStorage.getItem(key)
        .then(value => value)
}

export async function setValue(key, value) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.error(error)
    }
}

export const getToken = async () => {
    return await AsyncStorage.getItem('token')
        .then(value => (value));
};

export async function setToken(token) {
    try {
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        console.error(error)
    }
}

export async function removeToken() {
    try {
        await AsyncStorage.removeItem('token')
    } catch (error) {
        console.error(error)
    }
}
