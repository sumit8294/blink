import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInput from './ChatBoxInput';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {
	getChatMessages,
	fetchChatMessages,
	getChatInfo,
	setUnseenChatCount
} from '../../reducers/chatSlice';


import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { useSocket } from '../../store/SocketContext';

const ChatBox = ({handleActiveChatId,activeChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const dispatch = useDispatch();
	const {socket,emitLastMessageSeened} = useSocket();


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
		
		if (activeChatId) dispatch(fetchChatMessages({ token, chatId: activeChatId, userId }));
		
	}, [activeChatId]);

	return (
		<>
			{isMobileOrTablet

				?
				<>
				
					<div className=" w-full py-1 bg-blink-black-1">

						<ChatBoxHeader participant={chat && chat.participants[0]} handleActiveChatId={handleActiveChatId}/>

						<ChatBoxBody messages={messages} participant={chat && chat.participants[0]} seen={seen}/>

						<ChatBoxInput activeChatId={activeChatId} participant={chat && chat.participants[0]}/>

					</div>		
					
				</>

				:

				<>
					<div className=" w-8/12 ">

						<div className="w-full py-1 border-l border-blink-black-2 bg-blink-black-1 rounded-r-2xl">

							<ChatBoxHeader participant={chat && chat.participants[0]} />

							<ChatBoxBody messages={messages} participant={chat && chat.participants[0]} seen={seen}/>

							<ChatBoxInput activeChatId={activeChatId} participant={chat && chat.participants[0]} />

						</div>
						
					</div>
				</>

			}
		</>
	)
}

export default ChatBox;