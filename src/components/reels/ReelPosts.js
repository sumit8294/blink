import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import ReelPostItems from './ReelPostItems'
import { useRef, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { 
	selectAllReels,
	getReels,
	getReelsStatus 
} from '../../reducers/reels/reelSlice' 
import useAuth from '../../hooks/useAuth'

import { useMediaQuery } from 'react-responsive'
import { mobileMediaQuery } from '../../ReactResponsiveQueries'
import Loading from '../elements/Loading'


const ReelPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery)
	const containerRef = useRef(null)
  	const reelRefsArray = useRef([])

  	const reels = useSelector(selectAllReels)

  	const reelsStatus = useSelector(getReelsStatus)
  	const dispatch = useDispatch();
  	const {userId,token} = useAuth();

  	const fetchReels = () => {
  		dispatch(getReels({userId,count:10,token}))
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

  	//let previousVideo = reelRefsArray.current[0]
	const previousVideoRef = useRef(null); 
  	const playCurrentVideo = () => {
  		
	    const container = containerRef.current
	    const scrollPosition = container.scrollTop
	    const videoHeight = container.offsetHeight

	    const currentIndex = Math.floor(scrollPosition / videoHeight)
	    const currentVideo = reelRefsArray.current[currentIndex]
	    
	    
		    if (currentVideo && currentVideo.currentTime === 0) {
		    	if(previousVideoRef.current){
			    	previousVideoRef.current.pause()
					previousVideoRef.current.currentTime = 0
		    	}
		    	currentVideo.play()
		    	.then(success => {})
				.catch(error => {})

		    	previousVideoRef.current = currentVideo
		    }

	}

	const handleScroll = useCallback((event) => {
		playCurrentVideo();
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 800) { // Added buffer for preloading
      if (reelsStatus !== 'loading' ) {
        
        fetchReels()
          
      }
    }
  }, [dispatch, token, userId, reelsStatus, playCurrentVideo]);

	useEffect(()=>{
		fetchReels()
  	},[]);

	useEffect(() => {
    if (reels.length > 0) {
      playCurrentVideo();
    }
  }, [reels, playCurrentVideo]);

	return (

		<>
			{isMobileOrTablet ?

				<>

					<div ref={containerRef} onScroll={handleScroll} className=" duration-700 reel-posts mx-auto h-screen snap-y snap-mandatory overflow-y-auto tablet-sm:w-[24rem]" >

						{reels?.length > 0 && reels.map((reel,index)=>{

							return <ReelPostItems reelId={index+''} key={index} reel={reel} reelRef={video => (reelRefsArray.current[index] = video)}/>

						})}

						{reelsStatus === 'loading' && <Loading size={"50px"}/>}
							
					</div>

				</>

				:

				<>
					<div ref={containerRef} onScroll={handleScroll} className="duration-700 reel-posts laptop-lg:py-10 laptop-lg:px-2 mx-auto laptop-lg:mb-10 h-screen snap-y snap-mandatory overflow-y-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

						{reels?.length > 0 && reels.map((reel,index)=>{

							return <ReelPostItems reelId={index+''} key={index} reel={reel} reelRef={video => (reelRefsArray.current[index] = video)}/>

						})}

						{reelsStatus === 'loading' && <Loading size={"50px"}/>}
							
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

export default ReelPosts;
