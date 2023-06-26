import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice'
import postSlice from '../reducers/posts/postSlice'
import userSlice from '../reducers/userSlice'
import commentSlice from '../reducers/commentSlice'
import chatSlice from '../reducers/chatSlice'
import reelSlice from '../reducers/reels/reelSlice'
import followerSlice from '../reducers/followerSlice'
import storySlice from '../reducers/storySlice'



export const store = configureStore({
	reducer:{
		auth:authSlice,
		posts:postSlice,
		users:userSlice,
		comments:commentSlice,
		chats:chatSlice,
		reels:reelSlice,
		followers:followerSlice,
		stories:storySlice
	}
})