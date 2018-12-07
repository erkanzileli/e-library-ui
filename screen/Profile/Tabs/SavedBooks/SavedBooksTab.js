import React from 'react'
import BookList from '../BookList';

export default class SavedBooksTab extends React.Component {

    // get data

    bookData = [
        {
            id: 2,
            name: 'Çi',
            author: {
                firstName: 'Azra',
                lastName: 'Kohen'
            }
        },
        {
            id: 3,
            name: 'Pi',
            author: {
                firstName: 'Azra',
                lastName: 'Kohen'
            }
        }
    ]

    render() {
        return <BookList books={this.bookData} />
    }
}