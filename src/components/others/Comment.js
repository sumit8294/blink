import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import {DialogContext} from '../../store/DialogContext';
import { useState,useContext } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { 
	selectAllComments,
	selectCommentContentId,
	selectCommentContentType,
	selectCommentStatus,
	selectCommentError,
	addComment,
	removeComment,
	selectContentAuthor
} from '../../reducers/commentSlice'
import {selectPostById} from '../../reducers/posts/postSlice'
import useAuth from '../../hooks/useAuth'
import Loading from '../elements/Loading'
import {selectReelById} from '../../reducers/reels/reelSlice'
import { createNotification } from '../../reducers/notificationSlice';


const Comment = () => {
	const {setCommentsVisibility} = useContext(DialogContext);
	
	const [newComment,setNewComment] = useState("")
	const [deleteButtonMap,setDeleteButtonMap] = useState({});

	const {userId:LoggedInUser,token,username} = useAuth()
	const auth = useAuth();
	
	const dispatch = useDispatch()
	
	const comments = useSelector(selectAllComments)
	const contentId = useSelector(selectCommentContentId)
	const contentType = useSelector(selectCommentContentType)
	const userPost = useSelector((state)=>selectPostById(state,contentId))
	const userReel = useSelector((state)=>selectReelById(state,contentId))
	
	let userContent = null;
	if(contentType === 'reel'){
		userContent = userReel
	}else if(contentType === 'post'){
		userContent = userPost
	}
	
	const commentStatus = useSelector(selectCommentStatus)
	const commentError = useSelector(selectCommentError)
	const author = useSelector(selectContentAuthor)
	

	const postComment = async (e) =>{
		e.preventDefault();
		
		const body = {
			sender : LoggedInUser,
			receiver : author._id,
			type : 'comment',
			content : {contentId, type: contentType},
			comment: newComment
		}
		
		
		if(newComment !== ""){
			dispatch(addComment({contentId,contentType,userId:LoggedInUser,token,content:newComment,auth}))//auth is for increseCount 
			dispatch(createNotification({body,token}))
		}
		
		if(commentError === null ){
			setNewComment("")
		}
		
	}


	const setDeleteButtonVisible = (commentId,status) =>{
		setDeleteButtonMap((prev)=>{
			return {
				...prev,
				[commentId]: status
			}
		})
	}
	const deleteComment = (commentId) =>{
		
		dispatch(removeComment({contentId,contentType,commentId,userId:LoggedInUser,token}))
	}

	return (

		<>
			<div className="absolute z-30 flex justify-center w-full top-0 py-20">

				<div className=" pb-[600px] w-full tablet-sm:w-[25rem] bg-blink-black-1 rounded-2xl py-4 border border-blink-black-3 py-10 mx-auto mb-10">

					<div className="px-4 relative text-center text-[18px] text-white font-bold border-b-2 mx-2 pb-2 border-blink-black-3">

						Comments

						<button className="absolute right-4 text-blink-blue-1" onClick={()=>setCommentsVisibility(false)}><FontAwesomeIcon icon={faSquareXmark} /> </button>

					</div>

					<div className="post-comments mt-1 mb-[400px] rounded justify-between">

						<div className="text-[16px] h-[60vh] overflow-y-auto custom-scroll likes relative px-2 py-2 shadow-lg bg-blink-black-1 rounded-t-2xl">
							
							{userContent &&
							<div className="block mb-1 text-blink-gray-1"> 

								<div className="inline-block w-5 h-5 rounded-full text-center  overflow-hidden" >

									<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={userContent.user.profile} alt="comments" />

								</div>

								<b className=" tracking-wider font-normal text-white"> {userContent.user.username} </b>

								<span>	{ userContent.caption} </span>

								<span className="block">

									<button className="opacity-50"> more </button>			
							
								</span>

							</div>

							}
							<ul>
							{comments?.length > 0 && comments.map((commentItem,index)=>{

								return(
									<li key={index} className="relative w-full block mb-0.5 text-blink-gray-1"> 

										<div className="inline-block w-5 h-5 rounded-full text-center  overflow-hidden" >

											<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={commentItem.user.profile} alt="comments" />

										</div>
										
										<span className="font-semibold text-[18px] text-white"> {commentItem.user.username} </span>

										<span className=" font-normal" >	{commentItem.content} </span>

										{commentItem.user._id === LoggedInUser && 
											<button className="right-0 px-2 absolute" 
												onClick={()=>setDeleteButtonVisible(commentItem._id,!deleteButtonMap[commentItem._id])}
											>
												<FontAwesomeIcon icon={faEllipsisVertical} />

											</button>
										}

										{deleteButtonMap[commentItem._id] &&
											<button className="absolute right-4 top-4 duration-500 bg-blink-black-2 px-2 rounded"
												onClick={()=>deleteComment(commentItem._id)}
											>
												Delete
											</button>
										}
									</li>
								)
							
							})}
							</ul>

							{commentStatus === 'loading' && <Loading size={"40px"}/>}
					
						</div>
					

						<div className="text-[18px] ml-1 rounded justify-between fixed bottom-4 px-1 py-0.5 bg-blink-black-1">
							
							<form onSubmit={postComment} >
								<div className="w-[24rem] text-[#dbdbdb] flex overflow-x-auto bg-blink-black-1">

									<input className="px-1 py-1 w-full bg-blink-black-1 focus:outline-none " 
										type="text" 
										placeholder="Add a comment..."
										value={newComment}
										onChange={(e)=>setNewComment(e.target.value)}
									/>
									
									<button className="px-3 w-2/12"
										disabled={newComment === ""}
										type="submit"
									>
										
										{(newComment === "")
											
											?<FontAwesomeIcon className="text-blink-gray-1" icon={faPaperPlane} />
											:<FontAwesomeIcon className="text-blink-blue-1" icon={faPaperPlane} />
										}
									
									</button>	

								</div>
							</form>
						
						</div>
							
						

					</div>

				</div>	

			</div>

		</>

	)

}

export default Comment;