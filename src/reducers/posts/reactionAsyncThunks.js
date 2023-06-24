import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseApi} from '../../config.js';



export const addPostLike = createAsyncThunk('reaction/addPostLike',async ({userId,postId,token})=>{
	try{
		const posts = await axios.post(
			`${baseApi}/reactions/like/post/${postId}/${userId}`,
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



export const removePostLike = createAsyncThunk('reaction/removePostLike',async ({userId,postId,token})=>{

	try{
		const response = await axios.delete(
			`${baseApi}/reactions/like/post/remove/${postId}/${userId}`,
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

export const addPostBookmark = createAsyncThunk('reaction/addPostBookmark',async ({userId,postId,token})=>{
	try{
		const contentType = 'post' // because we are in postSlice not reelSlice
		const posts = await axios.post(
			`${baseApi}/reactions/bookmark/${contentType}/${postId}/${userId}`,
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



export const removePostBookmark = createAsyncThunk('reaction/removePostBookmark',async ({userId,postId,token})=>{

	try{
		const contentType = 'post' // because we are in postSlice not reelSlice
		const response = await axios.delete(
			`${baseApi}/reactions/bookmark/remove/${contentType}/${postId}/${userId}`,
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
	const {postId,contentId,userId} = action.meta.arg

	if(state.posts){
		state.posts = state.posts.map((post)=>{
			if(postId === post._id || contentId === post._id){
				post.reactions[reactionType] -= 1
				if(reactionType === 'likes'){
					post.mutualLikes = post.mutualLikes.filter(likeItem => likeItem.user._id !== userId)
					post.likeState = false
				} 
				else if(reactionType === 'bookmarks') post.bookmarkState = false
			}
			return post
		})
	}
}

export const increaseReactionCount = (state,action,reactionType) => {
	const {postId,contentId,userId,auth} = action.meta.arg
	const {username,profile} = auth; //from its dispatch() call **neccessary needed**

	if(state.posts){
		state.posts = state.posts.map((post)=>{
			if(postId === post._id || contentId === post._id){
				post.reactions[reactionType] += 1
				if(reactionType === 'likes'){
					post.mutualLikes.push({user:{_id:userId,username,profile}});
					post.likeState = true
				} 
				else if(reactionType === 'bookmarks') post.bookmarkState = true
			}
			return post
		})
	}
}
