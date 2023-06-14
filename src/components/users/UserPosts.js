import PostsGrid from './PostsGrid';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';



const UserPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [posts,setPosts] = useState([]);

	const {userId} = useParams();

	const fetchPosts = async () =>{

		try{
			const response = await axios.get(`http://localhost:5000/posts/user/${userId}`);

			if(response.data){
				
				setPosts(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log(error.response.message);
			}
			else{
				console.log("posts not fetched");
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
								{posts && posts.map((post,i)=>{
									return <PostsGrid key={i} post={post}/>
								})}
								
							</div>

						</div>
					</>
				:
					<>
						<div className=" px-6 py-2">
							<div className="explore-image-gallery-desktop py-px px-6 " >
								{posts && posts.map((post,i)=>{
									return <PostsGrid key={i} post={post}/>
								})}
								
							</div>
						</div>
					</>

			}
		</>
	)
}

export default UserPosts;