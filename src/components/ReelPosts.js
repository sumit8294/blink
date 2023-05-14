import ReelPostItems from './ReelPostItems';
import { useEffect} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const reels = [
	{name:"Niall",videoUrl:"./assets/videos/video1.mp4",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"KaranAujla",videoUrl:"./assets/videos/video2.mp4",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"badshah",videoUrl:"./assets/videos/video4.mp4",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",videoUrl:"./assets/videos/video5.mp4",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",videoUrl:"./assets/videos/video6.mp4",imageUrl:"./assets/images/users/louis.jpg"},
]

const ReelPosts = ({scrollableDivRef,pre,setReelsLength}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	useEffect(()=>{

		setReelsLength(reels.length);

	},[]);
	

	return (

		<>
			{isMobileOrTablet ?

				<>

					<div  ref={scrollableDivRef} className=" duration-700 reel-posts mx-auto h-screen snap-y snap-mandatory overflow-y-auto tablet-sm:w-[24rem]" >

						{reels.map((reel,index)=>{

							return <ReelPostItems pre={pre} reelId={index+''} key={index} reel={reel}/>

						})}
							
					</div>

				</>

				:

				<>
					<div  ref={scrollableDivRef} className="duration-700 reel-posts laptop-lg:py-10 laptop-lg:px-2 mx-auto laptop-lg:mb-10 h-screen snap-y snap-mandatory overflow-y-auto laptop-sm:w-[26rem] laptop-lg:w-[22rem]" >

						{reels.map((reel,index)=>{

							return <ReelPostItems pre={pre} reelId={index+''} key={index} reel={reel}/>

						})}
							
					</div>

				</>

			}

		</>

	)

}

export default ReelPosts;