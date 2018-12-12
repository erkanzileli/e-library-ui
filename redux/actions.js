import { ADD_BOOK, DELETE_BOOK, SET_BOOK, SET_BOOKS, UPDATE_BOOK, SET_USER, SET_USERS, SET_LOADING } from "./actionTypes";

// Book
export const addBook = book => ({
    type: ADD_BOOK,
    payload: book
});

export const deleteBook = book => ({
    type: DELETE_BOOK,
    payload: book
});

export const setBook = book => ({
    type: SET_BOOK,
    payload: book
});

export const setBooks = books => ({
    type: SET_BOOKS,
    payload: books
});

export const updateBook = book => ({
    type: UPDATE_BOOK,
    payload: book
});
// User
export const setUser = user => ({
    type: SET_USER,
    payload: user
});

export const setUsers = users => ({
    type: SET_USERS,
    payload: users
});

// Common
export const setLoading = user => ({
    type: SET_LOADING,
    payload: user
});
