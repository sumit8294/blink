import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import useAuth from '../../hooks/useAuth';


const FeedPostLikes = ({mutualLikes,likeCount}) =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const {userId:loggedInUser} = useAuth();
	return (

		<>
			{isMobileOrTablet
				?
					<>

						<div className="likes flex px-2 mobile-md:px-3 mt-1 ">
							
							{mutualLikes.map((likeItem,index)=>{
								return (

									<div key={index} className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

										<img src={likeItem.user.profile} alt="likers" />

									</div>
								)

							})}

							<span className="ml-1 text-blink-gray-1 text-[0.8rem] mobile-md:text-[0.9rem] mobile-lg:text-[1.1rem] tablet-sm:text-[0.8rem]">

								Liked by 
								{mutualLikes.find( likeItem => likeItem.user._id === loggedInUser) && (<span className="font-semibold text-white"> you, </span>)}
								{" "}
								<span className=" font-semibold text-white">
									{ mutualLikes.find( likeItem => likeItem.user._id !== loggedInUser)?.user.username } 
								</span>
								{" "}
								and 
								<span className="font-bold text-white"> {likeCount-1} others.. </span>

							</span>

						</div>	

					</>
				:
				<>
					<div className="post-likers rounded justify-between">


						<div className="likes flex px-2 my-auto">
							
							{mutualLikes.map((likeItem,index)=>{
								return (

									<div key={index} className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

										<img src={likeItem.user.profile} alt="likers" />

									</div>
								)

							})}

							<span className="text-[0.950rem] ml-1 text-blink-gray-1">

								Liked by 
								{mutualLikes.find( likeItem => likeItem.user._id === loggedInUser) && (<span className="font-semibold text-white"> you, </span>)}
								{" "}
								<span className=" font-semibold text-white">
									{mutualLikes.find( likeItem => likeItem.user._id !== loggedInUser)?.user.username}
								</span>
								{" "}and 
								<span className=" font-semibold text-white"> {likeCount-1} others.. </span>

							</span>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default FeedPostLikes;