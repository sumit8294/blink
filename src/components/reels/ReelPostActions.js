
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

import {CommentsContext} from '../../store/CommentsContext';
import {useContext} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';



const ReelPostActions = ({reactions}) =>{

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
					<div className=" px-2 mb-14 mobile-md:px-3 flex flex-col justify-between ">

						<div className=" flex flex-col text-[1.6rem] mobile-md:text-[1.8rem] mobile-lg:text-[2rem] tablet-sm:text-[2rem] ">

							<div className="likes rounded-xl text-center cursor-pointer  mobile-md:py-0">

								<span className="drop-shadow-2xl">
								
									<FontAwesomeIcon icon={faHeart} />

								</span>

								<span className="block text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] tablet-sm:text-[1.1rem]">{reactions.likes}</span>

							</div>


							<div onClick={handleVisiblility} className="comments rounded-xl text-center cursor-pointer mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="block text-[0.7rem] mobile-md:text-[0.8rem]text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem]  tablet-sm:text-[1.1rem]" >{reactions.comments}</span>

							</div>


							<div className="shares rounded-xl text-center cursor-pointer  mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="block text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem]  tablet-sm:text-[1.1rem]" >{reactions.shares}</span>

							</div>

						</div>

						<div className="post-actions flex  mt-2 text-[1.4rem] mobile-md:text-[1.6rem] mobile-lg:text-[1.8rem] tablet-sm:text-[1.7rem]">

							<div className="save rounded-xl text-center cursor-pointer  mobile-md:py-0 tablet-sm:py-0.5">

								<span>

									<FontAwesomeIcon icon={faBookmark} />

								</span>

								<span className="block text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem]  tablet-sm:text-[1.1rem]">{reactions.bookmarks}</span>

							</div>

						</div>

					</div>
				</>
				:
				<>
					<div className=" px-2 mb-14 mobile-md:px-3 flex flex-col justify-between ">

						<div className=" flex flex-col text-[1.8rem] laptop-lg:text-[1.4rem]">

							<div className="likes rounded-xl text-center cursor-pointer ">

								<span className="drop-shadow-2xl">
								
									<FontAwesomeIcon icon={faHeart} />

								</span>

								<span className="block text-[1rem] laptop-lg:text-[0.8rem]">{reactions.likes}</span>

							</div>


							<div onClick={handleVisiblility} className="comments  text-center cursor-pointer ">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="block text-[1rem] laptop-lg:text-[0.8rem]" >{reactions.comments}</span>

							</div>


							<div className="shares  text-center cursor-pointer">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="block text-[1rem] laptop-lg:text-[0.8rem]" >{reactions.shares}</span>

							</div>

						</div>

						<div className="post-actions flex text-center mt-2 text-[1.4rem] laptop-lg:text-[1.2rem]">

							<div className="save  cursor-pointer">

								<span>

									<FontAwesomeIcon icon={faBookmark} />

								</span>

								<span className="block text-[1rem] laptop-lg:text-[0.8rem]">{reactions.bookmarks}</span>

							</div>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default ReelPostActions;