import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {Link, useParams} from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';
import { useContext, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../hooks/useAuth';
import {selectUnseenChatsCount,fetchUnseenChatsCount} from '../reducers/chatSlice';
import {fetchUnreadNotificationCount, selectUnreadNotificationCount} from '../reducers/notificationSlice'
import {DialogContext} from '../store/DialogContext';
import { selectUserPostsCount } from '../reducers/posts/postSlice';

const Header = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const dispatch = useDispatch();
	const {userId,token} = useAuth();
	const param = useParams();
	const {setSettingMenuVisibility,state} = useContext(DialogContext)

	const page = param['*'].split('/')[0];

	const unseenChatsCount = useSelector(selectUnseenChatsCount);
	const unreadNotificationCount = useSelector(selectUnreadNotificationCount)
	const postCount = useSelector(selectUserPostsCount)

	useEffect(()=>{
		if(isMobileOrTablet && postCount > 0){
			dispatch(fetchUnseenChatsCount({userId,token}));
			dispatch(fetchUnreadNotificationCount({userId,token}));
		}
	},[postCount,isMobileOrTablet])

	const openSettingMenu = () =>{
		
		setSettingMenuVisibility(!state.settingMenuVisibility)
	}

	return (
		<>
			{isMobileOrTablet
				?
				<>
					<div className="px-2 py-3 mobile-md:px-4 tablet-sm:py-4 w-full bg-blink-black-1 shadow-lg flex justify-between text-white">
						<div className="">
							{/*<img src="" alt="blink">*/}
							<span className="poppins my-auto text-2xl font-bold font-Poppins ">BLINK</span>
						</div>
							
						<div className="flex">

							{/* <Link to={`/notifications`}>

								<span className="text-blink-blue-1 mr-4 text-2xl">

									<FontAwesomeIcon icon={faCommentDots} />

								</span>							

							</Link> */}


							{page !== 'profile' &&

							<Link to={`/notifications`}>

								<span className="text-blink-blue-1 mx-4 text-2xl relative">

									<FontAwesomeIcon icon={faCommentDots} />

									{unreadNotificationCount > 0 && 
										<span className=" absolute bottom-4 w-5 h-5 left-4 rounded-xl text-center text-sm bg-red-600 text-white">{unreadNotificationCount}</span>
									}

								</span>							

							</Link>

							}
							
							<Link to={`/messages`}>

								<span className="text-blink-blue-1 mx-4 text-2xl relative">

									<FontAwesomeIcon icon={faEnvelope} />

									{unseenChatsCount > 0 && 
										<span className=" absolute bottom-4 w-5 h-5 left-4 rounded-xl text-center text-sm bg-red-600 text-white">{unseenChatsCount}</span>
									}

								</span>							

							</Link>

							{page === 'profile'	&& <span onClick={openSettingMenu} className="text-blink-blue-1 mr-4 text-2xl">

									<FontAwesomeIcon icon={faBars} />

								</span>	}						

							

						</div>		
						
					</div>
				</>
				:
				<>
					<div className="px-6 py-3 w-full bg-blink-black-1 shadow-lg flex justify-between text-white laptop-xl:flex">
						<div className="">
							{/*<img src="" alt="blink">*/}
							<span className="poppins my-auto text-2xl font-bold font-Poppins ">BLINK</span>
						</div>
							
						<div className="flex">

								{/* <Link to={`/notifications`}>

									<span className="text-blink-blue-1 mr-4 text-2xl">

										<FontAwesomeIcon icon={faCommentDots} />

									</span>							

								</Link> */}
								
								{/* <Link to={`/messages`}>

									<span className="text-blink-blue-1 mr-4 text-2xl">

										<FontAwesomeIcon icon={faEnvelope} />

									</span>							

								</Link> */}

						</div>
						
					</div>
				</>
			}
		</>
	)
}

export default Header;