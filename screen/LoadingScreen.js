import React from 'react'
import { View, Item } from 'native-base'
import { ActivityIndicator } from 'react-native'

export default class LoadingScreen extends React.Component {
    static navigationOptions = {
        title: 'Loading'
    }

    render() {
        return <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <ActivityIndicator size='large' />
            </View>
        </View>
    }
}
