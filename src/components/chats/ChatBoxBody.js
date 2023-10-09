
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import {useEffect,useRef} from 'react';

import './chatboxbody.css';

import PostsChats from './PostsChats';
import useAuth from '../../hooks/useAuth';




const ChatBoxBody = ({messages,participant}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const {userId} = useAuth(); 

	const divRef = useRef(null);

	// Use useEffect to scroll to the bottom after rendering
	useEffect(() => {
	// Check if the divRef is defined and not null
	if (divRef.current) {
	  // Scroll the div to the bottom
	  divRef.current.scrollTop = divRef.current.scrollHeight;
	}
	}, [messages]);

	return (

		<>

			{isMobileOrTablet

				?
				<>

					<div ref={divRef} className=" w-full h-[500px] overflow-y-auto px-1 text-[0.9rem] py-14 mobile-md:px-2 mobile-md:text-[1rem] mobile-lg:text-[1.2rem] tablet-sm:py-24 tablet-sm:px-4 tablet-sm:text-[1.4rem]">

						
						{messages && messages.map((messageItem,index)=>{
							
							if(messageItem.sender._id === userId){


								return (
									<>
										{messageItem.contentType === 'post' || messageItem.contentType === 'reel' ? (
											
											<PostsChats key={index} message={messageItem} userId={userId} />

										) : (

										<>
											<div key={index} className="flex justify-end right-0">
											
												<p className="text-start text-white bg-blink-gradient-1 px-2 mx-4 my-2 rounded-2xl py-2">
												
													{messageItem.content}
											
												</p>

											</div>
										</>

										)}
        							</>
								)

							}
							else{

								return (
									<>
										{messageItem.contentType === 'post' || messageItem.contentType === 'reel' ? (

											<PostsChats key={index} message={messageItem} userId={userId} />

										) : (

										<>

											<div key={index} className="flex px-2 my-4" >

												<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

													<img className="w-7 h-7  rounded-2xl"  src={participant.profile} alt="images" />

												</div>

												<p className=" text-start bg-blink-gradient-5 px-2 rounded-2xl py-2">
												{messageItem.content}</p>

											</div>

										</>
										)}

									</>
								)
							}
						})}


					</div>

				</>

				:

				<>

					<div ref={divRef} className=" chatbox w-full h-[500px] overflow-y-auto text-[1rem]">

						{messages && messages.map((messageItem,index)=>{
							
							if(messageItem.sender._id === userId){

								return (

									<>
										{messageItem.contentType === 'post' || messageItem.contentType === 'reel' ? (
											
											<PostsChats key={index} message={messageItem} userId={userId} />

										) : (

										<>
											<div key={index} className="relative flex justify-end right-0">
											
												<p className="text-start text-white bg-blink-gradient-1 px-2 mx-4 my-2 rounded-2xl py-2">
												
													{messageItem.content}
											
												</p>

											</div>
										</>

										)}
        							</>

									

								)

							}else{

								return (

									<>
										{messageItem.contentType === 'post' || messageItem.contentType === 'reel' ? (

											<PostsChats key={index} message={messageItem} userId={userId} />

										) : (

										<>

											<div key={index} className="flex px-2 my-4" >

												<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

													<img className="w-7 h-7  rounded-2xl"  src={participant.profile} alt="images" />

												</div>

												<p className=" text-start bg-blink-gradient-5 px-2 rounded-2xl py-2">
												{messageItem.content}</p>

											</div>

										</>
										)}

									</>

									

								)
							}
						})}

						
					</div>

				</>

			}

		</>

	)

}

export default ChatBoxBody;