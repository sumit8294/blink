import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

import { useState, useContext } from 'react'
import { DialogContext } from '../../store/DialogContext'

import useAuth from '../../hooks/useAuth'
import { 
	getChatsUsers,
	getChatsStatus,
	getShareableContent,
	getShareableType,
	shareContent 
} from '../../reducers/chatSlice'
import Loading from '../elements/Loading'
import { useSelector, useDispatch } from 'react-redux'

const Share = () =>{

	const {setSharesVisibility} = useContext(DialogContext)

	const {userId,token} = useAuth()
	const auth = useAuth()
	const shareableUsers = useSelector(getChatsUsers)	
	const chatsStatus = useSelector(getChatsStatus)
	const shareableContent = useSelector(getShareableContent)
	const shareableType = useSelector(getShareableType)

	const dispatch = useDispatch();
	const [sendStatus,setSendStatus] = useState({});
	const [sendTimeout, setSendTimeout] = useState({});

	const sendPost = (receiverId) =>{

		let body = {
			sender: userId,
			receiver: receiverId,
			contentType:shareableType,
		};

		if(shareableType === 'post'){

			body = {
				...body,
				content: {imageUrl:shareableContent.imageUrl,_id:shareableContent._id}
			}

		}else if(shareableType === 'reel'){

			body = {
				...body,
				content: {videoUrl:shareableContent.videoUrl,_id:shareableContent._id}
			}

		}
		
		
		
		setSendStatus( prev => ({ ...prev,[receiverId]: 'pending'}) )

		const timeout  = setTimeout(()=>{
			
			dispatch(shareContent({body,token,contentId:shareableContent._id,auth})) //postId and auth for increase share count
			setSendStatus( prev => ({ ...prev,[receiverId]: 'succeeded'}) )

		},2000)

		setSendTimeout( prev => ({ ...prev,[receiverId]: timeout}) );
		
	}

	const handleUndoClick = (receiverId) => {

  		if (sendTimeout[[receiverId]]) {
		    clearTimeout(sendTimeout[receiverId]);
				
		    setSendTimeout((prev) => ({ ...prev, [receiverId]: undefined }));
		}
  		setSendStatus((prev) => ({ ...prev, [receiverId]: undefined }));
  	}

	return (
		<>
			
			<div className="absolute flex justify-center w-full top-0 z-30 py-20">

				<div className=" pb-[600px] w-full tablet-sm:w-[25rem] bg-blink-black-1 rounded-2xl py-4 border border-blink-black-3 py-10 mx-auto mb-10">

					<div className="px-4 relative text-center text-[18px] text-white font-bold border-b-2 mx-2 pb-2 border-blink-black-3">

						Share

						<button className="absolute right-4 text-blink-blue-1" onClick={()=>setSharesVisibility(false)}>
							<FontAwesomeIcon icon={faSquareXmark} /> 
						</button>

					</div>

					<ul className="mt-2">
						{ shareableUsers && shareableUsers.map((users,index)=>{
							const receiver = users.participants[0];
							
							return (

								<li className="flex px-4" key={index} >

									<div className=" my-2 rounded-full w-12 h-12 overflow-hidden">

										<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={receiver.profile} alt="user" />

									</div>

									<div className="flex-grow px-6 py-4 text-[18px] font-semibold">

										{receiver.username}

									</div>

									<div className="flex item-center">

										{!sendStatus[receiver._id] && <button className={'my-auto bg-blink-gradient-1 px-3 py-1 text-sm rounded'}
												onClick={()=>sendPost(receiver._id)}
										>
											Send
										</button>}

										{sendStatus[receiver._id] === 'pending' &&  <button className={`my-auto bg-blink-gradient-1 px-3 py-1 text-sm rounded`}
												onClick={()=>handleUndoClick(receiver._id)}
										>
											Undo
										</button>}

										{sendStatus[receiver._id] === 'succeeded' && <button className={`my-auto bg-blink-black-3 text-blink-gray-1 px-3 py-1 text-sm rounded`}
										>
											Sent
										</button>}

									</div>

								</li>
								
							)
						})
							
						}

					</ul>

					{chatsStatus === 'loading' && <Loading size={"40px"} /> }

				</div>	

			</div>
			
		</>
	)
}

export default Share;