import React from 'react'
import { ScrollView } from 'react-native'
import { View, Toast, Container } from 'native-base'
import Loader from '../../component/Loader'
import BookListItem from './BookListItem';

export default class BookListScreen extends React.Component {
    static navigationOptions = {
        title: 'Book'
    }

    state = {
        loading: false
    }

    componentDidMount(){
        Toast.show({
            text: 'Hello',
            duration: 1500
        })
    }

    render() {
        return <ScrollView>
            <BookListItem />
            <BookListItem />
            <BookListItem />
        </ScrollView>
    }
}
