
import StoryItems from './StoryItems'

const YourStory = () =>{
	const user = {username:"Your story",profile:"./assets/images/users/zyan.jpg"};
	return (
		<>
			<StoryItems user={user}/>
		</>
	)
}

export default YourStory;