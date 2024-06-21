import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import Loading from '../elements/Loading'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {DialogContext} from '../../store/DialogContext'
import {useSelector,useDispatch} from 'react-redux'
import { 
	selectAllFollowers,
	selectAllFollowings,
	selectListType,
	selectListStatus,
	getFollowers,
	getFollowings,
	followUser,
	unfollowUser,
	resetList
} from '../../reducers/followerSlice'

const Followers = () =>{

	//***************
	//************
	//optimization needed because userProfile component call unneccessarily
	//************
	//***********
	const {setfollowersVisibility} = useContext(DialogContext);

	const {userId: loggedUserId, token} = useAuth()

	const {userId} = useParams();

	const dispatch = useDispatch()
	const followers = useSelector(selectAllFollowers)
	const followings = useSelector(selectAllFollowings)
	const listType = useSelector(selectListType)
	const listStatus = useSelector(selectListStatus)

	let displayList
	if(listType === 'followers'){
		displayList = followers
	}else if(listType === 'followings'){
		displayList = followings
	}

	const fetchFollowerOrFollowing = () =>{

		try{
			if(listType === 'followers'){
				dispatch(resetList('followers'))	
				dispatch(getFollowers({loggedUserId,userId,token}))
			}
			else if(listType === 'followings'){
				dispatch(resetList('followings'))
				dispatch(getFollowings({loggedUserId,userId,token}))
				
			}
		}
		catch(error){
			console.log(error.response.data.message);
		}
	}

	const handleFollow = (event,isFollowing,toUserId) =>{
		event.preventDefault()
		event.stopPropagation()
		if(isFollowing){	
			dispatch(unfollowUser({userId:toUserId,loggedUserId,token}))
		}else{
			dispatch(followUser({userId:toUserId,loggedUserId,token}))
		}
	}

	useEffect(()=>{
		fetchFollowerOrFollowing();
	},[listType])
	

	return (
		<>

			<div className="w-5/12 rounded-2xl bg-blink-black-2 mt-2 px-2 text-white">
				
				<div className="flex relative">

					<button className="absolute left-0 top-4 text-xl">
						<FontAwesomeIcon icon={faCircleLeft} onClick={()=>setfollowersVisibility(false)}/>
					</button>

					<div className="text-center w-full h-14 font-bold py-4 px-2 border-b border-blink-black-3">
						{listType}
					</div>
				</div>

				<div className="">

					<ul>
						{ displayList?.length > 0 && displayList.map((listItem,index)=>{

							let user = listItem.follower || listItem.user;
							return (

								<Link key={index} onClick={()=>setfollowersVisibility(false)} to={`/profile/${user._id}`}>

									<li className="flex" key={index}>

										<div className=" my-2 rounded-full w-10 h-10 overflow-hidden">


											{user && user.profile
												? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={ user.profile} alt="user-profile" />

												: <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="user-profile"/>
											}

										</div>

										<div className="flex-grow px-4 py-4 font-semibold">

											{user && (user._id !== loggedUserId ? user.username : "You")}

										</div>

										<div className="flex item-center">
											{user._id !== loggedUserId && <button onClick={(e)=>handleFollow(e,listItem.isFollowing,user._id)} className="my-auto bg-blink-gradient-1 px-2 text-sm rounded">
												{listItem.isFollowing ? "following" : "follow"}
											</button>}
										</div>

									</li>

								</Link>
							)
						})
							
						}

					</ul>

					{listStatus === 'loading' && <Loading size={"40px"}/>}

				</div>

			</div>
					
		</>
	)
}

export default Followers;