import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../config.js';
import axios from 'axios';


const initialState = {
	chats:[],
	message: {},
	status: 'idle',
	shareableContent: null,
	shareableType: null,
	shareableStatus: 'idle',
	error: null,
}

export const getChatsByUserId = createAsyncThunk('chats/getChatsByUserId', async ({userId,token})=>{

	try{
		const response = await axios.get(
			`${baseApi}/chats/${userId}`,
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			});		
		return response.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
	
})

export const shareContent = createAsyncThunk('chats/shareContent', async ({body,token})=>{
	
	try{
	
		const response = await axios.post(
			`${baseApi}/chats`,
			body,
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		)
		return response.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
	
}) 


const authSlice = createSlice({
	name: 'chats',
	initialState,
	reducer:{

	},
	extraReducers:(builder)=>{

		builder
		.addCase(getChatsByUserId.pending,(state,action)=>{
			state.status = 'loading';
		})
		.addCase(getChatsByUserId.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.shareableContent = action.meta.arg.shareableContent
			state.shareableType = action.meta.arg.shareableType
			state.chats = action.payload;
		})
		
	}
})


export const getChatsUsers = state => state.chats.chats;
export const getChatsStatus = state => state.chats.status;
export const getShareableContent = state => state.chats.shareableContent;
export const getShareableContentStatus = state => state.chats.shareableStatus;
export const getShareableType = state => state.chats.shareableType;


export default authSlice.reducer;
