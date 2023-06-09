import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';


const FeedPostComments = ({post}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		
		<>
			{isMobileOrTablet 
				?
				<>
						<div className="mb-1 ">

							<div className="likes relative text-[0.8rem] px-2 mobile-md:text-[0.950rem] mobile-md:px-3 mobile-lg:text-[1.1rem] tablet-sm:text-[0.950rem]">
								
								<span className="block  text-blink-gray-1"> 
									
									<span className="font-bold text-white"> {post.user.username} </span>

									<span>	{post.caption} </span>

									<span className="">

										<button className="opacity-50"> more </button>			
								
									</span>

								</span>

								<span className="block text-blink-gray-1"> 

									<button className="opacity-50">View all comments</button>

								</span>

								<span className="block  text-blink-gray-1"> 
									
									<span className="font-bold text-white"> ranveersingh </span>

									<span>	silence is just... </span>

								</span>
								
								<span className="block  text-blink-gray-1"> 
									
									<span className="font-bold text-white"> yoyohoneysingh </span>

									<span>	Unforgettable. Thank you for having </span>

								</span>
						
							</div>
						

							<div className="add-comment hidden rounded  justify-between">

								<div className="text-[12px] ">

									<div className="relative px-1 pb-4 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-b-2xl">
										
										<div className=" w-full text-[#dbdbdb] drop-shadow-2xl flex overflow-x-auto bg-blink-black-1">
											
											<input className="px-1 py-1 w-10/12 bg-blink-black-1 focus:outline-none " type="text" placeholder="Add a comment..."/>
											
											<button className="px-3 w-2/12">
												
												<FontAwesomeIcon icon={faPaperPlane} />
											
											</button>
										
										</div>
									
									</div>
								
								</div>
							
							</div>

						</div>

				</>
				:
				<>
				<div className="post-comments rounded  justify-between">

						<div className="text-[0.950rem]">

							<div className="likes relative px-2 rounded-t-2xl">
								
								<span className="block text-blink-gray-1"> 
									
									<b className="font-semibold text-white"> {post.user.username} </b>

									<span>	{post.caption} </span>

									<span className="">

										<button className="opacity-50"> more </button>			
								
									</span>

								</span>

								<span className="block text-blink-gray-1"> 

									<button className="opacity-50">View all comments</button>

								</span>

								<span className="block  text-blink-gray-1"> 
									
									<b className=" font-semibold text-white"> ranveersingh </b>

									<span>	VIV SUPREMACY 👑 </span>

								</span>
								
								<span className="block   mb-0.5 text-blink-gray-1"> 
									
									<b className=" font-semibold text-white"> yoyohoneysingh </b>

									<span>	Unforgettable. Thank you for having </span>

								</span>
						
							</div>
						
						</div>

						<div className="add-comment rounded justify-between laptop-lg:pb-3">

							<div className="text-[1rem] ">

								<div className="relative px-1 rounded-b-2xl ">
									
									<div className=" w-full text-[#dbdbdb] flex overflow-x-auto ">
										
										<input className="px-1 py-1 w-10/12 bg-blink-black-1 focus:outline-none " type="text" placeholder="Add a comment..."/>
										
										<button className="px-3 w-2/12">
											
											<FontAwesomeIcon icon={faPaperPlane} />
										
										</button>
									
									</div>
								
								</div>
							
							</div>
						
						</div>

					</div>
				</>
			}
		</>

	)

}

export default FeedPostComments;