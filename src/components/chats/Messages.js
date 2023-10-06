import Chats from './Chats';
import ChatBox from './ChatBox';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState,useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const Messages = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [activeChat,setActiveChat] = useState(null);

	const [chatMessages,setChatMessages] = useState(null);

	const handleActiveChat = (messager) => setActiveChat(messager);

	const {userId} = useAuth();

	const fetchChatMessages = async (chatId) =>{	

		try{
			const response = await axios.get(`http://localhost:5000/chats/${userId}/${chatId}`);

			if(response.data){
				
				setChatMessages(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log("messages not found");
			}
			else console.log("messages not fetched");
		}
	}

	useEffect(()=>{

		if(activeChat !== null){
			fetchChatMessages(activeChat);
		} 
		
	},[activeChat])

	return (

		<>
			{isMobileOrTablet

				?
				<>

					<div className="messages w-full h-full text-white  ">

						<div className="flex justify-between">

								{!activeChat && <Chats activeChat={activeChat} handleActiveChat={handleActiveChat} />}
								
								{activeChat && <ChatBox chatMessages={chatMessages} handleActiveChat={handleActiveChat}/>}

						</div>

					</div>

				</>

				:

				<>

					<div className="messages w-full h-screen text-white">

						<div className="flex bg-blink-black-2 mx-2 my-2 drop-shadow-2xl rounded-2xl laptop-xl:px-6 laptop-xl:py-6 " >

								<Chats activeChat={activeChat} handleActiveChat={handleActiveChat}/>
								
								<ChatBox chatMessages={chatMessages}/>

						</div>

					</div>

				</>
			}

		</>

	)

}

export default Messages;