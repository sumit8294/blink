import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import React,{useEffect,useRef,useContext} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { selectAllPosts,getPostById,resetPosts} from '../../reducers/posts/postSlice';
import { selectAllReels,getReelsStatus,getReelById,resetReels} from '../../reducers/reels/reelSlice';
import {getAccessToken} from '../../reducers/authSlice';
import useAuth from '../../hooks/useAuth';
import ReelPostItems from '../reels/ReelPostItems'
import FeedPostItems from '../feeds/FeedPostItems'

import Share from '../others/Share';
import Comment from '../others/Comment';
import {DialogContext} from '../../store/DialogContext';
import { getComments } from '../../reducers/commentSlice';





const ContentLoader = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const {state} = useContext(DialogContext)
	const {setCommentsVisibility} = useContext(DialogContext);

	const token = useSelector(getAccessToken);
	const posts = useSelector(selectAllPosts);
	const reels = useSelector(selectAllReels);
	
	const {userId} = useAuth();
	const dispatch = useDispatch();
	const {contentType, contentId, notificationType} = useParams();

	const fetchContent = () => {

		if(contentType === 'post'){
			dispatch(getPostById({token,userId,postId:contentId}))
		}else if(contentType === 'reel'){
			dispatch(getReelById({token,userId,reelId:contentId}))
		}

	}

	const containerRef = useRef(null)
  	const reelRefsArray = useRef([])


  	const reelsStatus = useSelector(getReelsStatus)


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
		if(notificationType === 'comment') {
			dispatch(getComments({token,contentId,contentType}))
			setCommentsVisibility(true)
		}

		return ()=>{
			
			dispatch(resetReels())
			dispatch(resetPosts())
		}
	},[])

	return (
		<>
			{isMobileOrTablet 
				// TAKE HELP OF FEEDpOSTS.JS AND REELpOSTS.JS FOR CSS AND LAYOUT DESIGN
			?
				<>
					<div ref={containerRef} onScroll={playCurrentVideo} className="duration-700 reel-posts mx-auto h-screen snap-y snap-mandatory overflow-y-auto tablet-sm:w-[24rem]" >


						{reels.length > 0 && reels.map((item,index)=>{
								
							return <ReelPostItems reelId={index+''} key={index} reel={item} reelRef={video => (reelRefsArray.current[index] = video)}/>
															
							})

						}

						{posts.length > 0 && posts.map((item,index)=>{
								
								
							return <FeedPostItems key={index} post={item}/>
							
							})

						}

					</div>

					{state.commentsVisibility && <Comment />}
					{state.sharesVisibility && <Share />}

				</>

			:
				<>
					<div ref={containerRef} onScroll={playCurrentVideo} className="duration-700 reel-posts laptop-lg:py-10 laptop-lg:px-2 mx-auto laptop-lg:mb-10 h-screen snap-y snap-mandatory overflow-y-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

						{reels.length > 0 && reels.map((item,index)=>{
								
							return <ReelPostItems reelId={index+''} key={index} reel={item} reelRef={video => (reelRefsArray.current[index] = video)}/>
															
							})

						}

						{posts.length > 0 && posts.map((item,index)=>{
								
								
							return <FeedPostItems key={index} post={item}/>
							
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

					{state.commentsVisibility && <Comment />}
					{state.sharesVisibility && <Share />}

				</>

			}

		</>

	)

}

export default React.memo(ContentLoader);