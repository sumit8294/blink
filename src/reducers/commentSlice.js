import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {baseApi} from '../config.js'
import axios from 'axios'


export const addComment = createAsyncThunk('reactions/addComment', async ({contentId,contentType,userId,content,token})=>{

	const response = await axios.post(
		`${baseApi}/reactions/comment/${contentType}/${contentId}/${userId}`,
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

export const getComments = createAsyncThunk('reactions/getComments', async ({contentId,contentType,token})=>{

	const response = await axios.get(
		`${baseApi}/reactions/comment/${contentType}/${contentId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;
})

export const removeComment = createAsyncThunk('reactions/removeComment', async ({contentId,contentType,commentId,userId,token})=>{//userId for builder.addcase()

	const response = await axios.delete(
		`${baseApi}/reactions/comment/remove/${contentType}/${contentId}/${commentId}`,
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
	contentId: null,
	contentType: null,
	status: 'idle',
	error: null
}

const commentSlice = createSlice({
	name:'comments',
	initialState,
	reducers:{
		resetComments:(state,action)=>{
			state.comments = []
			state.contentId = null
			state.contentType = null

		}
	},
	extraReducers:(builder)=>{
		builder
		.addCase(getComments.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(getComments.fulfilled,(state,action)=>{
			state.comments = action.payload
			state.contentId = action.meta.arg.contentId
			state.contentType = action.meta.arg.contentType
			state.status = 'succeeded'
		})
		.addCase(getComments.rejected,(state,action)=>{
			state.error = "Failed to fetch comments"
			state.status = 'failed'
		})
		.addCase(addComment.fulfilled,(state,action)=>{
			const {contentId,userId,auth,content} = action.meta.arg
			const {username,profile} = auth
			const {commentId} = action.payload
			state.comments.push({_id:commentId,user:{_id:userId,username,profile},content,post:contentId});
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

export const selectAllComments = (state) => state.comments.comments
export const selectCommentContentId = (state) => state.comments.contentId
export const selectCommentContentType = (state) => state.comments.contentType
export const selectCommentStatus = (state) => state.comments.status
export const selectCommentError = (state) => state.comments.error


export const {resetComments} = commentSlice.actions
export default commentSlice.reducer