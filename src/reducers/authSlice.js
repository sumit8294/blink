import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../config.js';
import axios from 'axios';


const initialState = {
	token: null,
	status: 'idle',
	error: null,
}

export const userSignup = createAsyncThunk('auth/userSignup', async (body)=>{

	try{
		const response = await axios.post(`${baseApi}/users/`,body,{withCredentials: true});		
		return response.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
	
})


export const userLogin = createAsyncThunk('auth/userLogin', async (body) =>{

	try{
		const response = await axios.post(`${baseApi}/auth/login`,body,{withCredentials:true});
		return response.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
	
	

})

export const userLogout = createAsyncThunk('auth/logout',async ()=>{

	try{
		const response = await axios.post(`${baseApi}/auth/logout`,{},{withCredentials:true});
		return response.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
})


export const getAccessTokenWithRefreshToken = createAsyncThunk('auth/refresh',async ()=>{

	try{

		const response = await axios.post(`${baseApi}/auth/refresh`,{},{withCredentials:true});
		return response.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
		throw new Error(errorMessage);
	}
})


const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducer:{

	},
	extraReducers:(builder)=>{

		builder
		.addCase(userSignup.pending,(state,action)=>{
			state.status = 'loading';

		})
		.addCase(userSignup.fulfilled,(state,action)=>{
			state.status = 'succeeded'
		})
		.addCase(userSignup.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message

		})
		.addCase(userLogin.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(userLogin.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.token = action.payload.accessToken
		})
		.addCase(userLogin.rejected,(state,action)=>{
			state.status = 'failed';
			state.error = action.error.message
		})
		.addCase(userLogout.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(userLogout.fulfilled,(state,action)=>{
			state.status = 'idle'
			state.token = null
		})
		.addCase(userLogout.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message;
		})
		.addCase(getAccessTokenWithRefreshToken.fulfilled,(state,action)=>{
			state.token = action.payload.accessToken;
		})
		.addCase(getAccessTokenWithRefreshToken.rejected,(state,action)=>{
			state.token = null;
		})
	}
})


export const getAuthStatus = state => state.auth.status;
export const getAuthError = state => state.auth.error;
export const getAccessToken = state => state.auth.token;



export default authSlice.reducer;
