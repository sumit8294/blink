import ExplorePostItems from './ExplorePostItems'

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import axios from 'axios';
import {useState, useEffect} from 'react';


const ExplorePosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [explorePosts,setExplorePosts] = useState([]);
	const fetchPosts = async () =>{

		try{

			const response = await axios.get('http://localhost:5000/posts');

			if(response.data){
				setExplorePosts(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log("posts not found");
			}
			else{
				console.log("Something went wrong");
			}
		}
	}

	useEffect(()=>{
		fetchPosts();
	},[])

	return (
		<>

			{isMobileOrTablet

				?

					<>

						<div className=" py-2">
			
							<div className="image-gallery mx-auto py-px " >

								{explorePosts.map((post,i)=>{

									return <ExplorePostItems key={i} post={post}/>

								})}
								
							</div>

						</div>

					</>

				:
					<>

						<div className=" px-6 py-2">

							<div className="Explore-header flex h-12 ">

								<h3 className="poppins text-2xl font-bold py-2">Explore</h3>

							</div>

							<div className="explore-image-gallery-desktop mx-auto py-px px-6 " >

								{explorePosts.map((post,i)=>{

									return <ExplorePostItems key={i} post={post}/>

								})}
								
							</div>

						</div>

					</>

			}
		</>
	)
}

export default ExplorePosts;