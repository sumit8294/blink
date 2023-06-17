
import StoryItems from './StoryItems'
import useAuth from '../../hooks/useAuth';

const YourStory = () =>{
	const loggedInUser = useAuth();
	const {userId,username,profile} = loggedInUser;
	const user = {_id:userId,username,profile};

	return (
		<>
			<StoryItems user={user} loggedInUserId={userId}/>
		</>
	)
}

export default YourStory;