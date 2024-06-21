import useAuth from '../../hooks/useAuth'
import {useDispatch} from 'react-redux'
import { 
	followUser,
	unfollowUser
} from '../../reducers/followerSlice'
import { setIsFollowingSuggesstions } from '../../reducers/userSlice'
import {Link} from 'react-router-dom'



const SuggestionItem = ({user}) =>{
	const dispatch = useDispatch()
	const {userId: loggedUserId, token} = useAuth()

	const handleFollow = (event,isFollowingStatus,toUserId) =>{
		event.preventDefault()
		event.stopPropagation()
		if(isFollowingStatus){	
			dispatch(setIsFollowingSuggesstions({userId:toUserId,status:isFollowingStatus}))
			dispatch(unfollowUser({userId:toUserId,loggedUserId,token}))
		}else{
			dispatch(setIsFollowingSuggesstions({userId:toUserId,status:isFollowingStatus}))
			dispatch(followUser({userId:toUserId,loggedUserId,token}))
		}
	}
	return (
		<>

			<Link to={`/profile/${user._id}`}>

				<li className="flex px-2" >

					<div className=" my-2 rounded-full w-10 h-10 overflow-hidden">

						{user && user.profile
							? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} className="w-full" src={ user.profile} alt="user-profile" />

							: <img className="w-full"src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="user-profile"/>
						}

					</div>

					<div className="flex-grow px-4 py-4 font-semibold">

						{user.username}

					</div>

					<div className="flex item-center">
						<button onClick={(e)=>handleFollow(e,user.isFollowing,user._id)} className="my-auto bg-blink-gradient-1 px-2 text-sm rounded">
							{user.isFollowing ? "Following" : "Follow"}
						</button>
					</div>

				</li>

			</Link>

		</>

	)

}

export default SuggestionItem;