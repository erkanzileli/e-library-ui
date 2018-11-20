import React from 'react'
import { FlatList } from 'react-native'
import { Container, View } from 'native-base'
import BookListItem from './BookListItem';

const mockBookData = [
    {
        id: 1,
        author: {
            firstName: 'Azra',
            lastName: 'Kohen'
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        downloadCount: 84,
        likeCount: 71,
        name: 'Fi'
    },
    {
        id: 2,
        author: {
            firstName: 'Azra',
            lastName: 'Kohen'
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        downloadCount: 76,
        likeCount: 56,
        name: 'Çi'
    },
    {
        id: 3,
        author: {
            firstName: 'Azra',
            lastName: 'Kohen'
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        downloadCount: 65,
        likeCount: 53,
        name: 'Pi'
    }
]

export default class BookList extends React.Component {
    state = {
        loading: false
    }

    _keyExtractor = (item, index) => item.id.toString();

    render() {
        return <Container>
            <View>
                <FlatList
                    data={mockBookData}
                    renderItem={({ item }) => (<BookListItem {...item} />)}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        </Container>
    }
}
