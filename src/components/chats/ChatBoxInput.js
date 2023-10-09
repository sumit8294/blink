import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
 
import {sendMessage, getShareableContentStatus, fetchChatMessages} from '../../reducers/chatSlice';
import useAuth from '../../hooks/useAuth';


const ChatBoxInput = ({participant,activeChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [textMessage,setTextMessage] = useState("");

	const [disableSend,setDisableSend] = useState(true);

	const dispatch = useDispatch();
	const shareStatus = useSelector(getShareableContentStatus)
	const {token,userId} = useAuth();

	const handleSend = async () => {
		const body = {
			sender: userId,
			receiver: participant._id,
			content: textMessage,
			contentType: 'text'
		}

		await dispatch(sendMessage({body,token}))
		console.log(shareStatus === 'succeeded',shareStatus)
		
		if(shareStatus === 'succeeded' || shareStatus === 'idle'){
			setTextMessage("")
			dispatch(fetchChatMessages({userId,token,chatId:activeChatId}))
		}

	}

	useEffect(()=>{
		if(textMessage.length > 0 && disableSend === true){
			setDisableSend(false)
		}else if(textMessage.length <= 0 && disableSend === false){
			setDisableSend(true)
		}
	},[textMessage])

	

	return (

		<>

			{isMobileOrTablet

				?
				<>

					{participant && <div className="flex px-2 py-1 w-full border-t border-blink-black-3 fixed bottom-0 bg-blink-black-1 mobile-md:text-[1rem] mobile-lg:text-[1.2rem] mobile-md:py-2 tablet-sm:text-[1.6rem] tablet-sm:py-3">
					
						<div className="w-8/12">

							<input 
								className="px-2 py-2 bg-blink-black-1 focus:outline-none " 
								type="text" 
								placeholder="Type a message"
								value={textMessage}
								onChange={(e)=>setTextMessage(e.target.value)}
							/>
						
						</div>

						<div className="py-2 px-3 cursor-pointer ">

							<label htmlFor="file-input">

								<FontAwesomeIcon icon={faCamera} />

							</label>

							<input
								id="file-input"
								type="file"
								
								style={{ display: 'none' }}
							/>

					    </div>

					    {disableSend 

					    	?	<button className="w-3/12 text-blink-gray-2 font-bold rounded-r-3xl"> Send </button>	
					    	
					    	: 	<button className="w-3/12 text-blink-blue-1 font-bold rounded-r-3xl"
										onClick={handleSend}
								> Send </button>

					    }

					</div>

					}

				</>

				:

				<>
		
					{participant && <div className=" px-5 py-2 border-t border-blink-black-2">

						<div className="w-full rounded-3xl flex justify-between my-auto overflow-x-auto bg-blink-black-1">

							<div className="flex w-11/12 justify-between">
							
								<div className="w-11/12">

									<input 
										className="px-6 py-2  bg-blink-black-1 focus:outline-none focus:border-b focus:border-blink-black-2 " 
										type="text" 
										placeholder="Type a message"
										value={textMessage}
										onChange={(e)=>setTextMessage(e.target.value)}
									/>
								
								</div>

								<div className="w-1/12 py-2 px-3 cursor-pointer">

									<label htmlFor="file-input">

										<FontAwesomeIcon icon={faCamera} />

									</label>

									<input
										id="file-input"
										type="file"
										
										style={{ display: 'none' }}
									/>

							    </div>

							</div>

							{disableSend 

								?	<button className="px-6 text-blink-gray-2 font-bold rounded-r-3xl"> Send </button>

								:	<button className="px-6 text-blink-blue-1 font-bold rounded-r-3xl"
											onClick={handleSend}
								> Send </button>

							}
						
						</div>
					
					</div>
					}

				</>

			}
			
		</>

	)

}

export default ChatBoxInput;