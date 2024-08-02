import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'


import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import { 
	setChatInfo,
} from '../../reducers/chatSlice';
import { useDispatch } from 'react-redux';

import {Link} from 'react-router-dom';

const ChatBoxHeader = ({participant,handleActiveChatId}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const dispatch = useDispatch();
	const handleBackClick = () => {
		dispatch(setChatInfo(null))
		handleActiveChatId(null)
	}


	return (

		<>
			{isMobileOrTablet
				?
				<>

					{participant && <div className="w-full flex justify-between px-4 py-1 border-b border-blink-black-2 fixed top-0 bg-blink-black-1 tablet-sm:py-2 tablet-sm:text-[1.6rem]">


						<div className="flex" >

							<button className="mr-2" onClick={handleBackClick}>
								<FontAwesomeIcon icon={faLeftLong} />
							</button> &nbsp;

							<Link to={`/profile/${participant._id}`} >

								<div className="user-info flex" >

									<div className=" post-image h-8 my-auto w-8 tablet-sm:h-12 tablet-sm:w-12 rounded-full text-center overflow-hidden" >

										{participant.profile
									? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={participant.profile} alt="profile"/>

									: <img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
								}

									</div>

									<div className="ml-3 py-2 ">
										
										<span className="block tracking-wide font-normal text-white"> {participant.username} </span>
								
									</div>					
								
								</div>

							</Link >

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
							
					</div>}
				</>

				:

				<>
					{participant && <div className="flex justify-between px-4 py-1 border-b border-blink-black-2">

						<Link to={`/profile/${participant._id}`} >

							<div className="user-info flex" >

								<div className=" post-image h-8 my-auto w-8 rounded-full text-center overflow-hidden" >

									{participant.profile
									? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={participant.profile} alt="profile"/>

									: <img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
								}

								</div>

								<div className="ml-3 py-2 ">
									
									<span className="block tracking-wide font-normal text-white"> {participant.username} </span>
							
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
							
					</div>}
				</>

			}

		</>

	)

}

export default ChatBoxHeader;
