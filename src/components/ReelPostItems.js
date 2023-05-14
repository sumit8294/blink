
import ReelPostActions from './ReelPostActions';
import ReelPostDiscription from './ReelPostDiscription';
import ReelPostUser from './ReelPostUser';



import {useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const ReelPostItems = ({reel,reelId,pre}) => {

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

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
		
	}

	return (

		<>
			{isMobileOrTablet ?

				<>

					<div className="post relative snap-always tablet-sm:h-screen tablet-sm:flex tablet-sm:justify-center snap-center" >

						<div className="relative tablet-sm:h-[40rem] tablet-sm:my-auto post-image h-screen flex justify-center text-center overflow-hidden" >

							<video width="100%" id={reelId} src={reel.videoUrl} onEnded={playVideo}> video not found</video>

							<div className="absolute right-0 bottom-0 z-10">

								<ReelPostActions user={reel} />

							</div>

							<div className="absolute left-0 w-full py-4 px-2 bottom-0 bg-bl-grad-black-top tablet-sm:px-0">

								<ReelPostUser user={reel}/>

								<ReelPostDiscription user={reel} />

							</div>

						</div>	
						
					</div>

				</>

				:

				<>
				
					<div className="post relative snap-always snap-center flex flex-col justify-center laptop-lg:justify-start h-screen laptop-lg:py-6 laptop-lg:px-6 mx-auto laptop-lg:my-6" >

						<div className="post-image relative h-[46rem] laptop-lg:h-[32rem] flex justify-center text-center overflow-hidden rounded-2xl" >

							<video  width="100%" id={reelId} src={reel.videoUrl} onEnded={playVideo}> video not found</video>

							<div className="absolute right-0 bottom-0 z-10">

								<ReelPostActions user={reel} />

							</div>

							<div className="absolute left-0 w-full py-4 px-2 bottom-0 bg-bl-grad-black-top tablet-sm:px-0">

								<ReelPostUser user={reel}/>

								<ReelPostDiscription user={reel} />

							</div>

						</div>
						
					</div>

				</>
			}
		</>
	)
}

export default ReelPostItems;