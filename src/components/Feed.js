import Stories from './Stories';
import FeedPosts from './FeedPosts';
import UserSuggestions from './UserSuggestions';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';


const Feed = () =>{
	
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet ?
				<> 
					<div className="mobile text-white justify-center bg-blink-black-1 h-screen overflow-y-auto tablet-sm:px-3 tablet-md:px-6">

						<Stories />

						<FeedPosts />

					</div>
				</>
				:
				<> 
					<div className="h-screen text-white bg-blink-black-1 laptop-lg:inline-grid">

						<div className=" mx-2 my-2 overflow-hidden laptop-lg:bg-blink-black-2 laptop-lg:py-4 drop-shadow-2xl rounded-2xl ">

							<div className="feeds-container justify-center h-screen overflow-y-auto laptop-lg:py-4 ">

								<Stories />

								<FeedPosts />

							</div>

						</div>
						
					</div>

					<div className="hidden w-[19.5rem] laptop-xl:block shrink-0">

						<UserSuggestions />

					</div>

				</>
			}

		</>
	)
}

export default Feed;