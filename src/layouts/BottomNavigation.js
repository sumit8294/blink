import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

const BottomNavigation = () =>{

	const [activeItem,setActiveItem] = useState("feed");

	const params = useParams();

	useEffect( () => setActiveItem(params['*']) , [params] );

	return (
		<>
			<div className="laptop-lg:hidden fixed bottom-0 z-20 w-full bg-blink-black-1 text-blink-gray-1 text-center text-[1.2rem]">

				<nav className="flex">

					<Link className="py-4 w-1/4" to={`/feed`}>

						<span className={activeItem === 'feed' ? 'text-blink-blue-1' : '' }>

							<FontAwesomeIcon icon={faChartBar} />

						</span>							

					</Link>

					<Link className="py-4 w-1/4" to={`/reels`}>

						<span className={activeItem === 'reels' ? 'text-blink-blue-1' : '' }>

							<FontAwesomeIcon icon={faFilm} />

						</span>							

					</Link>

					<Link className="py-4 w-1/4" to={`/explore`}>

						<span className={activeItem === 'explore' ? 'text-blink-blue-1' : '' }>

							<FontAwesomeIcon icon={faMagnifyingGlass} />

						</span>							

					</Link>

					<Link className="py-4 w-1/4" to={`/profile/646e21671b4dc70af49f494d`}>

						<span>

							<div className="border-2 border-blink-blue-1 mx-auto w-8 h-8 rounded-full overflow-hidden">
					
								<img className="" src='https://res.cloudinary.com/dzaklkjrk/image/upload/v1684937670/posts-and-profile/zyan.jpg' alt="user-story"/>		
				
							</div>

						</span>					

					</Link>

				</nav>
			</div>
		</>
	)
}

export default BottomNavigation;