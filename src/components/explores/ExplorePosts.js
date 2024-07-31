import ExplorePostItems from './ExplorePostItems'

import { useMediaQuery } from 'react-responsive'
import { mobileMediaQuery } from '../../ReactResponsiveQueries'


import { useEffect} from 'react'
import {useSelector,useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { getPosts,selectAllPosts } from '../../reducers/posts/postSlice'

import './exploreposts.css'
const ExplorePosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery)
	const dispatch = useDispatch()

	const {userId,token} = useAuth()
	
	const explorePosts = useSelector(selectAllPosts)

	const fetchPosts = () => {
		dispatch(getPosts({userId,token,count:25}))
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

								{explorePosts?.length > 0 && explorePosts.map((post,i)=>{

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

								{explorePosts?.length > 0  && explorePosts.map((post,i)=>{

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
