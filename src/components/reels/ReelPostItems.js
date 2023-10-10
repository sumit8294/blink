
import ReelPostActions from './ReelPostActions';
import ReelPostDiscription from './ReelPostDiscription';
import ReelPostUser from './ReelPostUser';



import React,{useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

let ReelPostItems = ({reel,reelId,reelRef}) => {

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const playVideoAgain = (e) =>{

		const video = e.target;

		if(video){
			
			video.play()
			.then(success => {})
			.catch(error => {})
		}
		
	}

	const pausePlayVideo = (e) =>{

		const video = e.target;
		if(video.paused){
			video.play();
		}
		else{
			video.pause();
		}
	}

	return (

		<>
			{isMobileOrTablet ?

				<>

					<div className="post relative snap-always snap-center tablet-sm:h-screen tablet-sm:flex tablet-sm:justify-center " >

						<div className="relative tablet-sm:h-[40rem] tablet-sm:my-auto post-image h-screen flex justify-center text-center overflow-hidden" >

							<video onClick={pausePlayVideo} ref={reelRef} width="100%" id={reelId} src={reel.videoUrl} onEnded={playVideoAgain}> video not found</video>

							<div className="absolute right-0 bottom-0 z-10 pb-10">

								<ReelPostActions reel={reel} />

							</div>

							<div className="absolute left-0 w-full py-4 px-2 bottom-0 bg-bl-grad-black-top tablet-sm:px-0 pb-20">

								<ReelPostUser user={reel.user}/>

								<ReelPostDiscription reel={reel} />

							</div>

						</div>	
						
					</div>

				</>

				:

				<>
				
					<div className="post relative snap-always snap-center flex flex-col justify-center laptop-lg:justify-start h-screen laptop-lg:py-6 laptop-lg:px-6 mx-auto laptop-lg:my-6" >

						<div className="post-image relative h-[46rem] laptop-lg:h-[32rem] flex justify-center text-center overflow-hidden rounded-2xl" >

							<video onClick={pausePlayVideo} ref={reelRef}  width="100%" id={reelId} src={reel.videoUrl} onEnded={playVideoAgain}> video not found</video>

							<div className="absolute right-0 bottom-0 z-10">

								<ReelPostActions reel={reel} />

							</div>

							<div className="absolute left-0 w-full py-4 px-2 bottom-0 bg-bl-grad-black-top tablet-sm:px-0">

								<ReelPostUser user={reel.user}/>

								<ReelPostDiscription reel={reel} />

							</div>

						</div>
						
					</div>

				</>
			}
		</>
	)
}
ReelPostItems = React.memo(ReelPostItems);
export default ReelPostItems