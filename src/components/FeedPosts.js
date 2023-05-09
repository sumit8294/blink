import FeedPostItems from './FeedPostItems';
import UserSuggestions from './UserSuggestions';

const users = [
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},

]

const FeedPosts = () =>{
	return (
		<>
			<div className=" px-2 ">

				{/*{<div className="Feed-header flex h-12 ">

					<h3 className="poppins text-2xl font-bold py-2">Feed</h3>

				</div>}*/}

				<div className="flex justify-between">

					<div className="posts-container w-1/2 py-2 px-2 mx-auto " >

						{users.map((user,i)=>{

							return <FeedPostItems key={i} user={user}/>

						})}
					
					</div>

					<UserSuggestions />

				</div>


			</div>

		</>

	)

}

export default FeedPosts;