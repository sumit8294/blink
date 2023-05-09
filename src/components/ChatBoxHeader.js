import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'


const ChatBoxHeader = () =>{

	return (

		<>

			<div className="flex justify-between px-4 py-1 border-b border-blink-black-2">

				<div className="user-info flex" >

					<div className=" post-image h-8 my-auto w-8 rounded-full text-center overflow-hidden" >

						<img className="w-full"  src="./assets/images/users/badshah.jpg" alt="images" />

					</div>

					<div className="ml-3 py-2 ">
						
						<span className="block tracking-wide font-normal text-white"> Badshah </span>
				
					</div>					
				
				</div>

				<div className="contact-options cursor-pointer flex py-2">
					
					<span className="px-2 mr-1">
						<button>
							<FontAwesomeIcon icon={faVideo} />
						</button>
					</span>

					<span className="px-2">
						<button>
							<FontAwesomeIcon icon={faPhone} />
						</button>
					</span>

				</div>
					
			</div>

		</>

	)

}

export default ChatBoxHeader;