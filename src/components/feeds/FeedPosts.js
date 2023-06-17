import FeedPostItems from './FeedPostItems';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getPosts, selectAllPosts} from '../../reducers/postSlice';
import {getAccessToken} from '../../reducers/authSlice';



const FeedPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const posts = useSelector(selectAllPosts);
	const token = useSelector(getAccessToken);

	const dispatch = useDispatch();

	const fetchPosts = async () =>{

		dispatch(getPosts(token));
		
	} 

	useEffect(()=>{
		fetchPosts();
	},[]);

	return (
		<>
			{isMobileOrTablet 

			?
				<>

					<div className="posts-container tablet-sm:w-8/12 tablet-sm:mx-auto tablet-md:w-7/12 " >

						{posts.map((post,i)=>{

							return <FeedPostItems key={i} post={post}/>

						})}
					
					</div>					

				</>

			:
				<>
					<div className=" px-2 my-2">

						{/*{<div className="Feed-header flex h-12 ">

							<h3 className="poppins text-2xl font-bold py-2">Feed</h3>

						</div>}*/}

						<div className="flex justify-between">

							<div className="mx-auto w-96 laptop-lg:w-[24rem]" >

								{posts.map((post,i)=>{
									
									return <FeedPostItems key={i} post={post}/>

								})}
							
							</div>		

						</div>

					</div>

				</>

			}

		</>

	)

}

export default FeedPosts;