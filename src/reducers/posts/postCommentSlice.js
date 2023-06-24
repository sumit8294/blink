import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {baseApi} from '../../config.js'
import axios from 'axios'


export const addPostComment = createAsyncThunk('reactions/addPostComment', async ({postId,userId,content,token})=>{

	const response = await axios.post(
		`${baseApi}/reactions/comment/${postId}/${userId}`,
		{content},
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`,
			},
		}
	)
	return response.data;
})

export const getPostComments = createAsyncThunk('reactions/getPostComments', async ({postId,token})=>{

	const response = await axios.get(
		`${baseApi}/reactions/comment/${postId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;
})

export const removePostComment = createAsyncThunk('reactions/removePostComment', async ({postId,commentId,userId,token})=>{//userId for builder.addcase()

	const response = await axios.delete(
		`${baseApi}/reactions/comment/remove/${postId}/${commentId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;
})


const initialState = {
	comments: [],
	postId: null,
	status: 'idle',
	error: null
}

const postCommentSlice = createSlice({
	name:'postComments',
	initialState,
	reducers:{
		resetPostComments:(state,action)=>{
			state.comments = []
			state.postId = null
		}
	},
	extraReducers:(builder)=>{
		builder.addCase(getPostComments.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getPostComments.fulfilled,(state,action)=>{
			state.comments = action.payload
			state.postId = action.meta.arg.postId
			state.status = 'succeeded'
		})
		.addCase(getPostComments.rejected,(state,action)=>{
			state.error = "Failed to fetch comments"
			state.status = 'failed'
		})
		.addCase(addPostComment.fulfilled,(state,action)=>{
			const {postId,userId,auth,content} = action.meta.arg
			const {username,profile} = auth
			const {commentId} = action.payload
			state.comments.push({_id:commentId,user:{_id:userId,username,profile},content,post:postId});
			state.error = null
		})
		.addCase(addPostComment.rejected,(state,action)=>{
			state.error = "comment adding error"
		})
		.addCase(removePostComment.fulfilled,(state,action)=>{
			state.comments = state.comments.filter(commentItem => commentItem._id !== action.meta.arg.commentId)
		})
	}
})

export const selectPostComments = (state) => state.postComments.comments
export const selectCommentPostId = (state) => state.postComments.postId
export const selectCommentStatus = (state) => state.postComments.status
export const selectCommentError = (state) => state.postComments.error


export const {resetPostComments} = postCommentSlice.actions
export default postCommentSlice.reducer