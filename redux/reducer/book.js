import { SET_BOOKS } from "../actionTypes";

const initialState = {
    allBooks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_BOOKS: {
            return {
                ...state,
                allBooks: action.payload
            }
        }
        default:
            return state;
    }
}
