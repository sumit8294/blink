import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
// import { useState } from 'react'
// import { useSelector,useDispatch } from 'react-redux'
// import { 
// 	selectPostComments,
// 	selectCommentPostId,
// 	selectCommentStatus,
// 	selectCommentError,
// 	addComment,
// 	removeComment
// } from '../../reducers/commentSlice'
// import {selectPostById} from '../../reducers/postSlice'
// import useAuth from '../../hooks/useAuth'
// import Loading from '../elements/Loading'


const ReelComments = () =>{

	// const {userId:LoggedInUser,token} = useAuth()
	// const auth = useAuth();

	// const dispatch = useDispatch()

	// const comments = useSelector(selectPostComments)
	// const postId = useSelector(selectCommentPostId)
	// const userPost = useSelector((state)=>selectPostById(state,postId))
	// const commentStatus = useSelector(selectCommentStatus)
	// const commentError = useSelector(selectCommentError)



	// const postComment = async (e) =>{
	// 	e.preventDefault();
		
	// 	if(newComment !== ""){
	// 		 dispatch(addComment({postId,userId:LoggedInUser,token,content:newComment,auth}))//auth is for increseCount 
	// 	}
		
	// 	if(commentError === null ){
	// 		setNewComment("")
	// 	}
		
	// }


	// const [newComment,setNewComment] = useState("")
	// const [deleteButtonMap,setDeleteButtonMap] = useState({});
	// const setDeleteButtonVisible = (commentId,status) =>{
	// 	setDeleteButtonMap((prev)=>{
	// 		return {
	// 			...prev,
	// 			[commentId]: status
	// 		}
	// 	})
	// }
	// const deleteComment = (commentId) =>{
		
	// 	dispatch(removeComment({postId,commentId,userId:LoggedInUser,token}))
	// }

	return (
		
		<>
			{/*<div className="post-comments mt-1 mb-[400px] rounded justify-between">

				<div className="text-[16px] h-[60vh] overflow-y-auto custom-scroll likes relative px-2 py-2 shadow-lg bg-blink-black-1 rounded-t-2xl">
					
					{userPost &&
					<div className="block mb-1 text-blink-gray-1"> 

						<div className="inline-block w-5 h-5 rounded-full text-center  overflow-hidden" >

							<img src={userPost.user.profile} alt="comments" />

						</div>

						<b className=" tracking-wider font-normal text-white"> {userPost.user.username} </b>

						<span>	{ userPost.caption} </span>

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

									<img src={commentItem.user.profile} alt="comments" />

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
*/}
		</>

	)

}

export default ReelComments;