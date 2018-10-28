import {AsyncStorage} from 'react-native'

export const getToken = async () => {
    return await AsyncStorage.getItem('token')
        .then(value => (value));
};

export async function setToken(token) {
    try {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        console.error(error)
    }
}
