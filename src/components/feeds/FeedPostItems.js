

import FeedPostHeader from './FeedPostHeader';
import FeedPostActions from './FeedPostActions';
import FeedPostLikes from './FeedPostLikes';
import FeedPostComments from './FeedPostComments';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';



const FeedPostItems = ({user}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet 
				?
				<>
					<div className="post relative bg-blink-black-1 " >

						<FeedPostHeader user={user}/>

						<div className="post-image px-2 text-center overflow-hidden" >

							<img className="w-full rounded-xl"  src={user.imageUrl} alt="images" />

						</div>

						<FeedPostActions user={user} />

						<FeedPostLikes user={user} />

						<FeedPostComments user={user} />
	
					</div>

				</>
				:
				<>
					<div className="post relative mb-6 laptop-lg:bg-blink-black-1 laptop-lg:px-4 laptop-lg:border laptop-lg:border-blink-black-3" >

						<FeedPostHeader user={user}/>

						<div className="post-image rounded-xl text-center overflow-hidden" >

							<img className="rounded-xl w-full"  src={user.imageUrl} alt="images" />

						</div>

						<FeedPostActions user={user} />

						<FeedPostLikes user={user} />

						<FeedPostComments user={user} />

						
					</div>
				</>
			}
		</>
	)
}

export default FeedPostItems;