
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faHeart as redHeart } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as bookMarked } from '@fortawesome/free-solid-svg-icons'

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {DialogContext} from '../../store/DialogContext';
import {useContext} from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { getComments,resetComments } from '../../reducers/commentSlice'
import { getChatsByUserId } from '../../reducers/chatSlice'
import {
	addReelLike,
	removeReelLike,
	addReelBookmark,
	removeReelBookmark,
} from '../../reducers/reels/reactionAsyncThunks'


const ReelPostActions = ({reel}) =>{
	const { setCommentsVisibility, setSharesVisibility } = useContext(DialogContext);


	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const auth = useAuth() //passing to addLike
	const {userId,token} = useAuth();

	const dispatch = useDispatch();


	const handleLike = async (currentState,reelId) =>{

		try{
			if(currentState){
				await dispatch(removeReelLike({userId,reelId,token}))

			}else{
				await dispatch(addReelLike({userId,reelId,auth,token})) // "auth" for add mutualLike of loggedInUser
			}
		}
		catch(error){
			console.log(error.message)
		}

	}


	const handleBookmark = async (currentState,reelId) =>{

		try{
			if(currentState){
				await dispatch(removeReelBookmark({userId,reelId,token}))

			}else{
				await dispatch(addReelBookmark({userId,reelId,token,auth})) // auth for increaseLikeCount()
			}
		}
		catch(error){
			console.log(error.message)
		}

	}

	const handleVisiblility = (type) =>{
		if(type === 'comments'){
			
			setCommentsVisibility( true );
			dispatch(resetComments());
			dispatch(getComments({contentId:reel._id,contentType:'reel',token}));
		}
		else if(type === 'share'){
			
			setSharesVisibility( true )
			dispatch(getChatsByUserId({shareableContent:reel,shareableType:'reel',userId,token}));
		}
		
	}

	return (


		<>
			{isMobileOrTablet 
				?
				<>
					<div className=" px-2 mb-14 mobile-md:px-3 flex flex-col justify-between ">

						<div className=" flex flex-col text-[1.6rem] mobile-md:text-[1.8rem] mobile-lg:text-[2rem] tablet-sm:text-[2rem] ">

							<div onClick={()=>handleLike(reel.likeState,reel._id)} className="likes rounded-xl text-center cursor-pointer  mobile-md:py-0">

								<span className={reel.likeState ? "text-[#eb3349] drop-shadow-2xl" : "drop-shadow-2xl"}>
								
									<FontAwesomeIcon icon={reel.likeState ? redHeart : faHeart} />

								</span>

								<span className="block text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] tablet-sm:text-[1.1rem]">{reel.reactions.likes}</span>

							</div>


							<div onClick={()=>handleVisiblility('comments')} className="comments rounded-xl text-center cursor-pointer mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="block text-[0.7rem] mobile-md:text-[0.8rem]text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem]  tablet-sm:text-[1.1rem]" >{reel.reactions.comments}</span>

							</div>


							<div onClick={()=>handleVisiblility('share')} className="shares rounded-xl text-center cursor-pointer  mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="block text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem]  tablet-sm:text-[1.1rem]" >{reel.reactions.shares}</span>

							</div>

						</div>

						<div className="post-actions flex  mt-2 text-[1.4rem] mobile-md:text-[1.6rem] mobile-lg:text-[1.8rem] tablet-sm:text-[1.7rem]">

							<div onClick={()=>handleBookmark(reel.bookmarkState,reel._id)} className="save rounded-xl text-center cursor-pointer  mobile-md:py-0 tablet-sm:py-0.5">

								<span>

									<FontAwesomeIcon icon={reel.bookmarkState ? bookMarked : faBookmark} />

								</span>

								<span className="block text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem]  tablet-sm:text-[1.1rem]">{reel.reactions.bookmarks}</span>

							</div>

						</div>

					</div>
				</>
				:
				<>
					<div className=" px-2 mb-14 mobile-md:px-3 flex flex-col justify-between ">

						<div className=" flex flex-col text-[1.8rem] laptop-lg:text-[1.4rem]">

							<div onClick={()=>handleLike(reel.likeState,reel._id)} className="likes rounded-xl text-center cursor-pointer ">

								<span className={reel.likeState ? "text-[#eb3349] drop-shadow-2xl" : "drop-shadow-2xl"}>
								
									<FontAwesomeIcon icon={reel.likeState ? redHeart : faHeart} />

								</span>

								<span className="block text-[1rem] laptop-lg:text-[0.8rem]">{reel.reactions.likes}</span>

							</div>


							<div onClick={()=>handleVisiblility('comments')} className="comments  text-center cursor-pointer ">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="block text-[1rem] laptop-lg:text-[0.8rem]" >{reel.reactions.comments}</span>

							</div>


							<div onClick={()=>handleVisiblility('share')} className="shares  text-center cursor-pointer">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="block text-[1rem] laptop-lg:text-[0.8rem]" >{reel.reactions.shares}</span>

							</div>

						</div>

						<div className="post-actions flex text-center mt-2 text-[1.4rem] laptop-lg:text-[1.2rem]">

							<div onClick={()=>handleBookmark(reel.bookmarkState,reel._id)} className="save cursor-pointer">

								<span>

									<FontAwesomeIcon icon={reel.bookmarkState ? bookMarked : faBookmark} />

								</span>

								<span className="block text-[1rem] laptop-lg:text-[0.8rem]">{reel.reactions.bookmarks}</span>

							</div>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default ReelPostActions;