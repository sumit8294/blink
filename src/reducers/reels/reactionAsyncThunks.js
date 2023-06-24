import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseApi} from '../../config.js';



export const addReelLike = createAsyncThunk('reaction/addReelLike',async ({userId,reelId,token})=>{
	try{
		const reels = await axios.post(
			`${baseApi}/reactions/like/reel/${reelId}/${userId}`,
			{},
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			});
		return reels.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
})



export const removeReelLike = createAsyncThunk('reaction/removeReelLike',async ({userId,reelId,token})=>{

	try{
		const response = await axios.delete(
			`${baseApi}/reactions/like/remove/reel/${reelId}/${userId}`,
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			});
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})

export const addReelBookmark = createAsyncThunk('reaction/addReelBookmark',async ({userId,reelId,token})=>{
	
	try{
		const contentType = 'reel' // because we are in postSlice not reelSlice
		const posts = await axios.post(
			`${baseApi}/reactions/bookmark/${contentType}/${reelId}/${userId}`,
			{},
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			});
		return posts.data;
	}
	catch(error){
		const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
	}
})



export const removeReelBookmark = createAsyncThunk('reaction/removeReelBookmark',async ({userId,reelId,token})=>{

	try{
		const contentType = 'reel' // because we are in postSlice not reelSlice
		const response = await axios.delete(
			`${baseApi}/reactions/bookmark/remove/${contentType}/${reelId}/${userId}`,
			{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${token}`
				}
			});
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})


export const decreaseReactionCount = (state,action,reactionType) => {
	const {reelId,contentId,userId} = action.meta.arg

	if(state.reels){
		state.reels = state.reels.map((reel)=>{
			if(reelId === reel._id || contentId === reel._id){
				reel.reactions[reactionType] -= 1
				if(reactionType === 'likes'){
					reel.mutualLikes = reel.mutualLikes.filter(likeItem => likeItem.user._id !== userId)
					reel.likeState = false
				} 
				else if(reactionType === 'bookmarks') reel.bookmarkState = false
			}
			return reel
		})
	}
}

export const increaseReactionCount = (state,action,reactionType) => {
	const { reelId,contentId,userId,auth } = action.meta.arg
	const { username,profile } = auth; //from its dispatch() call **neccessary needed**
	
	if(state.reels){
		state.reels = state.reels.map((reel)=>{
			if(reelId === reel._id || contentId === reel._id){
				reel.reactions[reactionType] += 1
				if(reactionType === 'likes'){
					reel.mutualLikes.push({user:{_id:userId,username,profile}});
					reel.likeState = true
				} 
				else if(reactionType === 'bookmarks') reel.bookmarkState = true
			}
			return reel
		})
	}
}
