import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'


import {Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';

import { NotificationContext } from '../store/NotificationContext';

import {useParams} from 'react-router-dom';

import { userLogout } from '../reducers/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import useAuth from '../hooks/useAuth';

import {resetStore} from '../store/index'
import {selectUnseenChatsCount,fetchUnseenChatsCount} from '../reducers/chatSlice';
import { fetchUnreadNotificationCount, selectUnreadNotificationCount } from '../reducers/notificationSlice'
import {selectPostsCount} from '../reducers/posts/postSlice'
import { selectUserSuggestionCount } from '../reducers/userSlice'

const navItems = [

	{name:"Feed",icon:faChartBar},
	{name:"Reels",icon:faFilm},
	{name:"Profile",icon:faUser},
	{name:"Explore",icon:faMagnifyingGlass},
	{name:"Create",icon:faCirclePlus},
	{name:"Settings",icon:faGear},
	{name:"Messages",icon:faEnvelope},
	{name:"Notifications",icon:faBell},

]

const Navigation = () =>{

	const [activeItem,setActiveItem] = useState("feed");

	const params = useParams();

	const {userId: loggedUserId,token} = useAuth();

	useEffect( () => setActiveItem(params['*']) , [params] );


	const dispatch = useDispatch();

	const unseenChatsCount = useSelector(selectUnseenChatsCount);
	const unreadNotificationCount = useSelector(selectUnreadNotificationCount);
	const postCount = useSelector(selectPostsCount);
	const suggestionCount = useSelector(selectUserSuggestionCount);


	const fetchUnseencounts = () =>{
		
		dispatch(fetchUnseenChatsCount({userId:loggedUserId,token}));
		dispatch(fetchUnreadNotificationCount({userId:loggedUserId,token}));
		
	}

	useEffect(()=>{
		
		if(postCount > 0 && suggestionCount > 0){
			fetchUnseencounts()
		}
	},[postCount,suggestionCount])


	const handleLogout = async () =>{

		await dispatch(userLogout());
		resetStore(dispatch)
		window.location.reload();

	}

	return (

		<>
		
			<div className="text-blink-gray-1 font-normal text-[1.6rem]">

				<nav>

					<ul className="">

					{navItems.map((item,key)=>{

						return (

							<Link key={key} to={item.name !== 'Profile' ? `/${item.name.toLowerCase()}` : `/${item.name.toLowerCase()}/${loggedUserId}`}>

								<li className="cursor-pointer">

									<div className=

										{` px-3 

										${(activeItem === item.name.toLowerCase())

										? 'text-blink-blue-1 border-r-2 border-blink-blue-1'

										: 'hover:text-blink-blue-1 hover:border-r-2 hover:border-blink-blue-1'}

										`}	
									>

										<div className="flex px-5 py-2 border-blink-black-3 content-center text-center">

											<span className="mr-4 relative">

												<FontAwesomeIcon icon={item.icon} />

												{item.name === 'Messages' && unseenChatsCount > 0 && 
													<span className=" absolute bottom-4 w-6 h-6 left-4 rounded-xl text-base bg-red-600 text-white">{unseenChatsCount}</span>
												}

												{item.name === 'Notifications' && unreadNotificationCount > 0 && 
													<span className=" absolute bottom-4 w-6 h-6 left-4 rounded-xl text-base bg-red-600 text-white">{unreadNotificationCount}</span>
												}

											</span>

											<span className="text-[1.2rem] w-full text-start my-auto font-semibold">{item.name}</span>

											

										</div>

									</div>

								</li>

							</Link>
						)

					})}

					</ul>

					<div onClick={handleLogout} className=" cursor-pointer px-3 mt-5 hover:text-blink-blue-1 hover:border-r-2 hover:border-blink-blue-1">

						<div className="flex px-5 py-2  border-blink-black-3 content-center text-center">

							<span className="mr-4">

								<FontAwesomeIcon icon={faArrowRightFromBracket} />

							</span>

							<span className="text-[1.2rem] font-bold my-auto">Logout</span>

						</div>

					</div>

				</nav>

			</div>

		</>
	)

}

export default Navigation;