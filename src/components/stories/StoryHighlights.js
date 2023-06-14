import HighlightItems from './HighlightItems';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const StoryHighlights = () =>{

	const [storiesHighlights,setStoriesHighlights] = useState([]);

	const {userId} = useParams();

	const fetchStories = async () =>{

		try{
			const response = await axios.get(`http://localhost:5000/stories/user/${userId}`);

			if(response.data){
				setStoriesHighlights(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log(error.response.message);
			}
			else{
				console.log("story highlights not fetched");
			}
		}
	}

	useEffect(()=>{
		fetchStories();
	},[])

	return (
		<>

			{storiesHighlights.story && storiesHighlights.story.map((storyItem,index)=>{

				return	(<HighlightItems key={index} profile={storyItem.storyUrl} />)
				
			})}
		</>
	)
}

export default StoryHighlights;