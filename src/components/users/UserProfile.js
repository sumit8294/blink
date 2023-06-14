import UserDetail from './UserDetail';
import StoryHighlights from '../stories/StoryHighlights';
import UserPosts from './UserPosts';
import Followers from './Followers';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState} from 'react';

const UserProfile = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [showFollowers,setShowFollowers] = useState("");

	console.log(showFollowers);

	return (
		<>
			{isMobileOrTablet

					?
					<>
						<div className=" relative text-white h-screen overflow-y-auto justify-center bg-blink-black-1   ">

							<UserDetail setShowFollowers={setShowFollowers} />

							<div className="stories flex px-2 tablet-md:px-4 h-[80px] mobile-md:h-[100px] mobile-lg:h-[115px] overflow-x-auto scroll-smooth">

								<StoryHighlights />

							</div>


							<UserPosts />

							{showFollowers === "followers" && <Followers type={"followers"} setShowFollowers={setShowFollowers}/>}
							{showFollowers === "followings" && <Followers type={"followings"} setShowFollowers={setShowFollowers}/>}

						</div>

					</>

					:

					<>
						<div className="h-screen text-white w-full bg-blink-black-1 laptop-lg:inline-grid">

							<div className=" mx-2 my-2 overflow-hidden laptop-lg:bg-blink-black-2 laptop-lg:py-4 drop-shadow-2xl rounded-2xl ">

								<div className="custom-scroll justify-center h-screen overflow-y-auto laptop-lg:py-4 ">
									
									<UserDetail setShowFollowers={setShowFollowers}/>

									<div className=" px-2 laptop-lg:px-6">
							
										<div className="stories h-32 flex my-auto overflow-x-auto scroll-smooth ">
											
											<StoryHighlights />
										
										</div>

									</div>

									

									<UserPosts />

								</div>

							</div>

						</div>

						{showFollowers === "followers" && <Followers type={"followers"} setShowFollowers={setShowFollowers}/>}
						{showFollowers === "followings" && <Followers type={"followings"} setShowFollowers={setShowFollowers}/>}
						
					</>
			}
		</>
	)
}

export default UserProfile;