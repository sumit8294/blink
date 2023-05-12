import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const FeedPostLikes = () =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (

		<>
			{isMobileOrTablet
				?
					<>

						<div className="likes flex px-2 mobile-md:px-3 mt-1 ">
							
							<span className=" flex mt-0.5">

								<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/harry.jpg" alt="likers" />

								</div>

								<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/badshah.jpg" alt="likers" />

								</div>

								{/*<div className="liker w-4 h-4 mobile-md:h-5 mobile-md:w-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/zyan.jpg" alt="likers" />

								</div>*/}



							</span>

							<span className="ml-1 text-blink-gray-1 text-[0.8rem] mobile-md:text-[0.9rem] mobile-lg:text-[1.1rem] tablet-sm:text-[0.8rem]">

								Liked by 
								<span className="font-bold text-white"> Karan Aujla </span>
								and 
								<span className="font-bold text-white"> 20k others..</span>

							</span>

						</div>	

					</>
				:
				<>
					<div className="post-likers rounded justify-between">


						<div className="likes flex px-2 ">
							
							<span className=" flex my-auto">

								<div className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/harry.jpg" alt="likers" />

								</div>

								<div className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/badshah.jpg" alt="likers" />

								</div>

								<div className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

									<img className=""  src="./assets/images/users/zyan.jpg" alt="likers" />

								</div>

							</span>

							<span className="text-[0.950rem] ml-1 text-blink-gray-1">

								Liked by 
								<b className=" font-semibold text-white"> Karan Aujla </b>
								and 
								<b className=" font-semibold text-white"> 20k others..</b>

							</span>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default FeedPostLikes;