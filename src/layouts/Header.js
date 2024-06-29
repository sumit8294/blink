import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';
import { useEffect } from 'react';
import { userLogout } from '../reducers/authSlice';
import {useDispatch,useSelector} from 'react-redux';
import useAuth from '../hooks/useAuth';
import {selectUnseenChatsCount,fetchUnseenChatsCount} from '../reducers/chatSlice';


const Header = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const dispatch = useDispatch();
	const {userId,token} = useAuth();

	const unseenChatsCount = useSelector(selectUnseenChatsCount);

	useEffect(()=>{
		dispatch(fetchUnseenChatsCount({userId,token}));
	},[])

	const handleLogout = async () =>{

		await dispatch(userLogout());
		//resetStore(dispatch)
		window.location.reload();
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

							<Link to={`/messages`}>

								<span className="text-blink-blue-1 mx-4 text-2xl relative">

									<FontAwesomeIcon icon={faEnvelope} />

									{unseenChatsCount > 0 && 
										<span className=" absolute bottom-4 w-5 h-5 left-4 rounded-xl text-center text-sm bg-red-600 text-white">{unseenChatsCount}</span>
									}

								</span>							

							</Link>

							

								<span onClick={handleLogout} className="text-blink-blue-1 mr-4 text-2xl">

									<FontAwesomeIcon icon={faArrowRightFromBracket} />

								</span>							

							

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