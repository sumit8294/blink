import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseApi} from '../config.js';

const initialState = {
	posts:[],
	userPosts:[],
	status:'idle', // 'idle' | 'loading' | 'failed' | 'succeeded'
	error: null,
}

export const getPosts = createAsyncThunk('posts/fetchPosts',async (token)=>{
	try{
		
		const posts = await axios.get(
			`${baseApi}/posts`,
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

export const createPost = createAsyncThunk('posts/createPost',async (body)=>{
	try{
		const response = await axios.post(`${baseApi}/posts/create`,body,{withCredentials:true});
		return response.data;
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
	reducer:{

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
	}
})


export const selectAllPosts = (state) => state.posts.posts;
export const selectUserPosts = (state) => state.posts.userPosts;

export default postSlice.reducer;