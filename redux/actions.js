import { SET_BOOKS, SET_USER, SET_LOADING } from "./actionTypes";

export const setBooks = books => ({
    type: SET_BOOKS,
    payload: books
});

export const setUser = user => ({
    type: SET_USER,
    payload: user
});

export const setLoading = user => ({
    type: SET_LOADING,
    payload: user
});
