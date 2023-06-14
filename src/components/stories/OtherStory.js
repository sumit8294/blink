import StoryItems from './StoryItems'


import { useState, useEffect } from 'react';
import axios from 'axios';

const OtherStory = () =>{


	const [storiesProfile,setStoriesProfile] = useState([]);

	const fetchStoriesProfile = async () =>{

		const loggedInUserId = "646e216a1b4dc70af49f495c";

		try{
			const response = await axios.get(`http://localhost:5000/stories/following/active/${loggedInUserId}`);

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
			{storiesProfile.map((story,index)=>{
				return(
				
					<StoryItems key={index} user={story.user} userStoryindex={index} loggedInUserId={"646e216a1b4dc70af49f495c"}/>
				
				)
			})}
		</>
	)
}

export default OtherStory;