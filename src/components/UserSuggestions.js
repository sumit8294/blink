import FeedPostItems from './FeedPostItems';
import SuggestionItem from './SuggestionItem';

const users = [
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"niall",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg"},
]

const UserSuggestions = () =>{
	return (
		<>
			<div className=" px-2 py-4">

				<div className="suggestion-head py-2 text-sm flex justify-between">

					<h3 className="poppins text-blink-gray-1 font-semibold py-2">Suggested for you</h3>

					<button className="text-blink-blue-1" >See All</button>

				</div>

				{users.map((user,index)=>{

					return <SuggestionItem key={index} user={user}/>

				})}

			</div>

		</>

	)

}

export default UserSuggestions;