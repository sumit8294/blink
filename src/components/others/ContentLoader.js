import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import {useEffect,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getPosts, selectAllPosts,getPostStatus} from '../../reducers/posts/postSlice';
import {getReels, selectAllReels,getReelsStatus} from '../../reducers/reels/reelSlice';
import {getAccessToken} from '../../reducers/authSlice';
import useAuth from '../../hooks/useAuth';
import PostLoading from '../loading/PostLoading'
import ReelPostItems from '../reels/ReelPostItems'
import FeedPostItems from '../feeds/FeedPostItems'




const ContentLoader = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const token = useSelector(getAccessToken);
	const posts = useSelector(selectAllPosts);
	const reels = useSelector(selectAllReels);
	const content = reels.concat(posts.slice(0,5))
	const {userId} = useAuth();
	const dispatch = useDispatch();

	const fetchContent = () => {
		dispatch(getPosts({userId,token}));
		dispatch(getReels({userId,token}));
	}



	const containerRef = useRef(null)
  	const reelRefsArray = useRef([])


  	const reelsStatus = useSelector(getReelsStatus)

  	const fetchReels = () => {
  		dispatch(getReels({userId,token}))
  	}

  	const scrollReelWithButton = (scrollTo) =>{
  		const container = containerRef.current
  		const videoHeight = container.offsetHeight
  		if(scrollTo === 'up'){
  			container.scrollTop -= videoHeight
  		}
  		else if(scrollTo === 'down'){
  			container.scrollTop += videoHeight
  		}
  	}

  	let previousVideo = reelRefsArray.current[0]
  	const playCurrentVideo = () => {
  		
	    const container = containerRef.current
	    const scrollPosition = container.scrollTop
	    const videoHeight = container.offsetHeight

	    const currentIndex = Math.floor(scrollPosition / videoHeight)
	    const currentVideo = reelRefsArray.current[currentIndex]
	    
	    
		    if (currentVideo && currentVideo.currentTime === 0) {
		    	if(previousVideo){
			    	previousVideo.pause()
					previousVideo.currentTime = 0
		    	}
		    	currentVideo.play()
		    	.then(success => {})
				.catch(error => {})

		    	previousVideo = currentVideo
		    }

	}

	useEffect(()=>{
		fetchContent()
	},[])

	return (
		<>
			{isMobileOrTablet 
				// TAKE HELP OF FEEDpOSTS.JS AND REELpOSTS.JS FOR CSS AND LAYOUT DESIGN
			?
				<>
					<div ref={containerRef} onScroll={playCurrentVideo} className="duration-700 reel-posts mx-auto h-screen snap-y snap-mandatory overflow-y-auto tablet-sm:w-[24rem]" >


						{content && content.map((item,index)=>{

								if(item.hasOwnProperty("videoUrl")){

									return <ReelPostItems reelId={index+''} key={index} reel={item} reelRef={video => (reelRefsArray.current[index] = video)}/>
								}
								else if(item.hasOwnProperty("imageUrl")){

									return <FeedPostItems key={index} post={item}/>
								}
							})


						}

					</div>

				</>

			:
				<>
					<div ref={containerRef} onScroll={playCurrentVideo} className="duration-700 reel-posts laptop-lg:py-10 laptop-lg:px-2 mx-auto laptop-lg:mb-10 h-screen snap-y snap-mandatory overflow-y-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

						{content && content.map((item,index)=>{

								if(item.hasOwnProperty("videoUrl")){

									return <ReelPostItems reelId={index+''} key={index} reel={item} reelRef={video => (reelRefsArray.current[index] = video)}/>
								}
								else if(item.hasOwnProperty("imageUrl")){

									return <FeedPostItems key={index} post={item}/>
								}
							})


						}

						{reelsStatus === 'loading' && <p className="text-white">Loading</p>}
							
					</div>

					<div className="hidden laptop-lg:flex flex pb-28 flex-col justify-between">

						<button className="text-3xl w-14 h-14  font-bold text-blink-gray-2 rounded-full " >

							<FontAwesomeIcon icon={faCircleUp} onClick={()=>scrollReelWithButton('up')}/>

						</button>

						<button className="text-3xl w-14 h-14 font-bold text-blink-gray-2 rounded-full " >

							<FontAwesomeIcon icon={faCircleDown} onClick={()=>scrollReelWithButton('down')}/>

						</button>

					</div>

				</>

			}

		</>

	)

}

export default ContentLoader;