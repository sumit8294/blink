import Chats from './Chats';
import ChatBox from './ChatBox';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useDispatch,useSelector} from 'react-redux';

import {
	getActiveChatId,
	setActiveChatId,
} from '../../reducers/chatSlice';

const Messages = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	
	const activeChatId = useSelector(getActiveChatId);
	
	const dispatch = useDispatch();
	  
	const handleActiveChatId = (messager) => {
		if(messager) dispatch(setActiveChatId(String(messager)));
		else dispatch(setActiveChatId(null))
	}

	

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