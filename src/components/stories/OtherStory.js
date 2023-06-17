import StoryItems from './StoryItems'
import useAuth from '../../hooks/useAuth';

import { useState, useEffect } from 'react';
import axios from 'axios';

const OtherStory = () =>{


	const [storiesProfile,setStoriesProfile] = useState(null);

	const loggedInUser = useAuth();

	const {userId} = loggedInUser;
	
	const fetchStoriesProfile = async () =>{

		try{
			const response = await axios.get(`http://localhost:5000/stories/following/active/${userId}`);

			if(response.data){
				
				setStoriesProfile(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 400){
				console.log(error.response.message);
			}
			else{
				console.log("Stories profile not fetched");

			}
		}
	}

	useEffect(()=>{
		fetchStoriesProfile();
	},[])


	return (
		<>
			{storiesProfile && storiesProfile.map((story,index)=>{
				return(
				
					<StoryItems key={index} user={story.user} userStoryindex={index} loggedInUserId={userId}/>
				
				)
			})}
		</>
	)
}

export default OtherStory;