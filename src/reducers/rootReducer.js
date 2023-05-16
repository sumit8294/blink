import {combineReducers} from '@reduxjs/toolkit';
import usersReducer from './users';

const rootReducer = combineReducers({
	user: usersReducer,
})

export default rootReducer;