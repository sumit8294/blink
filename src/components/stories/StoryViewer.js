import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import StoryViewerSlides from './StoryViewerSlides';


import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import {getStoryDomIndex,setStoryDomIndex,selectAllStories} from '../../reducers/storySlice'
import {useSelector,useDispatch} from 'react-redux'




const StoryViewer = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const dispatch = useDispatch();

	const stories = useSelector(selectAllStories)
	

	const userStoryindex = useSelector(getStoryDomIndex); // stories[userStoryindex].story

	const isFirstMount = useRef(true)
	const containerRef = useRef(null)

	const location = useLocation()
	const navigate = useNavigate()

	const swipeUserStory = (scrollTo) =>{
  		const container = containerRef.current
  		const videoWidth = container.offsetWidth
  		
  		if(scrollTo === -1){
  			if (stories && stories.length !== 0 && userStoryindex > 0){
  				
  				dispatch(setStoryDomIndex(userStoryindex-1))
  			}else if(stories && stories.length !== 0 && userStoryindex === 0){
  				navigateToFeed()
  			}
  			
  			container.scrollLeft -= videoWidth;
  		}
  		else if(scrollTo === 1){
  			if (stories && stories.length !== 0 && userStoryindex < stories.length-1){
  				dispatch(setStoryDomIndex(userStoryindex+1))
  			}
  			else{
  				navigateToFeed()
  			}
  			container.scrollLeft += videoWidth;
  		}

  		
  		
  	}

  	const navigateToFeed = () =>{

  		navigate(
  			"/feed",
  			{
  				state: {from: location},
  				replace: true
  			}
  		)
  	}


	const [storyDom, setStoryDom] = useState();
	const createStoryDom = (stories) => {

		if (!stories || stories.length === 0) return null;

		const index = Number(userStoryindex);
		const dom = [];

		if (!isFirstMount.current && index > 0) {
			dom.push(<StoryViewerSlides key={index - 1} story={stories[index - 1]?.story} user={stories[index - 1]?.user} swipeUserStory={swipeUserStory} />);
		}

			dom.push(<StoryViewerSlides key={index} story={stories[index]?.story} user={stories[index]?.user} swipeUserStory={swipeUserStory} />);

		if (index < stories.length - 1 && stories[index + 1]) {
			dom.push(<StoryViewerSlides key={index + 1} story={stories[index + 1]?.story} user={stories[index + 1]?.user} swipeUserStory={swipeUserStory} />);
		}
		
		
		setStoryDom(dom)
		isFirstMount.current = false
	};


  	useEffect(()=>{
		createStoryDom(stories);
  	
	},[stories,userStoryindex])


	useEffect(()=>{
		if(stories.length === 0){
			navigate(
				"/create",
				{ 
					state: { from: location }, 
					replace: true
				})
		}
		
	},[stories])



	return (
		<>
			{isMobileOrTablet ?

				<>	

					
						
						<div ref={containerRef} className="h-screen text-white py-auto duration-700 flex pb-24 snap-x snap-mandatory overflow-x-auto tablet-sm:w-[24rem]" >

							{storyDom}
								
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

								<div ref={containerRef} className="scrollbar-none duration-700 relative flex laptop-lg:px-2 mx-auto laptop-lg:mb-10  snap-x snap-mandatory overflow-x-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

									{storyDom}
										
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