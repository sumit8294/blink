
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import {CommentsContext} from '../store/CommentsContext';
import {useContext} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';



const FeedPostActions = ({user}) =>{

	const {commentsVisibility,setCommentsVisibility} = useContext(CommentsContext);

	const handleVisiblility = () =>{
		setCommentsVisibility(!commentsVisibility);
	}

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (


		<>
			{isMobileOrTablet 
				?
				<>
					<div className="post-details mt-2 px-2 mobile-md:px-3 flex justify-between">

						<div className="post-actions flex text-[0.9rem] mobile-md:text-[1.1rem] mobile-lg:text-[1.225rem] tablet-sm:text-[1.1rem]">

							<div className="likes rounded-xl bg-blink-black-2 cursor-pointer mr-1 px-2 py-0.5 mobile-md:py-0">

								<span className="text-[#eb3349]">
								
									<FontAwesomeIcon icon={faHeart} />

								</span>

								<span className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7]">20k</span>

							</div>


							<div onClick={handleVisiblility} className="comments rounded-xl bg-blink-black-2 cursor-pointer mr-1 px-2 py-0.5 mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="text-[0.7rem] mobile-md:text-[0.8rem]text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7rem]" >23k</span>

							</div>


							<div className="shares rounded-xl bg-blink-black-2 cursor-pointer mr-1 mr-1 px-2 py-0.5 mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7rem]" >100k</span>

							</div>

						</div>

						<div className="post-actions flex text-[0.9rem] mobile-md:text-[1rem] mobile-lg:text-[1.225rem] tablet-sm:text-[0.9rem]">

							<div className="save rounded-xl bg-blink-black-2 cursor-pointer mr-1 mr-1 px-2 py-0.5 mobile-md:py-0 tablet-sm:py-0.5">

								<span>

									<FontAwesomeIcon icon={faBookmark} />

								</span>

								<span className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7rem]">20k</span>

							</div>

						</div>

					</div>
				</>
				:
				<>
					<div className="post-details  py-2 rounded flex  justify-between">

						<div className="post-actions text-[1.2rem] flex">

							<div className="likes bg-blink-black-2 cursor-pointer px-2 mr-1  shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span className="text-[#eb3349]">
								
									<FontAwesomeIcon icon={faHeart} />

								</span>

								<span className="text-[0.850rem] ml-1 ">20k</span>

							</div>


							<div onClick={handleVisiblility} className="comments bg-blink-black-2 cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="text-[0.850rem] ml-1" >23k</span>

							</div>


							<div className="shares bg-blink-black-2 cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="text-[0.850rem] ml-1" >100k</span>

							</div>

						</div>

						<div className="post-actions text-[1rem] flex">

							<div className="save bg-blink-black-2 cursor-pointer px-2 py-1 shadow-md shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span>

									<FontAwesomeIcon icon={faBookmark} />

								</span>

								<span className="text-[0.850rem] ml-1">20k</span>

							</div>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default FeedPostActions;