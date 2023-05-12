
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
			<div className=" mr-2 ml-1 my-2 bg-blink-black-2 rounded-2xl">

				<div className="suggestion-head py-3 px-3 text-sm flex justify-between">

					<h3 className="poppins text-blink-gray-1 font-semibold mt-2">Suggested for you</h3>

					<button className="text-blink-blue-1" >see all</button>

				</div>

				{users.map((user,index)=>{

					return <SuggestionItem key={index} user={user}/>

				})}

			</div>

		</>

	)

}

export default UserSuggestions;