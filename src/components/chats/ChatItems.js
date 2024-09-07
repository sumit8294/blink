import { format } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import { 
	getChatMessages, 
	setChatInfo, 
	setChatMessages,
} from '../../reducers/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSocket } from '../../store/SocketContext';
import useAuth from '../../hooks/useAuth';
import { usePeer } from '../../store/PeerContext';

const ChatItems = ({chat,handleActiveChatId,activeChatId}) => {
	
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const dispatch = useDispatch()

	const {userId} = useAuth();

	const {onlineUsers} = useSocket();
	const {caller,isConnected} = usePeer()
	const [isOnline,setIsOnline] = useState(false);
	const [seenedChat,setSeenedChat] = useState(true);
	const messages = useSelector(getChatMessages)

	const handleOnClick = () =>{ 
		
		if(chat.chatId){
			handleActiveChatId(new String(chat.chatId))
			setSeenedChat(true)
		}
		else{
			if(messages) dispatch(setChatMessages(null))
			dispatch(setChatInfo(chat))
		}
	}

	useEffect(()=>{
			if(onlineUsers && onlineUsers.has(chat.participants[0]._id)) setIsOnline(true)
			else if(isOnline === true) setIsOnline(false)
	},[onlineUsers,chat.participants[0]._id])

	useEffect(()=>{
		if(chat?.message && chat?.seen.sender !== userId){
			if(chat?.seen.seen) setSeenedChat(true)
			else if(String(activeChatId) !== chat.chatId) setSeenedChat(false)
		}

		return ()=>{
			setSeenedChat(true)
		}
	},[chat])

	
	return (
		<>
			{isMobileOrTablet

				?
				<>

					<div className={`cursor-pointer relative flex px-4 py-2 ${ activeChatId === chat.chatId ? 'border-y border-blink-black-2' : ''} `} 
						onClick={()=>handleOnClick()} >

						<div className="shrink-0 post-image h-12 my-auto w-12 rounded-full text-center overflow-hidden" >

							{chat.participants[0].profile
									? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={chat.participants[0].profile} alt="profile"/>

									: <img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
							}

						</div>
						
						{isOnline && <span className="absolute left-14 bottom-5 w-2 h-2 rounded-full bg-blink-gradient-1"></span>}

						<div className="">

							<div className="px-3 ">
								
								<span className={seenedChat ? "block tracking-wide font-normal text-white" : "font-bold tracking-wide block text-white"}> 
									
									{chat.participants[0].username}

									{(isConnected && caller.userId === chat.participants[0]._id) && <span className='text-red-400 border-2 rounded-xl text-[8px] mx-2 p-1 border-red-400'>Connected</span>}

								</span>

								{chat.message && <span className="block text-[11px] "> 
									
									<span className={seenedChat ? "block text-blink-gray-1" : "font-bold block text-white"}>

										{ chat.message.contentType === 'reel' || chat.message.contentType === 'post' 

											? (chat.message.sender._id === chat.participants[0]._id)

												? chat.participants[0].username + ' sent you a ' + chat.message.contentType
												: 'you sent a '+ chat.message.contentType

											: chat.message.content

										} .
											
									</span>

									<span className="text-blink-gray-2 text-[11px]"> {format(new Date(chat.message.sendAt), 'dd MMM yyyy hh:mm a')} </span>

								</span>}
						
							</div>
						
						</div>	

						{!seenedChat && <span className="shrink-0 relative top-6 w-2 h-2 rounded-full bg-blink-gradient-5 right-0 "></span>}
						
					</div>
				</>

				:

				<>

					<div className={`cursor-pointer relative flex px-4 py-2 laptop-sm:px-2 ${ activeChatId === chat.chatId ? 'border-y border-blink-black-2' : ''} `} 
						onClick={()=>handleOnClick()} >

						<div className="shrink-0 post-image h-12 my-auto w-12 laptop-sm:h-10 laptop-sm:w-10 rounded-full text-center overflow-hidden" >

							{chat.participants[0].profile
									? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={chat.participants[0].profile} alt="profile"/>

									: <img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
							}

						</div>
						
						{isOnline && <span className="absolute left-14 bottom-5 w-2 h-2 laptop-sm:left-10 rounded-full bg-blink-gradient-1"></span>}

						<div className="w-full">

							<div className="px-3 laptop-sm:px-3">
								
								<span className={seenedChat ? "block tracking-wide font-normal text-white" : "font-bold tracking-wide block text-white"}> 
									
									{chat.participants[0].username}

								</span>

								{chat.message && <span className="block text-[11px] "> 
									
									<span className={seenedChat ? "block text-blink-gray-1" : "font-bold block text-white"}>

										{ chat.message.contentType === 'reel' || chat.message.contentType === 'post' 

											? (chat.message.sender._id === chat.participants[0]._id)

												? chat.participants[0].username + ' sent you a ' + chat.message.contentType
												: 'you sent a '+ chat.message.contentType

											: chat.message.content

										} .

									</span>

									<span className="text-blink-gray-2 text-[11px]">  {format(new Date(chat.message.sendAt), 'dd MMM yyyy hh:mm a')}  </span>

								</span>}
						
							</div>
						
						</div>
						
						{!seenedChat && <span className="shrink-0 relative top-6 w-2 h-2 rounded-full bg-blink-gradient-5 right-0 "></span>}
						
					</div>
				</>

			}

		</>
	)
}

export default ChatItems;