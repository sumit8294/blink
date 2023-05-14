import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import { useState, useRef, useEffect } from 'react';

import ReelPosts from './ReelPosts';
import ReelPostsComments from './ReelPostsComments';

import {CommentsContext} from '../store/CommentsContext';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';


const Reels = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	const [scrollPosition, setScrollPosition] = useState(0);
	const [commentsVisibility, setCommentsVisibility] = useState(false);
	const [reelsLength,setReelsLength] = useState(0);
	
  	const scrollableDivRef = useRef(null);

  	const [pre,setPre] = useState("0");

	useEffect(() => {

		let container = scrollableDivRef.current
		
		if (container) 
			container.scrollTop = scrollPosition;

	}, [scrollPosition]);


	const NextReel = () => {

		const nextReelExists = document.getElementById(pre);

		if(nextReelExists) { 

			if(pre < reelsLength-1) {

			nextReelExists.pause();

			setScrollPosition(scrollableDivRef.current.scrollTop+480);

			setPre(parseInt(pre)+1+'');

			}
			else{
				setPre(reelsLength-1+'');
			}

		}

	}

	const preReel = () => {
		
		const preReelExists = document.getElementById(pre);

		if(preReelExists) {

			if(pre > 0){
				preReelExists.pause();

				setScrollPosition(scrollableDivRef.current.scrollTop-480);

				setPre(parseInt(pre)-1+'');

			}
			else{

				setPre(0+'');

			}
		}
		
	}

	return (
		<>
			{isMobileOrTablet ?

				<>

					<div className="w-full text-white ">

						<div className="w-full h-screen text-white">

							<div className="h-screen overflow-y-auto  ">	

								<CommentsContext.Provider value={{commentsVisibility, setCommentsVisibility }}>

									<ReelPosts pre={pre} setReelsLength={setReelsLength} scrollableDivRef={scrollableDivRef} />

								</CommentsContext.Provider >

								{commentsVisibility && <ReelPostsComments />}

							</div>

						</div>

					</div>

				</>

				:
			
				<>

					<div className="w-full laptop-lg:pr-5 text-white ">

						<div className="w-full laptop-lg:mx-3 laptop-lg:my-2 h-screen laptop-lg:overflow-hidden laptop-lg:rounded-2xl laptop-lg:py-4 text-white laptop-lg:bg-blink-black-2 laptop-lg:drop-shadow-2xl">

							<div className="laptop-lg:flex laptop-lg:justify-center laptop-lg:bg-blink-black-2 h-screen overflow-y-auto custom-scroll ">

								<CommentsContext.Provider value={{commentsVisibility, setCommentsVisibility, }}>

									<ReelPosts pre={pre} setReelsLength={setReelsLength} scrollableDivRef={scrollableDivRef} />

								</CommentsContext.Provider >

								{commentsVisibility && <ReelPostsComments />}

								<div className="hidden laptop-lg:flex flex pb-28 flex-col justify-between">

									<button className="text-3xl w-14 h-14  font-bold text-blink-blue-1 rounded-full " onClick={preReel}>

										<FontAwesomeIcon icon={faCircleUp} />

									</button>

									<button className="text-3xl w-14 h-14 font-bold text-blink-blue-1 rounded-full " onClick={NextReel}>

										<FontAwesomeIcon icon={faCircleDown} />

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

export default Reels;