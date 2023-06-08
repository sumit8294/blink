import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const ReelPostDiscription = () =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (

		<>
			{isMobileOrTablet
				?
					<>
						<div className="likes flex px-2 mobile-md:px-3 mb-4 tablet-sm:px-4  tablet-sm:text-[1.3rem] ">
							<span className=" text-center font-semibold text-white">

								Blink first Reel...

							</span>
						</div >

						<div className="likes flex px-2 mobile-md:px-3 ">
							
							<span className=" flex mt-0.5">

								<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/harry.jpg" alt="likers" />

								</div>

								<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/badshah.jpg" alt="likers" />

								</div>

							</span>

							<span className=" block ml-1 text-blink-gray-1 text-[0.7rem] mobile-md:text-[0.850rem] mobile-lg:text-[1rem] tablet-sm:text-[0.750rem] tablet-sm:text-[1rem] ">

								Liked by 
								<span className="font-semibold text-white"> Karan Aujla </span>
								and 
								<span className="font-semibold text-white"> 20k others..</span>

							</span>

						</div>	

					</>
				:
				<>
					<div className="likes flex px-6  mb-4 text-[1.2rem] laptop-lg:mb-1 laptop-lg:text-[1rem] laptop-lg:px-2">

						<span className=" text-center font-semibold text-white">

							Blink first Reel...

						</span>

					</div >

					<div className="likes flex px-6  laptop-lg:px-2">
						
						<span className=" flex mt-0.5">

							<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

								<img className=""  src="./assets/images/users/harry.jpg" alt="likers" />

							</div>

							<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

								<img className=""  src="./assets/images/users/badshah.jpg" alt="likers" />

							</div>

						</span>

						<span className=" block ml-1 text-blink-gray-1 text-[1.2rem] laptop-lg:text-[0.8rem] ">

							Liked by 
							<span className="font-semibold text-white"> Karan Aujla </span>
							and 
							<span className="font-semibold text-white"> 20k others..</span>

						</span>

					</div>	
				</>
			}

		</>

	)

}

export default ReelPostDiscription;