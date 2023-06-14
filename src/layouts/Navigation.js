import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
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

// import { LOGGED_OUT } from '../reducers/users';
// import {useDispatch} from 'react-redux';

const navItems = [

	{name:"Feed",icon:faChartBar},
	{name:"Explore",icon:faMagnifyingGlass},
	{name:"Messages",icon:faEnvelope},
	{name:"Reels",icon:faFilm},
	{name:"Settings",icon:faGear},
	{name:"Profile",icon:faUser},
	{name:"Create",icon:faFilm},
	{name:"Notifications",icon:faCommentDots},

]

const Navigation = () =>{

	const [activeItem,setActiveItem] = useState("feed");

	const params = useParams();

	useEffect( () => setActiveItem(params['*']) , [params] );

	const {notifyBarVisibility,setNotifyBarVisibility} = useContext(NotificationContext);

	const handleNotifyBarVisibility = () => setNotifyBarVisibility(!notifyBarVisibility);

	// const dispatch = useDispatch();

	// const handleLogout = () => dispatch(LOGGED_OUT());

	return (

		<>
		
			<div className="text-blink-gray-1 font-normal text-[1.6rem]">

				<nav>

					<ul className="">

					{navItems.map((item,key)=>{

						return (

							<Link key={key} to={item.name !== 'Profile' ? `/${item.name.toLowerCase()}` : `/${item.name.toLowerCase()}/646e21671b4dc70af49f494d`}>

								<li className="cursor-pointer">

									<div className=

										{` px-3 

										${(activeItem === item.name.toLowerCase())

										? 'text-blink-blue-1 border-r-2 border-blink-blue-1'

										: 'hover:text-blink-blue-1 hover:border-r-2 hover:border-blink-blue-1'}

										`}	
									>

										<div className="flex px-5 py-2  border-blink-black-3 content-center text-center">

											<span className="mr-4">

												<FontAwesomeIcon icon={item.icon} />

											</span>

											<span className="text-[1.2rem] my-auto font-semibold">{item.name}</span>

										</div>

									</div>

								</li>

							</Link>
						)

					})}

					</ul>

					<div className=" cursor-pointer px-3 mt-5 hover:text-blink-blue-1 hover:border-r-2 hover:border-blink-blue-1">

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