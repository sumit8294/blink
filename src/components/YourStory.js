
import StoryItems from './StoryItems'

const YourStory = () =>{
	const user = {name:"Your story",imageUrl:"./assets/images/users/sumit.jpg"};
	return (
		<>
			<StoryItems user={user}/>
		</>
	)
}

export default YourStory;