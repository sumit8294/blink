import StoryItems from './StoryItems'
const users = [
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"moosewala",imageUrl:"./assets/images/users/sidhumoosewala.jpg"},
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"niall",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg"},
	{name:"ronaldo",imageUrl:"./assets/images/users/ronaldo.jpg"},

]
const OtherStory = () =>{
	return (
		<>
			{users.map((user,index)=>{
				return(
				<div key={index} className="flex">
					<StoryItems user={user}/>
				</div>
				)
			})}
		</>
	)
}

export default OtherStory;