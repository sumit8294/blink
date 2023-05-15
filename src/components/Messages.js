import Chats from './Chats';
import ChatBox from './ChatBox';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const Messages = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (

		<>
			{isMobileOrTablet

				?
				<>

					<div className="messages w-full h-full text-white  ">

						<div className="flex justify-between">

								{/*<Chats />*/}
								
								<ChatBox />

						</div>

					</div>

				</>

				:

				<>

					<div className="messages w-full h-screen text-white">

						<div className="flex bg-blink-black-2 mx-2 my-2 drop-shadow-2xl rounded-2xl laptop-xl:px-6 laptop-xl:py-6 " >

								<Chats />
								
								<ChatBox />

						</div>

					</div>

				</>
			}

		</>

	)

}

export default Messages;