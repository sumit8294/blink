import {configureStore} from '@reduxjs/toolkit'
import authSlice,{resetAuth} from '../reducers/authSlice'
import postSlice,{resetPosts} from '../reducers/posts/postSlice'
import userSlice,{resetUser} from '../reducers/userSlice'
import commentSlice,{resetComments} from '../reducers/commentSlice'
import chatSlice,{resetChats} from '../reducers/chatSlice'
import reelSlice,{resetReels} from '../reducers/reels/reelSlice'
import followerSlice,{resetFollowers} from '../reducers/followerSlice'
import storySlice,{resetStories} from '../reducers/storySlice'


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

export const resetStore = (dispatch) =>{
	dispatch(resetAuth())
	dispatch(resetPosts())
	dispatch(resetUser())
	dispatch(resetComments())
	dispatch(resetChats())
	dispatch(resetReels())
	dispatch(resetFollowers())
	dispatch(resetStories())
}