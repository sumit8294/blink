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

export const addReel = createAsyncThunk('reels/addReel',async ({body,token}) =>{
	try{
		const response = await axios.post(
			`${baseApi}/reels/`,
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

export const getReels = createAsyncThunk('reels/getReels',async ({userId,token})=>{

	try{
		const response = await axios.get(
			`${baseApi}/reels/${userId}`,
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

const initialState = {
	reels: [],
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,

}

const reelSlice = createSlice({
	name:"reels",
	initialState,
	reducers:{

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
	}
})

export const getReelsStatus = state => state.reels.status
export const selectAllReels = state => state.reels.reels
export const selectReelById = (state,id) => {
	return state.reels.reels.find((reelItem)=> reelItem._id === id);
}

export default reelSlice.reducer;
