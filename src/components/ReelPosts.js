import ReelPostItems from './ReelPostItems';
import {useRef} from 'react';



const reels = [
	{name:"Niall",videoUrl:"./assets/videos/video1.mp4",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"KaranAujla",videoUrl:"./assets/videos/video2.mp4",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"Sidhumoosewala",videoUrl:"./assets/videos/video3.mp4",imageUrl:"./assets/images/users/sidhumoosewala.jpg"},
	{name:"badshah",videoUrl:"./assets/videos/video4.mp4",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",videoUrl:"./assets/videos/video5.mp4",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",videoUrl:"./assets/videos/video6.mp4",imageUrl:"./assets/images/users/louis.jpg"},

]

const ReelPosts = ({scrollableDivRef,pre}) =>{

	return (

		<>

			<div className=" px-2 ">

				<div  className=" ">

					<div  ref={scrollableDivRef} className=" duration-700 reel-posts posts-container py-10 px-2 mx-auto mb-10 h-screen snap-y snap-mandatory overflow-y-auto" >

						{reels.map((reel,index)=>{

							return <ReelPostItems pre={pre} reelId={index+''} key={index} reel={reel}/>

						})}
					
					</div>

				</div>


			</div>

		</>

	)

}

export default ReelPosts;