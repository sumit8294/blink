
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as redHeart } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as bookMarked } from '@fortawesome/free-solid-svg-icons'

import {DialogContext} from '../../store/DialogContext'
import {useContext} from 'react'

import { useMediaQuery } from 'react-responsive'
import { mobileMediaQuery } from '../../ReactResponsiveQueries'
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { getComments,resetComments } from '../../reducers/commentSlice'
import { getChatsByUserId } from '../../reducers/chatSlice'
import {
	addPostLike,
	removePostLike,
	addPostBookmark,
	removePostBookmark,
} from '../../reducers/posts/reactionAsyncThunks'


const FeedPostActions = ({post}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const { setCommentsVisibility, setSharesVisibility } = useContext(DialogContext);
	


	const auth = useAuth() //passing to addLike
	const {userId,token} = useAuth();

	const dispatch = useDispatch();


	const handleLike = async (currentState,postId) =>{

		try{
			if(currentState){
				await dispatch(removePostLike({userId,postId,token}))

			}else{
				await dispatch(addPostLike({userId,postId,auth,token})) // "auth" for add mutualLike of loggedInUser
			}
		}
		catch(error){
			console.log(error.message)
		}

	}


	const handleBookmark = async (currentState,postId) =>{

		try{
			if(currentState){
				await dispatch(removePostBookmark({userId,postId,token}))

			}else{
				await dispatch(addPostBookmark({userId,postId,token,auth})) // auth for increaseLikeCount()
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
			dispatch(getComments({contentId:post._id,contentType:'post',token}));
		}
		else if(type === 'share'){
			setSharesVisibility( true )
			dispatch(getChatsByUserId({shareableContent:post,shareableType:'post',userId,token}));
		}
		
	}

	

	return (


		<>
			{isMobileOrTablet 
				?
				<>
					<div className="post-details mt-2 px-2 mobile-md:px-3 flex justify-between">

						<div className="post-actions flex text-[0.9rem] mobile-md:text-[1.1rem] mobile-lg:text-[1.225rem] tablet-sm:text-[1.1rem]">

							<div onClick={()=>handleLike(post.likeState,post._id)} className="likes rounded-xl bg-blink-black-2 cursor-pointer mr-1 px-2 py-0.5 mobile-md:py-0">

								<span className={post.likeState ? "text-[#eb3349]" : ""}>
								
									<FontAwesomeIcon icon={post.likeState ? redHeart : faHeart} />

								</span>

								<span className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7]">{post.reactions.likes}</span>

							</div>


							<div onClick={() => handleVisiblility('comments')} className="comments rounded-xl bg-blink-black-2 cursor-pointer mr-1 px-2 py-0.5 mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="text-[0.7rem] mobile-md:text-[0.8rem]text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7rem]" >{post.reactions.comments}</span>

							</div>


							<div onClick={() => handleVisiblility('share')} className="shares rounded-xl bg-blink-black-2 cursor-pointer mr-1 mr-1 px-2 py-0.5 mobile-md:py-0">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7rem]" >{post.reactions.shares}</span>

							</div>

						</div>

						<div className="post-actions flex text-[0.9rem] mobile-md:text-[1rem] mobile-lg:text-[1.225rem] tablet-sm:text-[0.9rem]">

							<div onClick={()=>handleBookmark(post.bookmarkState,post._id)} className="save rounded-xl bg-blink-black-2 cursor-pointer mr-1 mr-1 px-2 py-0.5 mobile-md:py-0 tablet-sm:py-0.5">

								<span>

									<FontAwesomeIcon icon={post.bookmarkState ? bookMarked : faBookmark} />

								</span>

								<span className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-lg:text-[0.9rem] ml-1 tablet-sm:text-[0.7rem]">{post.reactions.bookmarks}</span>

							</div>

						</div>

					</div>
				</>
				:
				<>
					<div className="post-details  py-2 rounded flex  justify-between">

						<div className="post-actions text-[1.2rem] flex">

							<div onClick={()=>handleLike(post.likeState,post._id)} className="likes bg-blink-black-2 cursor-pointer px-2 mr-1  shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span className={post.likeState ? "text-[#eb3349]" : ""}>
								
									<FontAwesomeIcon icon={post.likeState ? redHeart : faHeart} />

								</span>

								<span className="text-[0.850rem] ml-1 ">{post.reactions.likes}</span>

							</div>


							<div onClick={() => handleVisiblility('comments')} className="comments bg-blink-black-2 cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span>

									<FontAwesomeIcon icon={faComment} />

								</span>

								<span className="text-[0.850rem] ml-1" >{post.reactions.comments}</span>

							</div>


							<div onClick={() => handleVisiblility('share')} className="shares bg-blink-black-2 cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span>

									<FontAwesomeIcon icon={faShare} />

								</span>


								<span className="text-[0.850rem] ml-1" >{post.reactions.shares}</span>

							</div>

						</div>

						<div className="post-actions text-[1rem] flex">

							<div onClick={()=>handleBookmark(post.bookmarkState,post._id)} className="save bg-blink-black-2 cursor-pointer px-2 py-1 shadow-md shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

								<span>

									<FontAwesomeIcon icon={post.bookmarkState ? bookMarked : faBookmark} />

								</span>

								<span className="text-[0.850rem] ml-1">{post.reactions.bookmarks}</span>

							</div>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default FeedPostActions;