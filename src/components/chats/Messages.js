import Chats from './Chats';
import ChatBox from './ChatBox';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useEffect, useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth';

import {
	fetchChatMessages,
	getActiveChatId,
	setActiveChatId,
	getChatsByUserId
} from '../../reducers/chatSlice';
import { SocketContext } from '../../store/SocketContext';

const Messages = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const {socket} = useContext(SocketContext);

	const {userId,token} = useAuth();
	
	const activeChatId = useSelector(getActiveChatId);
	
	const dispatch = useDispatch();

	useEffect(()=>{
		if (socket) {	
			socket.on('send_message', (data) => {
			  if (activeChatId) {
				dispatch(fetchChatMessages({ token, chatId: activeChatId, userId }));
				
			  } else {
				console.log('no active chat id')
			  }
			  dispatch(getChatsByUserId({ userId, token }));
			});

			return () => socket.off('send_message')
		}
	},[socket, activeChatId])
	  
	const handleActiveChatId = (messager) => dispatch(setActiveChatId(messager));

	return (

		<>
			{isMobileOrTablet

				?
				<>

					<div className="messages w-full h-full text-white  ">

						<div className="flex justify-between">

								{!activeChatId && <Chats activeChatId={activeChatId} handleActiveChatId={handleActiveChatId} />}
								
								{activeChatId && <ChatBox activeChatId={activeChatId} handleActiveChatId={handleActiveChatId} />}

						</div>

					</div>

				</>

				:

				<>

					<div className="messages w-full h-screen text-white">

						<div className="flex bg-blink-black-2 mx-2 my-2 drop-shadow-2xl rounded-2xl laptop-xl:px-6 laptop-xl:py-6 " >

								<Chats activeChatId={activeChatId} handleActiveChatId={handleActiveChatId}/>
								
								<ChatBox activeChatId={activeChatId} />

						</div>

					</div>

				</>
			}

		</>

	)

}

export default Messages;