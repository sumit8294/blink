import ChatItems from './ChatItems';
import {useState,useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import axios from 'axios';

import './chats.css'


const Chats = ({activeChat, handleActiveChat}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	const [userChats,setUserChats] = useState([]);

	const fetchUserChats = async () =>{

		const userId = "646e21641b4dc70af49f4940";

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

						<div className="suggestion-head border-b border-blink-black-2 px-4 py-2 text-sm flex justify-between">

							<button className="text-blink-gray-2" >chats</button>

						</div>

						<div className="chats overflow-y-auto h-[500px]">

							{userChats && userChats.map((chat,index)=>{

								return <ChatItems key={index} chat={chat} activeChat={activeChat} handleActiveChat={handleActiveChat}/>

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

						<div className="chats overflow-y-auto h-[500px]">

							{userChats && userChats.map((chat,index)=>{

								return <ChatItems key={index} chat={chat} activeChat={activeChat} handleActiveChat={handleActiveChat}/>

							})}

						</div>

					</div>

				</>

			}

		</>
	)
}

export default Chats;