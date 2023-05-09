import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

import { useState, useRef, useEffect } from 'react';

import ReelPosts from './ReelPosts';
import ReelPostsComments from './ReelPostsComments';

import {CommentsContext} from '../store/CommentsContext';


import Test from './Test'


const Reels = () =>{

	const [scrollPosition, setScrollPosition] = useState(0);
	const [commentsVisibility, setCommentsVisibility] = useState(false);
	
  	const scrollableDivRef = useRef(null);

	useEffect(() => {
		
		if (scrollableDivRef.current) 
			scrollableDivRef.current.scrollTop = scrollPosition;
		
	}, [scrollPosition]);

	return (
		<>
			{/*<div className="home-content w-9/12   h-full text-white  ">*/}

			<div className="w-full pl-[19.7rem] pr-5 text-white ">

				<div className="w-full mx-3 my-2 h-[97vh] overflow-hidden rounded-2xl  py-4 text-white bg-blink-black-2 drop-shadow-2xl">

					<div className="right-container flex justify-center bg-blink-black-2 h-[97vh] overflow-y-auto  ">

						<div className="flex flex-col justify-center">

							<button className="text-3xl w-14 h-14  font-bold text-blink-blue-1 rounded-full "
									onClick={() => setScrollPosition(scrollableDivRef.current.scrollTop-480)}
							>

								<FontAwesomeIcon icon={faCircleUp} />

							</button>
							
						</div>

						{/*<CommentsContext.Provider value={{commentsVisibility, setCommentsVisibility}}>

							<ReelPosts scrollableDivRef={scrollableDivRef} />

						</CommentsContext.Provider >*/}

						<Test />

						{commentsVisibility && <ReelPostsComments />}

						<div className="flex flex-col justify-center">

							<button className="text-3xl w-14 h-14 font-bold text-blink-blue-1 rounded-full "
									onClick={() => setScrollPosition(scrollableDivRef.current.scrollTop+480)}
							>

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