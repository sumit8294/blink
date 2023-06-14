import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Followers = ({type,setShowFollowers}) =>{

	//***************
	//************
	//optimization needed because userProfile component call unneccessarily
	//************
	//***********

	const loggedUserId = '646e21671b4dc70af49f494d';

	const [followers, setFollowers] = useState([]);

	const [listType, setListType] = useState("");

	const fetchFollowerOrFollowing = async () =>{

		try{
			if(type === 'followers'){
				const response = await axios.get(`http://localhost:5000/followers/followers/${loggedUserId}`);
				if(response.data){
					
					setListType("Followers");
					setFollowers(response.data);
				}
			}
			else if(type === 'followings'){
				const response = await axios.get(`http://localhost:5000/followers/following/${loggedUserId}`);
				if(response.data){
					
					setListType("Followings");
					setFollowers(response.data);
				}
			}
			else{
				console.log("wrong follower type");
			}

			

		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log(error.response.data.message);
			}
		}
	}

	useEffect(()=>{
		fetchFollowerOrFollowing();
	},[])
	

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

					?
					<>
						<div className="absolute top-20 w-full h-screen rounded-2xl bg-blink-black-2 mt-2 px-2 text-white">
							
							<div className="flex relative">

								<button className="absolute left-0 top-4 text-xl">
									<FontAwesomeIcon icon={faCircleLeft} onClick={()=>setShowFollowers("")}/>
								</button>

								<div className="text-center w-full h-14 font-bold py-4 px-2 border-b border-blink-black-3">
									{listType}
								</div>
							</div>

							<div className="">

								<ul>
									{ followers && followers.map((followerItem,index)=>{

										let userId = followerItem.follower._id || followerItem.user._id;
										return (

											<Link to={`/profile/${userId}`}>

												<li className="flex " key={index} onClick={()=>setShowFollowers("")}>

													<div className=" my-2 rounded-full w-10 h-10 overflow-hidden">

														{followerItem.follower && followerItem.follower.profile && <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={followerItem.follower.profile} alt="user-profile" />}

														{followerItem.user && followerItem.user.profile &&<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={ followerItem.user.profile} alt="user-profile" />}

													</div>

													<div className="flex-grow px-4 py-4 font-semibold">

														{followerItem.follower && followerItem.follower.username}
														{followerItem.user && followerItem.user.username}

													</div>

													<div className="flex item-center">
														<button className="my-auto bg-blink-gradient-1 px-2 text-sm rounded">
															Follow
														</button>
													</div>

												</li>

											</Link>
										)
									})
										
									}

								</ul>

							</div>

						</div>
					</>

					:

					<>
						

						<div className="w-5/12 rounded-2xl bg-blink-black-2 mt-2 px-2 text-white">
							
							<div className="flex relative">

								<button className="absolute left-0 top-4 text-xl">
									<FontAwesomeIcon icon={faCircleLeft} onClick={()=>setShowFollowers("")}/>
								</button>

								<div className="text-center w-full h-14 font-bold py-4 px-2 border-b border-blink-black-3">
									{listType}
								</div>
							</div>

							<div className="">

								<ul>
									{ followers && followers.map((followerItem,index)=>{

										let userId = followerItem.follower._id || followerItem.user._id;
										return (

											<Link to={`/profile/${userId}`}>

												<li className="flex " key={index}>

													<div className=" my-2 rounded-full w-10 h-10 overflow-hidden">

														{followerItem.follower && followerItem.follower.profile && <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={followerItem.follower.profile} alt="user-profile" />}

														{followerItem.user && followerItem.user.profile &&<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={ followerItem.user.profile} alt="user-profile" />}

													</div>

													<div className="flex-grow px-4 py-4 font-semibold">

														{followerItem.follower && followerItem.follower.username}
														{followerItem.user && followerItem.user.username}

													</div>

													<div className="flex item-center">
														<button className="my-auto bg-blink-gradient-1 px-2 text-sm rounded">
															Follow
														</button>
													</div>

												</li>

											</Link>
										)
									})
										
									}

								</ul>

							</div>

						</div>
					</>
			}
		</>
	)
}

export default Followers;