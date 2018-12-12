import { SET_USER, SET_USERS } from "../actionTypes";

const initialState = {
    user: {},
    users: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }
        default:
            return state;
    }
}
