import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInput from './ChatBoxInput';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {
	getChatMessages,
	fetchChatMessages,
	getChatInfo,
	setUnseenChatCount,
} from '../../reducers/chatSlice';


import {useState,useEffect, useRef} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth';
import {  useSocket } from '../../store/SocketContext';

import VideoCall from './VideoCall';
import { usePeer } from '../../store/PeerContext';



const ChatBox = ({handleActiveChatId,activeChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const dispatch = useDispatch();
	const {socket,emitLastMessageSeened} = useSocket();
	const {callAccepted,makingCallOffer,caller, isMovable, isMaximize } = usePeer();


	const messages = useSelector(getChatMessages);
	
	const chat = useSelector(getChatInfo)

	const {userId,token} = useAuth();
	const [seen,setSeen] = useState(false);


	useEffect(()=>{
		if(socket && chat && chat.lastSeen?.seen === false && chat.lastSeen?.sender !== userId){
			emitLastMessageSeened(chat._id,chat.lastSeen.sender)
			dispatch(setUnseenChatCount())
		}

		if(socket){
			socket.on('notifyMessageSeened',(data)=>{
				setSeen(true)
				
			})

			return () => socket.off('notifyMessageSeened')
		}

	},[chat,socket])
	

	useEffect(()=>{

		if(chat?.lastSeen?.seen === true && chat.lastSeen?.sender === userId) setSeen(true);

		else setSeen(false);
		
	},[chat,userId])


	useEffect(() => {
		
		if (activeChatId) dispatch(fetchChatMessages({ token, chatId: String(activeChatId), userId }));
		
	}, [activeChatId]);



	return (
		<>
			{isMobileOrTablet

				?
				<>
				
					<div className=" w-full py-1 bg-blink-black-1">

						<ChatBoxHeader participant={chat ? chat.participants[0] : caller}  handleActiveChatId={handleActiveChatId}/>

						{(isMovable) ?

						<ChatBoxBody 
							messages={messages} 
							participant={chat && chat.participants[0]} seen={seen}
						/> 

						: <div className=" w-full h-[100vh] overflow-y-auto px-1 text-[0.9rem] py-14 mobile-md:px-2 mobile-md:text-[1rem] mobile-lg:text-[1.2rem] tablet-sm:py-24 tablet-sm:px-4 tablet-sm:text-[1.4rem]">

							{((makingCallOffer || callAccepted) && !isMovable) &&
								<VideoCall 
									participant={chat && chat.participants[0]}
							/>}

						</div>
						}
							<ChatBoxInput activeChatId={activeChatId} participant={chat && chat.participants[0]}/>

					</div>		
					
				</>

				:

				<>
					<div className=" w-8/12 relative ">

						<div className="w-full py-1 border-l border-blink-black-2 bg-blink-black-1 rounded-r-2xl">

							<ChatBoxHeader 
								participant={chat ? chat.participants[0] : caller} 
							/>

							<div className="relative z-10 chatbox w-full h-[500px] text-[1rem]">
								{(isMovable) &&

								<ChatBoxBody 
									messages={messages} 
									participant={chat && chat.participants[0]} seen={seen}
								/> }
							
							
								
									{((makingCallOffer || callAccepted) && !isMovable) &&
									<VideoCall 
										participant={chat && chat.participants[0]}
									/>}
								

							</div>

							<ChatBoxInput 
								activeChatId={activeChatId} 
								participant={chat && chat.participants[0]} 
							/>

						</div>
						
					</div>
				</>

			}
		</>
	)
}




export default ChatBox;