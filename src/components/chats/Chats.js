import ChatItems from './ChatItems';
import {useState,useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

import './chats.css'


const Chats = ({activeChatId, handleActiveChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [userChats,setUserChats] = useState([]);

	const {userId} = useAuth();

	const fetchUserChats = async () =>{		

		try{
			const response = await axios.get(`http://localhost:5000/chats/${userId}`);

			if(response.data){
				
				setUserChats(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log("chats not found");
			}
			else console.log("chats not fetched");
		}
	}

	useEffect(()=>{
		fetchUserChats();
	},[])


	return (
		<>
			{isMobileOrTablet

				?
				<>

					<div className="rounded-l-2xl py-4">

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