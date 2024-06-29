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

export const getChatsFromSearch = createAsyncThunk('chats/getChatsFromSearch', async ({queryName,userId,token})=>{

	try{
		const response = await axios.get(
			`${baseApi}/chats/search/${queryName}/${userId}`,
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


export const fetchUnseenChatsCount = createAsyncThunk('chats/fetchUnseenChatsCount', async ({userId,token}) =>{

	try {

		const response = await axios.get(
			`${baseApi}/chats/unseenCount/${userId}`,
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
	activeChatId: null,
	chatInfo: null,
	newChatUserId: null,
	newChatId: null,
	unseenChatsCount: 0,
}


const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers:{
		resetChats:(state,action)=>{
			state = initialState
		},
		setActiveChatId:(state,action)=>{
			state.activeChatId = action.payload;
		},
		setChatInfo:(state,action)=>{
			state.chatInfo = action.payload
		},
		setChatMessages:(state,action)=>{
			state.messages = null
		},
		setUnseenChatCount:(state,action)=>{
			if(state.unseenChatsCount > 0) state.unseenChatsCount = state.unseenChatsCount - 1
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
		.addCase(getChatsFromSearch.fulfilled,(state,action)=>{
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
			state.newChatId = action.payload.newChatId

		})
		.addCase(sendMessage.rejected,(state,action)=>{
			state.shareableStatus = 'failed'

		})
		.addCase(fetchChatMessages.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(fetchChatMessages.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.messages = action.payload.messages
			state.chatInfo = action.payload.chat
		})
		.addCase(fetchChatMessages.rejected,(state,action)=>{
			state.status = 'failed'
		})
		.addCase(fetchUnseenChatsCount.fulfilled,(state,action)=>{
			state.unseenChatsCount = action.payload.count;
		})
	}
})


export const getChatsUsers = state => state.chats.chats;
export const getChatsStatus = state => state.chats.status;
export const getShareableContent = state => state.chats.shareableContent;
export const getShareableContentStatus = state => state.chats.shareableStatus;
export const getShareableType = state => state.chats.shareableType;
export const getChatMessages = state => state.chats.messages;
export const getActiveChatId = state => state.chats.activeChatId;
export const getChatInfo = state => state.chats.chatInfo
export const getNewChatUserId = state => state.chats.newChatUserId
export const getNewChatId = state => state.chats.newChatId
export const selectUnseenChatsCount = state => state.chats.unseenChatsCount

export const {
	resetChats,
	setActiveChatId,
	setChatInfo, 
	setChatMessages,
	setUnseenChatCount
} = chatSlice.actions;

export default chatSlice.reducer;
