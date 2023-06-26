import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseApi} from '../../config.js';
import {
	increaseReactionCount,
	decreaseReactionCount,
	addPostLike,
	removePostLike,
	addPostBookmark,
	removePostBookmark,
} from './reactionAsyncThunks'
import { addComment,removeComment } from '../commentSlice'
import { shareContent } from '../chatSlice'


const initialState = {
	posts:[],
	userPosts:[],
	status:'idle', // 'idle' | 'loading' | 'failed' | 'succeeded'
	createStatus: 'idle',
	error: null,
}


export const createPost = createAsyncThunk('posts/createPost',async ({userId,body,token})=>{
	try{
		const response = await axios.post(`${baseApi}/posts/create`,
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

export const getPosts = createAsyncThunk('posts/fetchPosts',async ({userId,token})=>{
	try{

		const posts = await axios.get(
			`${baseApi}/posts/${userId}`,
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

export const getPostsByUserId = createAsyncThunk('posts/getPostsByUserId', async (userId)=>{
	try{
		const posts = await axios.get(`${baseApi}/posts/user/${userId}`);
		return posts.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})

export const getFollowingPosts = createAsyncThunk('posts/getFollowingPosts', async (userId)=>{
	try{
		const posts = await axios.get(`${baseApi}/following/${userId}`);
		return posts.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})


export const deletePost = createAsyncThunk('posts/deletePost',async (userId,postId)=>{

	try{
		const response = await axios.delete(`${baseApi}/posts/${userId}/${postId}`);
		return response.data;
	}
	catch(error){
		throw new Error(error.response.data.message);
	}
})






const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers:{
		
	},
	extraReducers:(builder)=>{
		builder
		.addCase(getPosts.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getPosts.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.posts = action.payload
			
		})
		.addCase(getPosts.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
		.addCase(getPostsByUserId.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getPostsByUserId.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.userPosts = action.payload
		})
		.addCase(getPostsByUserId.rejected,(state,action)=>{
			state.status = 'failed'
			state.error = action.error.message
		})
		.addCase(addPostLike.pending,(state,action)=> increaseReactionCount(state,action,'likes'))
		.addCase(addPostLike.rejected,(state,action)=> decreaseReactionCount(state,action,'likes'))
		.addCase(removePostLike.pending,(state,action)=> decreaseReactionCount(state,action,'likes'))
		.addCase(removePostLike.rejected,(state,action)=> increaseReactionCount(state,action,'likes'))
		.addCase(addPostBookmark.pending,(state,action)=> increaseReactionCount(state,action,'bookmarks'))
		.addCase(addPostBookmark.rejected,(state,action)=> decreaseReactionCount(state,action,'bookmarks'))
		.addCase(removePostBookmark.pending,(state,action)=> decreaseReactionCount(state,action,'bookmarks'))
		.addCase(removePostBookmark.rejected,(state,action)=> increaseReactionCount(state,action,'bookmarks'))
		.addCase(addComment.fulfilled,(state,action)=> increaseReactionCount(state,action,'comments'))
		.addCase(removeComment.fulfilled,(state,action)=> decreaseReactionCount(state,action,'comments'))
		.addCase(shareContent.fulfilled,(state,action)=> increaseReactionCount(state,action,'shares'))
		.addCase(createPost.pending,(state,action)=>{
			state.createStatus = 'loading'
		})
		.addCase(createPost.fulfilled,(state,action)=>{
			state.createStatus = 'succeeded'
		})
		.addCase(createPost.rejected,(state,action)=>{
			state.createStatus = 'rejected'
		})
	}
})


export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state,id) => {
	return state.posts.posts.find((postItem)=> postItem._id === id);
}
export const selectUserPosts = (state) => state.posts.userPosts;
export const getPostStatus = (state) => state.posts.status;
export const getCreatePostStatus = state => state.posts.createStatus


export default postSlice.reducer;


