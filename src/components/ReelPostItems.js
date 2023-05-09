
import FeedPostHeader from './FeedPostHeader';
import FeedPostActions from './FeedPostActions';
import FeedPostLikes from './FeedPostLikes';



const ReelPostItems = ({user}) =>{

	return (

		<>
			<div className="post relative snap-always snap-center py-6 px-6 bg-blink-black-1 rounded-xl mx-auto rounded-xl my-6" >

				<FeedPostHeader user={user}/>

				<div className="post-image h-[60vh] flex flex-col justify-center text-center overflow-hidden" >

					<iframe width="100%" height="100%" src={user.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

				</div>

				<FeedPostActions user={user} />

				<FeedPostLikes user={user} />

				
			</div>
		</>
	)
}

export default ReelPostItems;