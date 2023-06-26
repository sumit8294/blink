import {useState,useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {Link} from 'react-router-dom';


const StoryViewerSlides = ({story,user}) => {

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [storyNumber,setStoryNumber] = useState(0);
	const swipeStory = (swipeTo) =>{

		if(swipeTo === 1 && storyNumber < story.length-1){
			setStoryNumber(storyNumber+1 );
		}
		else if(swipeTo === -1 && storyNumber > 0){
			setStoryNumber(storyNumber-1);
		}
	}

	return (

		<>
			{isMobileOrTablet ?

				<>

					<div className="w-full relative shrink-0 snap-always tablet-sm:h-screen tablet-sm:flex tablet-sm:justify-center snap-center" >

						<div className="relative h-full my-auto tablet-sm:h-[40rem] tablet-sm:my-auto  justify-center text-center overflow-hidden" >

							<div className="h-full flex">
								
								<img className="w-full my-auto" src={`https://res.cloudinary.com/dzaklkjrk/image/upload/v1684937670/${story[storyNumber]}`} alt="story" />
							
							</div>

							<div className="absolute left-0 w-full py-4 px-2 top-0 tablet-sm:px-0 pb-20">

								<div className="post-details px-2 mobile-md:py-2 rounded flex text-xs justify-between ">

									<Link to={`/profile/${user._id}`} >

										<div className="user-info flex align-middle content-center">

											<div className="post-image w-10 h-10 tablet-sm:w-12 tablet-sm:h-12 rounded-full text-center  overflow-hidden" >

												<img className="" src={user.profile} alt="images" />

											</div>

											<div className="px-2 py-2 tablet-sm:py-4">

												<span className="block text-[1.2rem] tablet-sm:text-[1.3rem] font-semibold">{user.username}</span>

											</div>

										</div>

									</Link>

								</div>

							</div>

						</div>

						<div className="absolute flex w-full overflow-hidden top-0 h-full">
							<button className=" w-1/2 flex justify-center items-center" onClick={()=>swipeStory(-1)}>
							
								
							</button>
							<button className=" w-1/2 flex justify-center items-center" onClick={()=>swipeStory(1)}>
								
							</button>
						</div>
						
					</div>

				</>

				:

				<>
				
					<div className="post shrink-0 w-full relative snap-always snap-center justify-center laptop-lg:justify-start laptop-lg:py-6 laptop-lg:px-6 mx-auto laptop-lg:my-6" >
						
						<div className="post-image relative h-[46rem] laptop-lg:h-[32rem] flex justify-center text-center overflow-hidden rounded-2xl" >

							<img className="w-full" src={`https://res.cloudinary.com/dzaklkjrk/image/upload/v1684937670/${story[storyNumber]}`} alt="story" />

							<div className="absolute left-0 w-full py-4 px-2 top-0 bg-bl-grad-black-top tablet-sm:px-0">

								<div className="post-details px-4 py-1 rounded flex text-xs justify-between laptop-lg:px-2">

									<Link to={`/profile/${user._id}`} >

										<div className="user-info  flex align-middle content-center">

											<div className="post-image w-12 h-12 rounded-full text-center  overflow-hidden laptop-lg:h-8 laptop-lg:w-8" >

												<img className=""  src={user.profile} alt="images" />

											</div>

											<div className="px-2 py-2">

												<span className="block text-[1.3rem] laptop-lg:text-[1rem] font-semibold">{user.username}</span>

											</div>

										</div>

									</Link >

								</div>

							</div>

						</div>


						<div className="absolute flex w-full overflow-hidden top-0 h-full">
							<button className=" w-1/2 flex justify-center items-center" onClick={()=>swipeStory(-1)}>
							{"<<"}
								
							</button>
							<button className=" w-1/2 flex justify-center items-center" onClick={()=>swipeStory(1)}>
								{">>"}
							</button>
						</div>
						
					</div>

				</>
			}
		</>
	)
}

export default StoryViewerSlides;