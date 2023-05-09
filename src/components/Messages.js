import Chats from './Chats';
import ChatBox from './ChatBox';


const Messages = () =>{

	return (

		<>

			<div className="messages w-full pl-[19.8rem] h-full text-white  ">

				<div className="flex justify-between bg-blink-black-2 mx-2 my-2  drop-shadow-2xl rounded-2xl py-6 px-6">

						<Chats />
						
						<ChatBox />

				</div>

			</div>

		</>

	)

}

export default Messages;