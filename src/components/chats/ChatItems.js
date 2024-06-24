import { format } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const ChatItems = ({chat,handleActiveChatId,activeChatId}) => {

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	
	return (
		<>
			{isMobileOrTablet

				?
				<>

					<div className={`cursor-pointer relative flex px-4 py-2 ${ activeChatId === chat._id ? 'border-y border-blink-black-2' : ''} `} onClick={()=>handleActiveChatId(chat._id,chat.receiversRoomId)} >

						<div className="shrink-0 post-image h-12 my-auto w-12 rounded-full text-center overflow-hidden" >

							<img className="w-full"  src={chat.participants[0].profile} alt="images" />

						</div>
						
						<span className="absolute left-14 bottom-5 w-2 h-2 rounded-full bg-blink-gradient-1"></span>

						<div className="">

							<div className="px-3 ">
								
								<span className="block tracking-wide font-normal text-white"> 
									
									{chat.participants[0].username}

								</span>

								{chat.messages.length > 0 && <span className="block text-[11px] "> 
									
									<span className="block text-blink-gray-1">

										{ chat.messages[0].contentType === 'reel' || chat.messages[0].contentType === 'post' 

											? (chat.messages[0].sender._id === chat.participants[0]._id)

												? chat.participants[0].username + ' sent you a ' + chat.messages[0].contentType
												: 'you sent a '+ chat.messages[0].contentType

											: chat.messages[0].content

										} .
											
									</span>

									<span className="text-blink-gray-2 text-[11px]"> {format(new Date(chat.messages[0].sendAt), 'dd MMM yyyy hh:mm a')} </span>

								</span>}
						
							</div>
						
						</div>	
						
					</div>
				</>

				:

				<>

					<div className={`cursor-pointer relative flex px-4 py-2 laptop-sm:px-2 ${ activeChatId === chat._id ? 'border-y border-blink-black-2' : ''} `} onClick={()=>handleActiveChatId(chat._id,chat.receiversRoomId)} >

						<div className="shrink-0 post-image h-12 my-auto w-12 laptop-sm:h-10 laptop-sm:w-10 rounded-full text-center overflow-hidden" >

							<img className="w-full"  src={chat.participants[0].profile} alt="images" />

						</div>
						
						<span className="absolute left-14 bottom-5 w-2 h-2 laptop-sm:left-10 rounded-full bg-blink-gradient-1"></span>

						<div className="">

							<div className="px-3 laptop-sm:px-3">
								
								<span className="block tracking-wide font-normal text-white"> 
									
									{chat.participants[0].username}

								</span>

								{chat.messages.length > 0 && <span className="block text-[11px] "> 
									
									<span className="block text-blink-gray-1">

										{ chat.messages[0].contentType === 'reel' || chat.messages[0].contentType === 'post' 

											? (chat.messages[0].sender._id === chat.participants[0]._id)

												? chat.participants[0].username + ' sent you a ' + chat.messages[0].contentType
												: 'you sent a '+ chat.messages[0].contentType

											: chat.messages[0].content

										} .

									</span>

									<span className="text-blink-gray-2 text-[11px]">  {format(new Date(chat.messages[0].sendAt), 'dd MMM yyyy hh:mm a')}  </span>

								</span>}
						
							</div>
						
						</div>	
						
					</div>
				</>

			}

		</>
	)
}

export default ChatItems;