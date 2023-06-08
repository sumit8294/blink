import { useState } from 'react';

import ReelPosts from './ReelPosts';
import ReelPostsComments from './ReelPostsComments';

import {CommentsContext} from '../../store/CommentsContext';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';


const Reels = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	const [commentsVisibility, setCommentsVisibility] = useState(false);
	return (
		<>
			{isMobileOrTablet ?

				<>

					<div className="w-full text-white ">

						<div className="w-full h-screen text-white">

							<div className="h-screen overflow-y-auto  ">	

								<CommentsContext.Provider value={{commentsVisibility, setCommentsVisibility }}>

									<ReelPosts />

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

									<ReelPosts />

								</CommentsContext.Provider >

								{commentsVisibility && <ReelPostsComments />}

							</div>

						</div>

					</div>
				</>
			}
		</>
	)
}

export default Reels;