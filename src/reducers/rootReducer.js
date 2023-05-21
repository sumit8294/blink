import {combineReducers} from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
	users: usersReducer,

})

export default rootReducer;