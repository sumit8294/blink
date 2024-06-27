import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInput from './ChatBoxInput';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {
	getChatMessages,
	fetchChatMessages,
	getChatInfo,
} from '../../reducers/chatSlice';


import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth';

const ChatBox = ({handleActiveChatId,activeChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const messages = useSelector(getChatMessages);
	const chat = useSelector(getChatInfo)

	const {userId,token} = useAuth();

	const dispatch = useDispatch();

	useEffect(() => {
		if (activeChatId) {
		  dispatch(fetchChatMessages({ token, chatId: activeChatId, userId }));
		}
	}, [activeChatId]);

	return (
		<>
			{isMobileOrTablet

				?
				<>
				
					<div className=" w-full py-1 bg-blink-black-1">

						<ChatBoxHeader participant={chat && chat.participants[0]} handleActiveChatId={handleActiveChatId}/>

						<ChatBoxBody messages={messages} participant={chat && chat.participants[0]} />

						<ChatBoxInput activeChatId={activeChatId} participant={chat && chat.participants[0]}/>

					</div>		
					
				</>

				:

				<>
					<div className=" w-8/12 ">

						<div className="w-full py-1 border-l border-blink-black-2 bg-blink-black-1 rounded-r-2xl">

							<ChatBoxHeader participant={chat && chat.participants[0]} />

							<ChatBoxBody messages={messages} participant={chat && chat.participants[0]}/>

							<ChatBoxInput activeChatId={activeChatId} participant={chat && chat.participants[0]} />

						</div>
						
					</div>
				</>

			}
		</>
	)
}

export default ChatBox;