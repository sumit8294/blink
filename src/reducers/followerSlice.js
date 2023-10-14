import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {baseApi} from '../config'

export const getFollowers = createAsyncThunk('followers/getFollowers', async ({userId,loggedUserId,token})=>{
	
	const response = await axios.get(
		`${baseApi}/followers/${userId}/${loggedUserId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

export const getFollowings = createAsyncThunk('followers/getFollowings', async ({userId,loggedUserId,token})=>{
	
	const response = await axios.get(
		`${baseApi}/followers/following/${userId}/${loggedUserId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

export const followUser = createAsyncThunk('followers/followUser', async ({userId,loggedUserId,token})=>{
	
	const response = await axios.post(
		`${baseApi}/followers/follow/${userId}/${loggedUserId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

export const unfollowUser = createAsyncThunk('followers/unfollowUser', async ({userId,loggedUserId,token})=>{
	
	const response = await axios.delete(
		`${baseApi}/followers/unfollow/${userId}/${loggedUserId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

const increaseFollowCount = (state,action) => {
	const {userId} = action.meta.arg

	if(state.type === 'followers'){
		state.followers = state.followers.map((followItem)=>{

				if(userId === followItem.follower._id){
					followItem.isFollowing = true
				}
			
			return followItem
		})
	}else if(state.type === 'followings'){
		state.followings = state.followings.map((followItem)=>{
			
				if(userId === followItem.user._id){
					followItem.isFollowing = true
				}
			
			return followItem
		})
	}
}

const decreaseFollowCount = (state,action) => {
	const {userId} = action.meta.arg
	
	if(state.type === 'followers'){
		state.followers = state.followers.map((followItem)=>{
				
				if(userId === followItem.follower._id){	
					followItem.isFollowing = false
				}
			
			return followItem
		})
	}else if(state.type === 'followings'){
		state.followings = state.followings.map((followItem)=>{
			
				if(userId === followItem.user._id){
					followItem.isFollowing = false
				}
			
			return followItem
		})
	}
}

const initialState = {
	followers: [],
	followings: [],
	type: null,
	status: 'idle',
	error: null,
}

const followerSlice = createSlice({
	name: 'followers',
	initialState,
	reducers:{
		setFollowersListType:(state,action)=>{
			state.type = action.payload
		},
		resetList:(state,action)=>{
			if(action.payload === 'followings'){
				state.followings = []
			}else if(action.payload === 'followers'){
				state.followers = []
			}
		},
		resetFollowers:(state,action)=>{
			state = initialState
		}
	},
	extraReducers:(builder)=>{
		builder
		.addCase(getFollowers.pending, (state,action)=>{
			state.status = 'loading'
		})
		.addCase(getFollowers.fulfilled, (state,action)=>{
			state.status = 'succeeded'
			state.followers = action.payload

		})
		.addCase(getFollowers.rejected, (state,action)=>{
			console.log(action);
		})
		.addCase(getFollowings.pending, (state,action)=>{
			state.status = 'loading'
		})
		.addCase(getFollowings.fulfilled, (state,action)=>{
			state.status = 'succeeded'
			state.followings = action.payload
		})
		.addCase(getFollowings.rejected, (state,action)=>{
			console.log(action);
		})
		.addCase(followUser.pending, (state,action)=>{
			increaseFollowCount(state,action)
		})
		.addCase(followUser.rejected, (state,action)=>{
			console.log(action);
			decreaseFollowCount(state,action)
		})
		.addCase(unfollowUser.pending, (state,action)=>{
			decreaseFollowCount(state,action)
		})
		.addCase(unfollowUser.rejected, (state,action)=>{
			console.log(action)
			increaseFollowCount(state,action)
		})
	}
})

export const selectAllFollowers = state => state.followers.followers
export const selectAllFollowings = state => state.followers.followings
export const selectListStatus = state => state.followers.status
export const selectListType = state => state.followers.type


export const {setFollowersListType,resetList,resetFollowers} = followerSlice.actions
export default followerSlice.reducer;
