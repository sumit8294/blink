import Chats from './Chats';
import ChatBox from './ChatBox';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

import {getChatMessages,fetchChatMessages} from '../../reducers/chatSlice';


const Messages = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [activeChatId,setActiveChatId] = useState(null);

	const chatMessages = useSelector(getChatMessages);
	const {userId,token} = useAuth();
	const dispatch = useDispatch();

	const handleActiveChatId = (messager) => setActiveChatId(messager);


	const fetchMessages = async (chatId) =>{	

		dispatch(fetchChatMessages({token,chatId,userId}))
	}

	useEffect(()=>{

		if(activeChatId !== null){
			fetchMessages(activeChatId);
		} 
		
	},[activeChatId])

	return (

		<>
			{isMobileOrTablet

				?
				<>

					<div className="messages w-full h-full text-white  ">

						<div className="flex justify-between">

								{!activeChatId && <Chats activeChatId={activeChatId} handleActiveChatId={handleActiveChatId} />}
								
								{activeChatId && <ChatBox chatMessages={chatMessages} handleActiveChatId={handleActiveChatId} activeChatId={activeChatId}/>}

						</div>

					</div>

				</>

				:

				<>

					<div className="messages w-full h-screen text-white">

						<div className="flex bg-blink-black-2 mx-2 my-2 drop-shadow-2xl rounded-2xl laptop-xl:px-6 laptop-xl:py-6 " >

								<Chats activeChatId={activeChatId} handleActiveChatId={handleActiveChatId}/>
								
								<ChatBox chatMessages={chatMessages} activeChatId={activeChatId} />

						</div>

					</div>

				</>
			}

		</>

	)

}

export default Messages;