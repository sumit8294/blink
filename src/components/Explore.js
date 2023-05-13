import Search from './Search';
import ExplorePosts from './ExplorePosts';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';


const Explore = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet
				?
					<>

						<div className="text-white h-screen overflow-y-auto justify-center bg-blink-black-1   ">

							<Search />

							<ExplorePosts />

						</div>

					</>
				:
					<>

						<div className="h-screen text-white w-full laptop-lg:inline-grid">

							<div className=" my-2 text-white py-4 rounded-2xl text-white laptop-lg:mx-2 laptop-lg:bg-blink-black-2">

								<div className="custom-scroll h-screen overflow-y-auto laptop-lg:px-4">

									<Search />

									<ExplorePosts />

								</div>

							</div>

						</div>

					</>
			}
		</>
	)
}

export default Explore;