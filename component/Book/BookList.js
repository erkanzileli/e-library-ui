import React from 'react'
import { FlatList } from 'react-native'
import BookListItem from './BookListItem';

export default class BookList extends React.Component {
    render() {
        const { books, navigation } = this.props
        return <FlatList
            data={books}
            renderItem={({ item }) => (<BookListItem navigation={navigation} {...item} />)}
            keyExtractor={(item, index) => item.id.toString()}
        />
    }
}
