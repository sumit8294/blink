import StoryItems from './StoryItems'
import useAuth from '../../hooks/useAuth';

import { useState, useEffect } from 'react';
import {getFollowingActiveStories,selectAllActiveStories,getStoryStatus} from '../../reducers/storySlice';
import {useSelector,useDispatch} from 'react-redux'

const OtherStory = () =>{

	const dispatch = useDispatch();
	const storiesProfile = useSelector(selectAllActiveStories);
	const status = useSelector(getStoryStatus);
	const {userId:loggedInUser,token} = useAuth();
	
	const fetchStoriesProfile = async () =>{

		dispatch(getFollowingActiveStories({loggedInUser,token}))
	}
	
	useEffect(()=>{
		fetchStoriesProfile();
	},[])
	

	return (
		<>
			{storiesProfile?.length > 0 && storiesProfile.map((profile,index)=>{
				return(
				
					<StoryItems key={index} profile={profile} userStoryindex={index} loggedInUserId={loggedInUser}/>
				
				)
			})}
		</>
	)
}

export default OtherStory;