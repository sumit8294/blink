import PostsGrid from './PostsGrid';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {selectUserPosts,getPostsByUserId} from '../../reducers/posts/postSlice';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth'



const UserPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const {token} = useAuth();

	//const [posts,setPosts] = useState([]);

	const {userId} = useParams();

	const dispatch = useDispatch();

	const posts = useSelector(selectUserPosts);

	// const fetchPosts = async () =>{

	// 	try{
	// 		const response = await axios.get(`http://localhost:5000/posts/user/${userId}`);

	// 		if(response.data){
				
	// 			setPosts(response.data);
	// 		}
	// 	}
	// 	catch(error){
	// 		if(error.response && error.response.status === 404){
	// 			console.log(error.response.message);
	// 		}
	// 		else{
	// 			console.log("posts not fetched");
	// 		}
	// 	}
	// }

	const elements = [];

	for (let i = 0; i <= 8; i++) {
		elements.push(<div key={i} className="post relative rounded-xl image-box" style={{opacity:"0"}} >	</div>);
	}

	useEffect(()=>{
		// fetchPosts();
		dispatch(getPostsByUserId({userId,token}))
	},[])

	return (
		<>
			{isMobileOrTablet
				?
					<>
						<div className=" py-2">
			
							<div className="image-gallery mx-auto py-px " >
								{posts.length > 0 && posts.map((post,i)=>{
									return <PostsGrid key={i} post={post}/>
								})}
								{elements}
							</div>

						</div>
					</>
				:
					<>
						<div className=" px-6 py-2">
							<div className="explore-image-gallery-desktop py-px px-6 " >
								{posts.length > 0 && posts.map((post,i)=>{
									return <PostsGrid key={i} post={post}/>
								})}
								{elements}
							</div>
						</div>
					</>

			}
		</>
	)
}

export default UserPosts;