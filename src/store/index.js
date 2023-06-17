import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice';
import postSlice from '../reducers/postSlice';

export const store = configureStore({
	reducer:{
		auth:authSlice,
		posts:postSlice,
	}
})