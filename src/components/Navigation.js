import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';

import { NotificationContext } from '../store/NotificationContext';

import {useParams} from 'react-router-dom';

const navItems = [

	{name:"Feed",icon:faChartBar},
	{name:"Explore",icon:faMagnifyingGlass},
	{name:"Messages",icon:faEnvelope},
	{name:"Reels",icon:faFilm},
	{name:"Settings",icon:faGear},

]

const Navigation = () =>{

	const [activeItem,setActiveItem] = useState("");

	const params = useParams();

	useEffect( () => setActiveItem(params['*']) , [params] );

	const {notifyBarVisibility,setNotifyBarVisibility} = useContext(NotificationContext);

	const handleNotifyBarVisibility = () => setNotifyBarVisibility(!notifyBarVisibility);

	return (

		<>
		
			<div className="text-blink-gray-1 font-normal text-xl">

				<nav>

					<ul className="">

					{navItems.map((item,key)=>{

						return (

							<Link key={key} to={`/${item.name.toLowerCase()}`}>

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

											<span className="text-sm my-auto font-semibold">{item.name}</span>

										</div>

									</div>

								</li>

							</Link>
						)

					})}

					</ul>

					<div onClick={handleNotifyBarVisibility} className=" cursor-pointer px-3 hover:text-blink-blue-1 hover:border-r-2 hover:border-blink-blue-1">

						<div className="flex px-5 py-2  border-blink-black-3 content-center text-center">

							<span className="mr-4">

								<FontAwesomeIcon icon={faBell} />

							</span>

							<span className="text-sm font-bold my-auto">Notifications</span>

						</div>

					</div>

					<div className=" cursor-pointer px-3 mt-5 hover:text-blink-blue-1 hover:border-r-2 hover:border-blink-blue-1">

						<div className="flex px-5 py-2  border-blink-black-3 content-center text-center">

							<span className="mr-4">

								<FontAwesomeIcon icon={faArrowRightFromBracket} />

							</span>

							<span className="text-sm font-bold my-auto">Logout</span>

						</div>

					</div>

				</nav>

			</div>

		</>
	)

}

export default Navigation;