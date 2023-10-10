

import FeedPostHeader from './FeedPostHeader';
import FeedPostActions from './FeedPostActions';
import FeedPostLikes from './FeedPostLikes';
import FeedPostComments from './FeedPostComments';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import React from 'react';


let FeedPostItems = ({post}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet 
				?
				<>
					<div className="post relative bg-blink-black-1 snap-always snap-center" >

						<FeedPostHeader post={post}/>

						<div className="post-image px-2 text-center overflow-hidden" >

							<img className="w-full rounded-xl"  src={post.imageUrl} alt="images" />

						</div>

						<FeedPostActions post={post} />

						{post.mutualLikes.length > 0 && <FeedPostLikes mutualLikes={post.mutualLikes} likeCount={post.reactions.likes}/>}

						<FeedPostComments post={post} />
	
					</div>

				</>
				:
				<>
					<div className="post snap-always snap-center relative mb-6 laptop-lg:bg-blink-black-1 laptop-lg:px-4 laptop-lg:border laptop-lg:border-blink-black-3" >

						<FeedPostHeader post={post}/>

						<div className="post-image rounded-xl text-center overflow-hidden" >

							<img className="rounded-xl w-full"  src={post.imageUrl} alt="images" />

						</div>

						<FeedPostActions post={post} />

						{post.mutualLikes.length > 0 && <FeedPostLikes mutualLikes={post.mutualLikes} likeCount={post.reactions.likes}/>}

						<FeedPostComments post={post} />

						
					</div>
				</>
			}
		</>
	)
}

FeedPostItems = React.memo(FeedPostItems)
export default FeedPostItems;