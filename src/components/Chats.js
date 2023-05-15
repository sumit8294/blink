import ChatItems from './ChatItems';
import {useState} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

import './chats.css'
const users = [
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg",message:"Thanks for having me on stage",messageTime:"sun 1:13 pm"},
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg",message:"Thanks for having me on stage",messageTime:"1:44 pm"},
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg",message:"Thanks for having me on stage",messageTime:"12:33 am"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg",message:"Thanks for having me on stage..",messageTime:" 2 days ago"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg",message:"Thanks for having me on stage",messageTime:"yesterday"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg",message:"Thanks for having me on stage",messageTime:"sun 1:13 pm"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg",message:"Thanks for having me on stage",messageTime:"1:44 pm"},
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg",message:"Thanks for having me on stage",messageTime:"12:33 am"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg",message:"Thanks for having me on stage",messageTime:"2 days ago"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg",message:"Thanks for having me on stage",messageTime:"yesterday"},
]

const Chats = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [active,setActive] = useState("divine");

	const handleActive = (messager) => setActive(messager);

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

							{users.map((user,index)=>{

								return <ChatItems key={index} user={user} active={active} handleActive={handleActive}/>

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

							{users.map((user,index)=>{

								return <ChatItems key={index} user={user} active={active} handleActive={handleActive}/>

							})}

						</div>

					</div>

				</>

			}

		</>
	)
}

export default Chats;