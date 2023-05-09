import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import { useState, useRef, useEffect } from 'react';

import ReelPosts from './ReelPosts';
import ReelPostsComments from './ReelPostsComments';

import {CommentsContext} from '../store/CommentsContext';




const Reels = () =>{

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

			<div className="w-full pl-[19.7rem] pr-5 text-white ">

				<div className="w-full mx-3 my-2 h-[97vh] overflow-hidden rounded-2xl  py-4 text-white bg-blink-black-2 drop-shadow-2xl">

					<div className="right-container flex justify-center bg-blink-black-2 h-[97vh] overflow-y-auto  ">

						<div className="flex flex-col justify-center">

							<button className="text-3xl w-14 h-14  font-bold text-blink-blue-1 rounded-full " onClick={preReel}>

								<FontAwesomeIcon icon={faCircleUp} />

							</button>

						</div>

						<CommentsContext.Provider value={{commentsVisibility, setCommentsVisibility, }}>

							<ReelPosts pre={pre} setReelsLength={setReelsLength} scrollableDivRef={scrollableDivRef} />

						</CommentsContext.Provider >

						{commentsVisibility && <ReelPostsComments />}

						<div className="flex flex-col justify-center">

							<button className="text-3xl w-14 h-14 font-bold text-blink-blue-1 rounded-full " onClick={NextReel}>

								<FontAwesomeIcon icon={faCircleDown} />

							</button>

						</div>

					</div>

				</div>

			</div>
		</>
	)
}

export default Reels;