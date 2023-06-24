import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {baseApi} from '../../config.js'
import axios from 'axios'


export const addComment = createAsyncThunk('reactions/addComment', async ({postId,userId,content,token})=>{

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

export const getComments = createAsyncThunk('reactions/getComments', async ({postId,token})=>{

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

export const removeComment = createAsyncThunk('reactions/removeComment', async ({postId,commentId,userId,token})=>{//userId for builder.addcase()

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

const commentSlice = createSlice({
	name:'comments',
	initialState,
	reducers:{
		resetComments:(state,action)=>{
			state.comments = []
			state.postId = null
		}
	},
	extraReducers:(builder)=>{
		builder.addCase(getComments.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getComments.fulfilled,(state,action)=>{
			state.comments = action.payload
			state.postId = action.meta.arg.postId
			state.status = 'succeeded'
		})
		.addCase(getComments.rejected,(state,action)=>{
			state.error = "Failed to fetch comments"
			state.status = 'failed'
		})
		.addCase(addComment.fulfilled,(state,action)=>{
			const {postId,userId,auth,content} = action.meta.arg
			const {username,profile} = auth
			const {commentId} = action.payload
			state.comments.push({_id:commentId,user:{_id:userId,username,profile},content,post:postId});
			state.error = null
		})
		.addCase(addComment.rejected,(state,action)=>{
			state.error = "comment adding error"
		})
		.addCase(removeComment.fulfilled,(state,action)=>{
			state.comments = state.comments.filter(commentItem => commentItem._id !== action.meta.arg.commentId)
		})
	}
})

export const selectReelComments = (state) => state.comments.comments
export const selectCommentReelId = (state) => state.comments.postId
export const selectCommentStatus = (state) => state.comments.status
export const selectCommentError = (state) => state.comments.error


export const {resetComments} = commentSlice.actions
export default commentSlice.reducer