import React from 'react'
import {View} from 'react-native'
import Loader from '../../component/Loader'

export default class BookListScreen extends React.Component {
    static navigationOptions = {
        title: 'Book'
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    render() {
        const {loading} = this.state
        return <View>
            <Loader loading={loading}/>
        </View>
    }
}
