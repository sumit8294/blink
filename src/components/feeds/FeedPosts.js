import FeedPostItems from './FeedPostItems';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';


const users = [
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg"},
]



const FeedPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	return (
		<>
			{isMobileOrTablet 

			?
				<>

					<div className="posts-container tablet-sm:w-8/12 tablet-sm:mx-auto tablet-md:w-7/12 " >

						{users.map((user,i)=>{

							return <FeedPostItems key={i} user={user}/>

						})}
					
					</div>					

				</>

			:
				<>
					<div className=" px-2 my-2">

						{/*{<div className="Feed-header flex h-12 ">

							<h3 className="poppins text-2xl font-bold py-2">Feed</h3>

						</div>}*/}

						<div className="flex justify-between">

							<div className="mx-auto w-96 laptop-lg:w-[24rem]" >

								{users.map((user,i)=>{

									return <FeedPostItems key={i} user={user}/>

								})}
							
							</div>		

						</div>

					</div>

				</>

			}

		</>

	)

}

export default FeedPosts;