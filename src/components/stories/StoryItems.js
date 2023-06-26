import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {Link,useNavigate,useLocation,useHistory } from 'react-router-dom';
import {setStoryDomIndex} from '../../reducers/storySlice'
import {useDispatch} from 'react-redux'
const StoryItems = ({profile,userStoryindex,loggedInUserId}) =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const dispatch = useDispatch()
	const location = useLocation();
	const navigate = useNavigate();

	const handleNavigation = () =>{
		dispatch(setStoryDomIndex(userStoryindex));
		navigate("/stories/following", { state: { from: location }, replace: true });
	}

	return (
		<>
			{isMobileOrTablet

				?

				<>
					<div className="relative w-[62px] mobile-md:w-[82px] mobile-lg:w-[92px] shrink-0 flex flex-col items-center justify-end ">

						{/*<Link to={`/stories/following/${loggedInUserId}/${userStoryindex}`} >*/}

							<div onClick={handleNavigation} className="w-12 h-12 mobile-md:w-16 mobile-md:h-16 mobile-lg:w-20 mobile-lg:h-20 rounded-full shrink-0 overflow-hidden ">
								
								<img className=" my-image" src={profile.profile} alt="user-story"/>		
							
							</div>

						{/*</Link>*/}

						{profile._id === loggedInUserId &&

						<span className="absolute right-1 bottom-7 mobile-md:right-3 mobile-md:bottom-8 tablet-md:right-2 bg-blink-black-1 rounded-full text-[0px]">

							<FontAwesomeIcon className="text-[14px] mobile-md:text-[16px] mobile-lg:text-[18px] tablet-md:text-[22px] text-blink-blue-1 " icon={faCirclePlus} />

						</span>

						}

						<Link to={`/profile/${profile._id}`} >

							<div className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-md:text-[0.9rem] py-1">

								<span>{profile.username}</span>

							</div>

						</Link>

					</div>
				</>
				:
				<>
					<div className="flex flex-col relative w-[5.5rem] shrink-0 items-center justify-center text-center cursor-pointer">

						{/*<Link to={`/stories/following/${loggedInUserId}/${userStoryindex}`} >*/}

							<div onClick={handleNavigation} className="relative w-16 mx-auto rounded-full shrink-0 overflow-hidden h-16 outline outline-offset-[3px] outline-2 outline-blink-blue-1">
								
								<img className=" my-image" src={profile.profile} alt="user-story"/>		
							
							</div>

						{/*</Link>*/}

						{profile._id === loggedInUserId &&

						<span className="absolute right-2 bottom-10 bg-blink-black-1 rounded-full text-[0px]">

							<FontAwesomeIcon className="text-2xl text-blink-blue-1 " icon={faCirclePlus} />

						</span>

						}

						<Link to={`/profile/${profile._id}`} >

							<div className="text-[0.950rem] font-semibold py-2">

								<span>{profile.username}</span>

							</div>

						</Link>

					</div>
				</>

			}
			
		</>
	)
}

export default StoryItems;