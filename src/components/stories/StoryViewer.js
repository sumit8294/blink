import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import StoryViewerSlides from './StoryViewerSlides';


import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import {getStoryDomIndex,setStoryDomIndex,selectAllStories,getFollowingStories} from '../../reducers/storySlice'
import {useSelector,useDispatch} from 'react-redux'
import useAuth from '../../hooks/useAuth'




const StoryViewer = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const dispatch = useDispatch();

	const stories = useSelector(selectAllStories)

	const {userId,token} = useAuth(); 

	const userStoryindex = useSelector(getStoryDomIndex); // stories[userStoryindex].story

	const fetchStories = async () =>{
		dispatch(getFollowingStories({userId,token}))
	}


	const [storyDom, setStoryDom] = useState();
	const createStoryDom = (stories) => {

		if (!stories || stories.length === 0) return null;

		const index = Number(userStoryindex);
		const dom = [];

		if (index > 0) {
			dom.push(<StoryViewerSlides key={index - 1} story={stories[index - 1].story} user={stories[index - 1].user} />);
		}

			dom.push(<StoryViewerSlides key={index} story={stories[index].story} user={stories[index].user} />);

		if (index < stories.length - 1 && stories[index + 1]) {
			dom.push(<StoryViewerSlides key={index + 1} story={stories[index + 1].story} user={stories[index + 1].user} />);
		}

		setStoryDom(dom);
	};


	


	const containerRef = useRef(null)

	const handleScroll = () =>{
		setStoryDomIndex(userStoryindex+1)
		setStoryDomIndex(userStoryindex-1)
	}

  	const swipeUserStory = (scrollTo) =>{
  		const container = containerRef.current
  		const videoWidth = container.offsetWidth
  		if(scrollTo === -1){
  			container.scrollLeft -= videoWidth;
  		}
  		else if(scrollTo === 1){
  			container.scrollLeft += videoWidth;
  		}
  		
  	}

  	useEffect(()=>{
		fetchStories();
	},[])

  	useEffect(()=>{
		createStoryDom(stories);
	},[stories])

	useLayoutEffect(() => {
		if (Number(userStoryindex) > 0) {
		// Pre-swipe to the next story
			swipeUserStory(1);
		}
	}, [storyDom]);


	return (
		<>
			{isMobileOrTablet ?

				<>	

					
						
						<div className="h-screen text-white py-auto duration-700 flex pb-24 snap-x snap-mandatory overflow-x-auto tablet-sm:w-[24rem]" >

							{stories.story && stories.story.map((storyItem,index)=>{
								//for api --> '/stories/user/:userId'

								return	(<StoryViewerSlides key={index} story={storyItem} user={stories.user}/>)
				
							})}
								
						</div>

				

				</>

				:
			
				<>

					<div className="w-full laptop-lg:pr-5 text-white ">

						<div className="w-full laptop-lg:mx-3 laptop-lg:my-2 h-screen laptop-lg:overflow-hidden laptop-lg:rounded-2xl laptop-lg:py-4 text-white laptop-lg:bg-blink-black-2 laptop-lg:drop-shadow-2xl">

							<div className="laptop-lg:flex laptop-lg:justify-center laptop-lg:bg-blink-black-2 h-screen overflow-y-auto custom-scroll ">
							
									<div className="hidden laptop-lg:flex flex pb-28 flex-col justify-center">

										<button className="text-3xl w-14 h-14  font-bold text-blink-gray-2 rounded-full " >

											<FontAwesomeIcon icon={faCircleLeft} onClick={()=>swipeUserStory(-1)}/>

										</button>

									</div>

									<div ref={containerRef} onScroll={handleScroll} className="scrollbar-none  duration-700 relative flex laptop-lg:px-2 mx-auto laptop-lg:mb-10  snap-x snap-mandatory overflow-x-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

										{storyDom}
										{/*{stories && stories[userStoryindex] && 
											<>
											<StoryViewerSlides story={stories[userStoryindex].story} user={stories[userStoryindex].user}/>
											</>
										}*/}



										{/*{stories && stories.map((item,index)=>{ //for api --> '/stories/following/:userId'

											const user = item.user;
											
											return (<StoryViewerSlides key={index}  story={item.story} user={user}/>)
											

										})}*/}

										{/*{stories.story && stories.story.map((storyItem,index)=>{
											//for api --> '/stories/user/:userId'

											return	(<StoryViewerSlides key={index} story={storyItem} user={stories.user}/>)
				
										})}*/}
											
									</div>

									<div className="hidden laptop-lg:flex flex pb-28 flex-col justify-center">

										<button className="text-3xl w-14 h-14 font-bold text-blink-gray-2 rounded-full " >

											<FontAwesomeIcon icon={faCircleRight} onClick={()=>swipeUserStory(1)}/>

										</button>

									</div>

							</div>

						</div>

					</div>
				</>
			}
		</>
	)
}

export default StoryViewer;