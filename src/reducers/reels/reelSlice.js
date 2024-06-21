import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {baseApi} from '../../config.js'

import {
	increaseReactionCount,
	decreaseReactionCount,
	addReelLike,
	removeReelLike,
	addReelBookmark,
	removeReelBookmark,
} from './reactionAsyncThunks'

import { addComment,removeComment } from '../commentSlice'
import { shareContent } from '../chatSlice'

export const createReel = createAsyncThunk('reels/createReel',async ({userId,body,token}) =>{
	try{
		const response = await axios.post(
			`${baseApi}/reels/create`,
			body,
			{
				withCredentials:true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		)
		return response.data
	}
	catch(error){
		const errorMessage = error.response.data.message || 'Unknown Error Occur'
		throw new Error(errorMessage)
	}
})

export const getReels = createAsyncThunk('reels/getReels',async ({userId,count,token})=>{

	try{
		const response = await axios.get(
			`${baseApi}/reels/random/${count}/${userId}`,
			{
				withCredentials:true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		)
		return response.data;
	}
	catch(error){

	}
})

export const getReelById = createAsyncThunk('reels/getReelById', async ({reelId,userId,token})=>{
	try{
		const response1 = await axios.get(
			`${baseApi}/reels/${reelId}/${userId}`,
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		);
		const response2 = await axios.get(
			`${baseApi}/reels/${userId}`,
			{
				withCredentials:true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			}
		)
		if(response1 && response2){
			return [response1.data,...response2.data];
		}
	}
	catch(error){
		throw new Error(error.response1.data.message);
	}
})

const filterReels = (reels) =>{
	const uniqueIds = new Set();

	const uniqueReels = reels.filter((reelItem)=>{

		if(!uniqueIds.has(reelItem._id)){
			uniqueIds.add(reelItem._id)
			return true
		}
		
		return false;
	})

	return uniqueReels
}

const initialState = {
	reels: [],
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	createStatus: 'idle',
	error: null,

}

const reelSlice = createSlice({
	name:"reels",
	initialState,
	reducers:{
		resetReels: (state,action)=>{
			state = initialState
		}
	},
	extraReducers:(builder)=>{
		builder.addCase(getReels.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getReels.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.reels = action.payload
		})
		.addCase(getReels.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
		.addCase(getReelById.pending,(state,action)=>{
			state.status = 'loading'
			state.reels = []
		})
		.addCase(getReelById.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.reels = filterReels(action.payload)	
		})
		.addCase(getReelById.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
		.addCase(addReelLike.pending,(state,action)=> increaseReactionCount(state,action,'likes'))
		.addCase(addReelLike.rejected,(state,action)=> decreaseReactionCount(state,action,'likes'))
		.addCase(removeReelLike.pending,(state,action)=> decreaseReactionCount(state,action,'likes'))
		.addCase(removeReelLike.rejected,(state,action)=> increaseReactionCount(state,action,'likes'))
		.addCase(addReelBookmark.pending,(state,action)=> increaseReactionCount(state,action,'bookmarks'))
		.addCase(addReelBookmark.rejected,(state,action)=> decreaseReactionCount(state,action,'bookmarks'))
		.addCase(removeReelBookmark.pending,(state,action)=> decreaseReactionCount(state,action,'bookmarks'))
		.addCase(removeReelBookmark.rejected,(state,action)=> increaseReactionCount(state,action,'bookmarks'))
		.addCase(addComment.fulfilled,(state,action)=> increaseReactionCount(state,action,'comments'))
		.addCase(removeComment.fulfilled,(state,action)=> decreaseReactionCount(state,action,'comments'))
		.addCase(shareContent.fulfilled,(state,action)=> increaseReactionCount(state,action,'shares'))
		.addCase(createReel.pending,(state,action)=>{
			state.createStatus = 'loading'
		})
		.addCase(createReel.fulfilled,(state,action)=>{
			state.createStatus = 'succeeded'
		})
		.addCase(createReel.rejected,(state,action)=>{
			state.createStatus = 'rejected'
		})

	}
})

export const getReelsStatus = state => state.reels.status
export const selectAllReels = state => state.reels.reels
export const selectReelById = (state,id) => {
	if(state.reels.reels){
		return state.reels.reels.find((reelItem)=> reelItem._id === id);
	}
}
export const getCreateReelStatus = state => state.reels.createStatus

export const {resetReels} = reelSlice.actions;


export default reelSlice.reducer;
