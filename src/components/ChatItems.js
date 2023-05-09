import {useEffect} from 'react';


const ChatItems = ({user,handleActive,active}) => {

	let activeUserChatBoxCss = `cursor-pointer relative flex px-4 py-2 ${ active === user.name ? 'border-y border-blink-black-2' : ''} `;
	
	return (
		<>

			<div className={activeUserChatBoxCss} onClick={()=>handleActive(user.name)} >

				<div className="shrink-0 post-image h-12 my-auto w-12 rounded-full text-center overflow-hidden" >

					<img className="w-full"  src={user.imageUrl} alt="images" />

				</div>
				
				<span className="absolute left-14 bottom-5 w-2 h-2 rounded-full bg-blink-gradient-1"></span>

				<div className="">

					<div className="px-3 ">
						
						<span className="block tracking-wide font-normal text-white"> 
							
							{user.name}

						</span>

						<span className="block text-[11px] "> 
							
							<span className="block text-blink-gray-1"> { user.message } .</span>

							<span className="text-blink-gray-2 text-[11px]"> {user.messageTime} </span>

						</span>
				
					</div>
				
				</div>	
				
			</div>
		</>
	)
}

export default ChatItems;