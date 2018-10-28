import React from 'react'
import { View } from 'react-native'
import Loader from '../../component/Loader'
import { getToken } from '../../storage';

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

    componentDidMount() {
        
        // this.setState({ loading: true })
        // apolloClient.query({
        //     query: BOOKS
        // }).then(response => {
        //     console.log(response)
        //     this.setState({ loading: false })
        // }).catch(error => console.log(error))
    }

    render() {
        const { loading } = this.state
        return <View>
            <Loader loading={loading} />
        </View>
    }
}
