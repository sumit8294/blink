import HeaderProfile from '../components/HeaderProfile';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const Header = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

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
							
						<HeaderProfile/>		
						
					</div>
				</>
				:
				<>
					<div className="px-6 py-3 w-full bg-blink-black-1 shadow-lg flex justify-between text-white laptop-lg:hidden laptop-xl:flex">
						<div className="">
							{/*<img src="" alt="blink">*/}
							<span className="poppins my-auto text-2xl font-bold font-Poppins ">BLINK</span>
						</div>
							
						<HeaderProfile/>		
						
					</div>
				</>
			}
		</>
	)
}

export default Header;