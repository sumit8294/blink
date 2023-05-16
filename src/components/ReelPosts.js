import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import ReelPostItems from './ReelPostItems';
import { useRef, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const reels = [
	{name:"Niall",videoUrl:"./assets/videos/video1.mp4",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"KaranAujla",videoUrl:"./assets/videos/video2.mp4",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"harry",videoUrl:"./assets/videos/video5.mp4",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",videoUrl:"./assets/videos/video6.mp4",imageUrl:"./assets/images/users/louis.jpg"},
]

const ReelPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const containerRef = useRef(null)
  	const reelRefsArray = useRef([])

  	useEffect(()=>{
  		handleScroll();
  	},[])

  	const scrollReelWithButton = (scrollTo) =>{
  		const container = containerRef.current
  		const videoHeight = container.offsetHeight
  		if(scrollTo === 'up'){
  			container.scrollTop -= videoHeight;
  		}
  		else if(scrollTo === 'down'){
  			container.scrollTop += videoHeight;
  		}
  	}

  	let previousVideo = reelRefsArray.current[0]
  	const handleScroll = () => {
  		
  		
	    const container = containerRef.current
	    const scrollPosition = container.scrollTop
	    const videoHeight = container.offsetHeight

	    const currentIndex = Math.floor(scrollPosition / videoHeight)
	    const currentVideo = reelRefsArray.current[currentIndex]
	    
	    
		    if (currentVideo && currentVideo.currentTime === 0) {
		    	if(previousVideo){
			    	previousVideo.pause();
					previousVideo.currentTime = 0;
		    	}
		    	currentVideo.play()
		    	.then(success => {})
				.catch(error => {})

		    	previousVideo = currentVideo;
		    }

	}

	return (

		<>
			{isMobileOrTablet ?

				<>

					<div ref={containerRef} onScroll={handleScroll} className=" duration-700 reel-posts mx-auto h-screen snap-y snap-mandatory overflow-y-auto tablet-sm:w-[24rem]" >

						{reels.map((reel,index)=>{

							return <ReelPostItems reelId={index+''} key={index} reel={reel} reelRef={video => (reelRefsArray.current[index] = video)}/>

						})}
							
					</div>

				</>

				:

				<>
					<div ref={containerRef} onScroll={handleScroll} className="duration-700 reel-posts laptop-lg:py-10 laptop-lg:px-2 mx-auto laptop-lg:mb-10 h-screen snap-y snap-mandatory overflow-y-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

						{reels.map((reel,index)=>{

							return <ReelPostItems reelId={index+''} key={index} reel={reel} reelRef={video => (reelRefsArray.current[index] = video)}/>

						})}
							
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