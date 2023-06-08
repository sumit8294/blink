
import StoryItems from './StoryItems';

const users = [
	{name:"",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"",imageUrl:"./assets/images/users/para.jpg"},
	{name:"",imageUrl:"./assets/images/users/zyan.jpg"},
	{name:"",imageUrl:"./assets/images/users/ronaldo.jpg"},
	{name:"",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"",imageUrl:"./assets/images/users/harry.jpg"},

]

const StoryHighlights = () =>{

	return (
		<>
			{users.map((user,index)=>{
				return(
				
					<StoryItems key={index} user={user}/>
				
				)
			})}
		</>
	)
}

export default StoryHighlights;