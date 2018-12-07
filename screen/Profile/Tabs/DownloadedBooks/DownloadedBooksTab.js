import React from 'react'
import BookList from '../BookList';

export default class DownloadedBooksTab extends React.Component {

    // get data

    bookData = [
        {
            id: 1,
            name: 'Fi',
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