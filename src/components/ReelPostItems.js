
import FeedPostHeader from './FeedPostHeader';
import FeedPostActions from './FeedPostActions';
import FeedPostLikes from './FeedPostLikes';

import {useEffect} from 'react';

const ReelPostItems = ({reel,reelId,pre}) => {

	useEffect(()=>{

		playVideo();
		
	},[pre])

	const playVideo = () =>{

		if(reelId === pre){
			let videoToPlay = document.getElementById(pre);
			videoToPlay.currentTime = 0;
			videoToPlay.play()
			.then(success => {})
			.catch(error => {})
		}
		console.log(pre);
	}

	return (

		<>
			<div className="post relative snap-always snap-center py-6 px-6 bg-blink-black-1 rounded-xl mx-auto rounded-xl my-6" >

				<FeedPostHeader user={reel}/>

				<div className="post-image h-[60vh] flex justify-center text-center overflow-hidden" >

					<video width="100%" id={reelId} src={reel.videoUrl} controls onEnded={playVideo}> video not found</video>

				</div>

				<FeedPostActions user={reel} />

				<FeedPostLikes user={reel} />

				
			</div>
		</>
	)
}

export default ReelPostItems;