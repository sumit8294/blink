import YourStory from './YourStory';
import OtherStory from './OtherStory';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const Stories = () =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet
				?
					<>
						
						<div className="stories flex px-2 tablet-sm:px-0 tablet-md:px-0 h-[80px] mobile-md:h-[100px] mobile-lg:h-[115px] overflow-x-auto scroll-smooth">
							<YourStory />
							<OtherStory />
						</div>
						
					</>
				:
					<>
						<div className=" px-2 laptop-lg:px-6">
							{/*<div className="feed-header flex h-12 ">
								<h3 className="poppins text-2xl font-bold py-2">Stories</h3>
							</div>*/}
							<div className="stories h-28 flex my-auto overflow-x-auto scroll-smooth ">
								<YourStory />
								<OtherStory />
							</div>
						</div>
					</>
			}

		</>
	)
}

export default Stories;