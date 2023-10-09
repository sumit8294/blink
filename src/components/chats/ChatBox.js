import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInput from './ChatBoxInput';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const ChatBox = ({chatMessages,handleActiveChatId,activeChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

				?
				<>
				
					<div className=" w-full py-1 bg-blink-black-1">

						<ChatBoxHeader participant={chatMessages && chatMessages.participants[0]} handleActiveChatId={handleActiveChatId}/>

						<ChatBoxBody messages={chatMessages && chatMessages.messages} participant={chatMessages && chatMessages.participants[0]} />

						<ChatBoxInput activeChatId={activeChatId} participant={chatMessages && chatMessages.participants[0]}/>

					</div>		
					
				</>

				:

				<>
					<div className=" w-8/12 ">

						<div className="w-full py-1 border-l border-blink-black-2 bg-blink-black-1 rounded-r-2xl">

							<ChatBoxHeader participant={chatMessages && chatMessages.participants[0]} />

							<ChatBoxBody messages={chatMessages && chatMessages.messages} participant={chatMessages && chatMessages.participants[0]}/>

							<ChatBoxInput activeChatId={activeChatId} participant={chatMessages && chatMessages.participants[0]}/>

						</div>
						
					</div>
				</>

			}
		</>
	)
}

export default ChatBox;