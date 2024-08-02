import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const ReelPostDiscription = ({reel}) =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (

		<>
			{isMobileOrTablet
				?
					<>
						<div className="likes text-[12px] flex px-2 mobile-md:px-3 mb-4 tablet-sm:px-4  tablet-sm:text-[1rem] text-start">
							<span className=" font-semibold text-white">

								{reel.title}

							</span>
						</div >


					</>
				:
				<>
					<div className="likes flex px-6 my-2 text-[1rem] w-11/12 laptop-lg:mb-1 laptop-lg:text-[0.8rem] laptop-lg:px-2 text-start">

						<span className=" font-semibold text-white">

							{reel.title}

						</span>

					</div >

				</>
			}

		</>

	)

}

export default ReelPostDiscription;
