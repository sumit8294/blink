import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCamera } from '@fortawesome/free-solid-svg-icons'


const ChatBoxInput = () =>{

	return (

		<>
		
			<div className=" px-5 py-2 border-t border-blink-black-2">

				<div className="w-full rounded-3xl flex justify-between my-auto overflow-x-auto bg-blink-black-1">

					<div className="flex w-11/12 justify-between">
					
						<div className="w-11/12">

							<input className="px-6 py-2  bg-blink-black-1 focus:outline-none focus:border-b focus:border-blink-black-2 " type="text" placeholder="Type a message"/>
						
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

					<button className="px-6 text-blink-gray-2 rounded-r-3xl"> Send </button>
				
				</div>
			
			</div>
			
		</>

	)

}

export default ChatBoxInput;