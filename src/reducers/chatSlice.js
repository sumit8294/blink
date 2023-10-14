import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../config.js';
import axios from 'axios';



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

export const sendMessage = createAsyncThunk('chats/sendMessage', async ({body,token})=>{
	
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

export const fetchChatMessages = createAsyncThunk('chats/fetchChatMessages', async ({chatId,userId,token}) =>{

	try {

		const response = await axios.get(
			`${baseApi}/chats/${userId}/${chatId}`,
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		)

		return response.data;
	}
	catch(error) {
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
		throw new Error(errorMessage); 
	}
})

const initialState = {
	chats:[],
	messages: null,
	status: 'idle',
	shareableContent: null,
	shareableType: null,
	shareableStatus: 'idle',
	error: null,
}


const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers:{
		resetChats:(state,action)=>{
			state.chats=[]
			state.messages= null
			state.status= 'idle'
			state.shareableContent= null
			state.shareableType= null
			state.shareableStatus= 'idle'
			state.error= null
			
		}

	},
	extraReducers:(builder)=>{

		builder
		.addCase(getChatsByUserId.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getChatsByUserId.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.shareableContent = action.meta.arg.shareableContent
			state.shareableType = action.meta.arg.shareableType
			state.chats = action.payload
		})
		.addCase(sendMessage.pending,(state,action)=>{
			state.shareableStatus = 'loading'
		})
		.addCase(sendMessage.fulfilled,(state,action)=>{
			state.shareableStatus = 'succeeded'

		})
		.addCase(sendMessage.rejected,(state,action)=>{
			state.shareableStatus = 'failed'

		})
		.addCase(fetchChatMessages.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(fetchChatMessages.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.messages = action.payload
		})
		.addCase(fetchChatMessages.rejected,(state,action)=>{
			state.status = 'failed'
		})
	}
})


export const getChatsUsers = state => state.chats.chats;
export const getChatsStatus = state => state.chats.status;
export const getShareableContent = state => state.chats.shareableContent;
export const getShareableContentStatus = state => state.chats.shareableStatus;
export const getShareableType = state => state.chats.shareableType;
export const getChatMessages = state => state.chats.messages;


export const {resetChats} = chatSlice.actions;

export default chatSlice.reducer;
