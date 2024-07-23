import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseApi} from '../config.js';





export const createStory = createAsyncThunk('story/createStory',async ({userId,body,token})=>{
	try{
		const response = await axios.post(`${baseApi}/stories/create`,
			body,
			{
				withCredentials:true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		);
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})

export const getStoriesByUserId = createAsyncThunk('story/getStoriesByUserId', async ({userId,token})=>{
	try{
		const response = await axios.get(`${baseApi}/stories/user/${userId}`);
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})

export const getFollowingStories = createAsyncThunk('story/getFollowingStories', async ({userId,token})=>{
	try{
		const response = await axios.get(`${baseApi}/stories/following/${userId}`);
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})

export const getFollowingActiveStories = createAsyncThunk('story/getFollowingActiveStories', async ({loggedInUser,token})=>{
	try{
		const response = await axios.get(
			`${baseApi}/stories/following/active/${loggedInUser}`,
			{
				withCredentials:true,
				headers: {
					Authorization : `Bearer ${token}`
				}
			}
		);
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})





const initialState = {
	stories:[],
	activeStories:[],
	status:'idle', // 'idle' | 'loading' | 'failed' | 'succeeded'
	storyDomIndex: 0,
	createStatus: 'idle',
	error: null,
}


const storySlice = createSlice({
	name: 'stories',
	initialState,
	reducers:{
		setStoryDomIndex: (state,action)=>{
			state.storyDomIndex = action.payload;
		},
		resetStories:(state,action)=>{
			state = initialState
		}
	},
	extraReducers:(builder)=>{
		builder
		.addCase(getFollowingStories.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getFollowingStories.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.stories = action.payload
		})
		.addCase(getFollowingStories.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
		.addCase(getFollowingActiveStories.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getFollowingActiveStories.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.activeStories = action.payload
		})
		.addCase(getFollowingActiveStories.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
		.addCase(createStory.pending,(state,action)=>{
			state.createStatus = 'loading'
		})
		.addCase(createStory.fulfilled,(state,action)=>{
			state.createStatus = 'succeeded'
		})
		.addCase(createStory.rejected,(state,action)=>{
			state.createStatus = 'failed'
		})
		.addCase(getStoriesByUserId.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getStoriesByUserId.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.stories = action.payload
		})
		.addCase(getStoriesByUserId.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
	}
})


export const selectAllStories = (state) => state.stories.stories;
export const selectAllActiveStories = (state) => state.stories.activeStories;
export const selectStoryById = (state,id) => {
	return state.stories.stories.find((storyItem)=> storyItem._id === id);
}
export const getStoryStatus = (state) => state.stories.status;
export const getCreateStoryStatus = (state) => state.stories.createStatus
export const getStoryDomIndex = (state) => state.stories.storyDomIndex

export const {setStoryDomIndex,resetStories} = storySlice.actions;
export default storySlice.reducer;


