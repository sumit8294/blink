import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {Link} from 'react-router-dom';

const ChatBoxHeader = ({participant}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	return (

		<>
			{isMobileOrTablet
				?
				<>
					<div className="w-full flex justify-between px-4 py-1 border-b border-blink-black-2 fixed top-0 bg-blink-black-1 tablet-sm:py-2 tablet-sm:text-[1.6rem]">

						<Link to={participant && `/profile/${participant._id}`} >

							<div className="user-info flex" >

								<div className=" post-image h-8 my-auto w-8 tablet-sm:h-12 tablet-sm:w-12 rounded-full text-center overflow-hidden" >

									<img className="w-full"  src={participant && participant.profile} alt="user" />

								</div>

								<div className="ml-3 py-2 ">
									
									<span className="block tracking-wide font-normal text-white"> {participant && participant.username} </span>
							
								</div>					
							
							</div>

						</Link >

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

				:

				<>
					<div className="flex justify-between px-4 py-1 border-b border-blink-black-2">

						<Link to={ participant && `/profile/${participant._id}`} >

							<div className="user-info flex" >

								<div className=" post-image h-8 my-auto w-8 rounded-full text-center overflow-hidden" >

									<img className="w-full"  src={participant && participant.profile} alt="user" />

								</div>

								<div className="ml-3 py-2 ">
									
									<span className="block tracking-wide font-normal text-white"> {participant && participant.username} </span>
							
								</div>					
							
							</div>

						</Link >

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

			}

		</>

	)

}

export default ChatBoxHeader;