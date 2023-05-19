import Profile from './Profile';
import StoryHighlights from './StoryHighlights';
import UserPosts from './UserPosts';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const UserProfile = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

					?
					<>
						<div className="text-white h-screen overflow-y-auto justify-center bg-blink-black-1   ">

							<Profile />

							<div className="stories flex px-2 tablet-md:px-4 h-[80px] mobile-md:h-[100px] mobile-lg:h-[115px] overflow-x-auto scroll-smooth">

								<StoryHighlights />

							</div>


							<UserPosts />

						</div>
					</>

					:

					<>
						<div className="h-screen text-white bg-blink-black-1 laptop-lg:inline-grid">

						<div className=" mx-2 my-2 overflow-hidden laptop-lg:bg-blink-black-2 laptop-lg:py-4 drop-shadow-2xl rounded-2xl ">

							<div className="custom-scroll justify-center h-screen overflow-y-auto laptop-lg:py-4 ">
									
									<Profile />

									<div className=" px-2 laptop-lg:px-6">
							
										<div className="stories h-32 flex my-auto overflow-x-auto scroll-smooth ">
											
											<StoryHighlights />
										
										</div>

									</div>

									

									<UserPosts />

								</div>

							</div>

						</div>
					</>
			}
		</>
	)
}

export default UserProfile;