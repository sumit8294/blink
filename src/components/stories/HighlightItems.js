import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const HighlightItems = ({profile}) =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

				?

				<>
					<div className="relative w-[62px] mobile-md:w-[82px] mobile-lg:w-[92px] shrink-0 flex flex-col items-center justify-end ">

						<div className="w-12 h-12 mobile-md:w-16 mobile-md:h-16 mobile-lg:w-20 mobile-lg:h-20 rounded-full shrink-0 overflow-hidden ">
							
							<img className=" my-image" src={profile} alt="user-story"/>		
						
						</div>

					</div>
				</>
				:
				<>
					<div className="flex flex-col relative w-[5.5rem] shrink-0 items-center justify-center text-center cursor-pointer">


						<div className="relative w-16 mx-auto rounded-full shrink-0 overflow-hidden h-16 outline outline-offset-[3px] outline-2 outline-blink-blue-1">
							
							<img className=" my-image" src={profile} alt="user-story"/>		
						
						</div>

					</div>
				</>

			}
			
		</>
	)
}

export default HighlightItems;