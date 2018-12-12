import { ADD_BOOK, DELETE_BOOK, SET_BOOK, SET_BOOKS, UPDATE_BOOK } from "../actionTypes";

const initialState = {
    allBooks: [],
    book: {
        name: null,
        title: null,
        description: null,
        pageCount: null,
        downloadCount: 0,
        likeCount: 0,
        author: {
            firstName: null,
            lastName: null
        },
        user: {
            firstName: null,
            lastName: null,
            username: null
        },
    },

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_BOOK: {
            return {
                ...state,
                allBooks: [...state.allBooks, action.payload]
            }
        }
        case DELETE_BOOK: {
            return {
                ...state,
                allBooks: state.allBooks.filter(book => book.id !== action.payload)
            }
        }
        case SET_BOOK: {
            return {
                ...state,
                book: action.payload
            }
        }
        case SET_BOOKS: {
            return {
                ...state,
                allBooks: action.payload
            }
        }
        case UPDATE_BOOK: {
            const updatedBookIndex = state.allBooks.find(book => book.id === action.payload.id)
            state.allBooks[updatedBookIndex] = action.payload
            return { state }
        }
        default:
            return state;
    }
}
