import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const StoryItems = ({user}) =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

				?

				<>
					<div className="relative w-[62px] mobile-md:w-[82px] mobile-lg:w-[92px] shrink-0 flex flex-col items-center justify-end ">

						<div className="w-12 h-12 mobile-md:w-16 mobile-md:h-16 mobile-lg:w-20 mobile-lg:h-20 rounded-full shrink-0 overflow-hidden ">
							
							<img className=" my-image" src={user.imageUrl} alt="user-story"/>		
						
						</div>

						{user.name === "Your story" &&

						<span className="absolute right-1 bottom-7 mobile-md:right-3 mobile-md:bottom-8 tablet-md:right-2 bg-blink-black-1 rounded-full text-[0px]">

							<FontAwesomeIcon className="text-[14px] mobile-md:text-[16px] mobile-lg:text-[18px] tablet-md:text-[22px] text-blink-blue-1 " icon={faCirclePlus} />

						</span>

						}

						<div className="text-[0.7rem] mobile-md:text-[0.8rem] mobile-md:text-[0.9rem] py-1">

							<span>{user.name}</span>

						</div>

					</div>
				</>
				:
				<>
					<div className="flex flex-col relative w-[5.5rem] shrink-0 items-center justify-center text-center">

						<div className="relative w-16 mx-auto rounded-full shrink-0 overflow-hidden h-16 outline outline-offset-[3px] outline-2 outline-blink-blue-1">
							
							<img className=" my-image" src={user.imageUrl} alt="user-story"/>		
						
						</div>

						{user.name === "Your story" &&

						<span className="absolute right-2 bottom-10 bg-blink-black-1 rounded-full text-[0px]">

							<FontAwesomeIcon className="text-2xl text-blink-blue-1 " icon={faCirclePlus} />

						</span>

						}

						<div className="text-[0.950rem] font-semibold py-2">

							<span>{user.name}</span>

						</div>

					</div>
				</>

			}
			
		</>
	)
}

export default StoryItems;