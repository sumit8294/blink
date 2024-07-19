import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

import ChatItems from './ChatItems';
import {useState,useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Search from '../elements/Search'

import { useSelector, useDispatch } from 'react-redux';
import { getChatInfo, getChatMessages, getChatsByUserId, 
		getChatsFromSearch, 
		getChatsUsers,
		setChatInfo,
		setChatMessages,

	
} from '../../reducers/chatSlice'

import './chats.css'

const Chats = ({activeChatId, handleActiveChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [queryName,setQueryName] = useState(""); 

	const userChats= useSelector(getChatsUsers);
	const messages = useSelector(getChatMessages)
	const chat = useSelector(getChatInfo)
	

	const {userId,token} = useAuth();


	const dispatch = useDispatch();

	useEffect(()=>{
		handleActiveChatId(null)
		if(messages) dispatch(setChatMessages(null))
		if(chat) dispatch(setChatInfo(null))
		if(queryName === "") dispatch(getChatsByUserId({userId,token}))

		if(queryName) dispatch(getChatsFromSearch({userId,token,queryName}))
	},[queryName])

	return (
		<>
			{isMobileOrTablet

				?
				<>

					<div className="rounded-l-2xl py-4 w-full">

						<div className="suggestion-head border-b border-blink-black-2 px-4 py-2 text-sm flex justify-start">

							<button className="mr-2" onClick={() => window.history.go(-1)} ><FontAwesomeIcon icon={faLeftLong} /></button> &nbsp;

							<button className="text-blink-gray-2" >chats</button>

						</div>

						<Search queryName={queryName} setQueryName={setQueryName}/>

						<div className="chats overflow-y-auto h-[500px]">
							
							{userChats && userChats.map((userChat,index)=>{

								return <ChatItems key={index} chat={userChat} activeChatId={activeChatId} handleActiveChatId={handleActiveChatId}/>

							})}

						</div>

					</div>

				</>

				:

				<>
				
					<div className="bg-blink-black-1 w-4/12  rounded-l-2xl py-4">

						<div className="suggestion-head border-b border-blink-black-2 px-4  py-2 text-sm flex justify-between">

							<button className="text-blink-gray-2" >chats</button>

						</div>

						<Search queryName={queryName} setQueryName={setQueryName}/>

						<div className="chats overflow-y-auto ">


							{userChats && userChats.map((userChat,index)=>{

								return <ChatItems key={index} chat={userChat} activeChatId={activeChatId} handleActiveChatId={handleActiveChatId}/>

							})}

						</div>

					</div>

				</>

			}

		</>
	)
}

export default Chats;