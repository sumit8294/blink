

import FeedPostHeader from './FeedPostHeader';
import FeedPostActions from './FeedPostActions';
import FeedPostLikes from './FeedPostLikes';
import FeedPostComments from './FeedPostComments';



const FeedPostItems = ({user}) =>{
	return (
		<>
			<div className="post relative w-4/5 mx-auto rounded-xl mb-6" >

				<FeedPostHeader user={user}/>

				<div className="post-image rounded-xl text-center overflow-hidden" >

					<img className="rounded-xl w-full"  src={user.imageUrl} alt="images" />

				</div>

				<FeedPostActions user={user} />

				<FeedPostLikes user={user} />

				<FeedPostComments user={user} />

				
			</div>
		</>
	)
}

export default FeedPostItems;