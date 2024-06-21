import FeedPostItems from './FeedPostItems';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getPosts, selectAllPosts,getPostStatus} from '../../reducers/posts/postSlice';
import {getAccessToken} from '../../reducers/authSlice';
import useAuth from '../../hooks/useAuth';
import PostLoading from '../loading/PostLoading'



const FeedPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const posts = useSelector(selectAllPosts)
	const token = useSelector(getAccessToken)
	const postStatus = useSelector(getPostStatus)
	const {userId} = useAuth();
	
	const dispatch = useDispatch();
	const fetchPosts = async () =>{

		dispatch(getPosts({token,userId,count:10}));
		
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

						{posts?.length > 0 && posts.map((post,i)=>{

							return <FeedPostItems key={i} post={post}/>

						})}

						{postStatus === 'loading' && <PostLoading/>}
					
					</div>					

				</>

			:
				<>
					<div className="px-2 my-2">

						<div className="flex justify-between">

							<div className="mx-auto w-96 laptop-lg:w-[24rem]" >
								{posts?.length > 0 && posts.map((post,i)=>{
									
									return <FeedPostItems key={i} post={post}/>

								})}
							
								{postStatus === 'loading' && <><PostLoading/><PostLoading/></>}		
							</div>


						</div>

					</div>

				</>

			}

		</>

	)

}

export default FeedPosts;