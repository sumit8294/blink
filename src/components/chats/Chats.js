import ChatItems from './ChatItems';
import {useState,useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

import { useSelector, useDispatch } from 'react-redux';
import { getChatsByUserId, getChatsUsers } from '../../reducers/chatSlice'

import './chats.css'
import io from 'socket.io-client';

const Chats = ({activeChatId, handleActiveChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const userChats= useSelector(getChatsUsers);
	
	const {userId,token} = useAuth();

	const dispatch = useDispatch();


	useEffect(()=>{
		dispatch(getChatsByUserId({userId,token}));
	},[])


	return (
		<>
			{isMobileOrTablet

				?
				<>

					<div className="rounded-l-2xl py-4 w-full">

						<div className="suggestion-head border-b border-blink-black-2 px-4 py-2 text-sm flex justify-start">

							<button className="mr-2" onClick={() => window.history.go(-1)} >{ "<<" }</button>

							<button className="text-blink-gray-2" >chats</button>

						</div>

						<div className="chats overflow-y-auto h-[500px]">

							{userChats && userChats.map((chat,index)=>{

								return <ChatItems key={index} chat={chat} activeChatId={activeChatId} handleActiveChatId={handleActiveChatId}/>

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

						<div className="chats overflow-y-auto ">

							{userChats && userChats.map((chat,index)=>{

								return <ChatItems key={index} chat={chat} activeChatId={activeChatId} handleActiveChatId={handleActiveChatId}/>

							})}

						</div>

					</div>

				</>

			}

		</>
	)
}

export default Chats;