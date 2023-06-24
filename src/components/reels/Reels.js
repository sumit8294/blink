import { useState,useContext } from 'react';

import ReelPosts from './ReelPosts';
import Share from '../others/Share';
import Comment from '../others/Comment';


import {DialogContext} from '../../store/DialogContext';


import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';


const Reels = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const {state} = useContext(DialogContext)
	return (
		<>
			{isMobileOrTablet ?

				<>

					<div className="w-full text-white ">

						<div className="w-full h-screen text-white">

							<div className="h-screen overflow-y-auto  ">	

								

								<ReelPosts />


								{state.commentsVisibility && <Comment />}
								{state.sharesVisibility && <Share />}


							</div>

						</div>

					</div>

				</>

				:
			
				<>

					<div className="w-full laptop-lg:pr-5 text-white ">

						<div className="w-full laptop-lg:mx-3 laptop-lg:my-2 h-screen laptop-lg:overflow-hidden laptop-lg:rounded-2xl laptop-lg:py-4 text-white laptop-lg:bg-blink-black-2 laptop-lg:drop-shadow-2xl">

							<div className="laptop-lg:flex laptop-lg:justify-center laptop-lg:bg-blink-black-2 h-screen overflow-y-auto custom-scroll ">


								<ReelPosts />


								{state.commentsVisibility && <Comment />}
								{state.sharesVisibility && <Share />}


							</div>

						</div>

					</div>
				</>
			}
		</>
	)
}

export default Reels;