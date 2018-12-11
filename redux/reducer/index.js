import { combineReducers } from "redux";
import bookReducer from "./book";
import userReducer from "./user";
import commonReducer from './common';

export default combineReducers({ bookReducer, commonReducer, userReducer });
