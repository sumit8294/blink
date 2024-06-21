import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {baseApi} from '../config'

export const getSuggestions = createAsyncThunk('users/getSuggestions', async ({userId,token})=>{
	
	const response = await axios.get(
		`${baseApi}/suggestions/random/${userId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

export const getUserDetails = createAsyncThunk('users/getUsersDetails', async ({userId,loggedUserId,token})=>{
	
	const response = await axios.get(
		`${baseApi}/users/${userId}/${loggedUserId}`,
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
	users: [],
	userDetails: null,
	suggestions: [],
	status: 'idle',
	error: null,
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers:{
		setIsFollowing:(state,action)=>{
			state.userDetails.isFollowing = action.payload //true | false
		},
		setIsFollowingSuggesstions:(state,action)=>{
			const {status,userId} = action.payload

			state.suggestions = state.suggestions.map((suggestionItem)=>{

				if(userId === suggestionItem._id){	
					suggestionItem.isFollowing = !status;
				}
				return suggestionItem
			})
		},
		resetUser:(state,action)=>{
			state.users= []
			state.userDetails= null
			state.suggestions= []
			state.status= 'idle'
			state.error= null
		}
	},
	extraReducers:(builder)=>{
		builder
		.addCase(getSuggestions.pending, (state,action)=>{
			state.status = 'loading'
		})
		.addCase(getSuggestions.fulfilled, (state,action)=>{
			state.status = 'succeeded'
			state.suggestions = action.payload
		})
		.addCase(getSuggestions.rejected, (state,action)=>{
			console.log(action);
		})
		.addCase(getUserDetails.pending, (state,action)=>{
			state.status = 'loading'
		})
		.addCase(getUserDetails.fulfilled, (state,action)=>{
			state.status = 'succeeded'
			state.userDetails = action.payload
		})
		.addCase(getUserDetails.rejected, (state,action)=>{
			console.log(action);
		})
	}
})

export const selectAllSuggestions = state => state.users.suggestions
export const selectUsersStatus = state => state.users.status
export const selectUserDetails = state => state.users.userDetails

export const { setIsFollowing, setIsFollowingSuggesstions, resetUser } = userSlice.actions
export default userSlice.reducer;
