import {AsyncStorage} from 'react-native'

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

export const getId = async () => {
    return await AsyncStorage.getItem('id')
        .then(value => (value));
};

export async function setId(id) {
    try {
        await AsyncStorage.setItem('id', id)
    } catch (error) {
        console.error(error)
    }
}

export async function removeId() {
    try {
        await AsyncStorage.removeItem('id')
    } catch (error) {
        console.error(error)
    }
}