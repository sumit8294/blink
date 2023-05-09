import ReelPostItems from './ReelPostItems';
import {useRef} from 'react';



const users = [
	{name:"Niall",videoUrl:"https://www.youtube.com/embed/z4fJ9i2yNEQ",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"Karan Aujla",videoUrl:"https://youtube.com/embed/Ecl2OJRXTog",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"Sidhu moosewala",videoUrl:"https://youtube.com/embed/WslpJ01UARY",imageUrl:"./assets/images/users/sidhumoosewala.jpg"},
	{name:"badshah",videoUrl:"https://youtube.com/embed/IfA_5Xoa4qo",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",videoUrl:"https://youtube.com/embed/CMYc8q7rqoM",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",videoUrl:"https://youtube.com/embed/8kggT2ej-lo",imageUrl:"./assets/images/users/louis.jpg"},

]

const ReelPosts = ({scrollableDivRef}) =>{

	return (

		<>

			<div className=" px-2 ">

				<div  className=" ">

					<div  ref={scrollableDivRef} className=" duration-700 reel-posts posts-container py-10 px-2 mx-auto mb-10 h-screen snap-y snap-mandatory overflow-y-auto" >

						{users.map((user,i)=>{

							return <ReelPostItems key={i} user={user}/>

						})}
					
					</div>

				</div>


			</div>

		</>

	)

}

export default ReelPosts;