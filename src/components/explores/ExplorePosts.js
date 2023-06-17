import ExplorePostItems from './ExplorePostItems'

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import axios from 'axios';
import {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getAccessToken,getAccessTokenWithRefreshToken} from '../../reducers/authSlice';


const ExplorePosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [explorePosts,setExplorePosts] = useState([]);
	const token = useSelector(getAccessToken);
	const dispatch = useDispatch();
	const fetchPosts = async () =>{
		try{

			const response = await axios.get(
				'http://localhost:5000/posts',
				{
					withCredential: true,
					headers:{
						'authorization':`Bearer ${token}`
					}
				});

			if(response.data){
				setExplorePosts(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 403){
				try{
					
					await dispatch(getAccessTokenWithRefreshToken());

				}
				catch(error){
					console.log(error)
				}
			}
			else{
				console.log(error);
			}
		}
	}

	useEffect(()=>{
		fetchPosts();
	},[token])

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