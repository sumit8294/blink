import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInput from './ChatBoxInput';

const ChatBox = () =>{

	return (
		<>
			<div className=" w-8/12 ">

				<div className=" w-full py-1 border-l border-blink-black-2 bg-blink-black-1 rounded-r-2xl">

					<ChatBoxHeader />

					<ChatBoxBody />

					<ChatBoxInput />

				</div>
				
			</div>
		</>
	)
}

export default ChatBox;