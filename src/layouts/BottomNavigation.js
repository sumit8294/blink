import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const BottomNavigation = () =>{

	const [activeItem,setActiveItem] = useState("feed");

	const params = useParams();

	const {userId,profile} = useAuth();

	useEffect( () => setActiveItem(params['*']) , [params] );

	return (
		<>
			<div className="laptop-lg:hidden fixed bottom-0 z-20 w-full bg-blink-black-1 text-blink-gray-1 text-center text-[1.2rem]">

				<nav className="flex justify-center">

					<Link className="py-4 w-1/5" to={`/feed`}>

						<span className={activeItem === 'feed' ? 'text-blink-blue-1' : '' }>

							<FontAwesomeIcon icon={faChartBar} />

						</span>							

					</Link>

					<Link className="py-4 w-1/5" to={`/reels`}>

						<span className={activeItem === 'reels' ? 'text-blink-blue-1' : '' }>

							<FontAwesomeIcon icon={faFilm} />

						</span>							

					</Link>

					<Link className="w-1/4 absolute bottom-4 bg-blink-black-1 rounded-full" to={`/create`}>

						<span className={activeItem === 'create' ? 'text-blink-blue-1 text-[3rem]' : 'text-[3rem]' }>

							<FontAwesomeIcon icon={faCirclePlus} />

						</span>							

					</Link>

					<div className="py-4 w-1/5"></div>

					<Link className="py-4 w-1/5" to={`/explore`}>

						<span className={activeItem === 'explore' ? 'text-blink-blue-1' : '' }>

							<FontAwesomeIcon icon={faMagnifyingGlass} />

						</span>							

					</Link>

					<Link className="py-4 w-1/5" to={`/profile/${userId}`}>

						<span>

							<div className="mx-auto w-8 h-8 rounded-full overflow-hidden">
					
	{profile 
		? <img className="" src={profile}  alt="user-story"/>	
	        : <img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
												}
	
				
							</div>

						</span>					

					</Link>

				</nav>
			</div>
		</>
	)
}

export default BottomNavigation;
