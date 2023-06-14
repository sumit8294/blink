import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


const UserDetail = ({setShowFollowers}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const [userDetail,setUserDetail] = useState([]);

	const {userId} = useParams();

	const fetchUserDetail = async () =>{

		try{
			const response = await axios.get(`http://localhost:5000/users/${userId}`);

			if(response.data){
				
				setUserDetail(response.data);
			}
		}
		catch(error){
			if(error.response && error.response.status === 404){
				console.log(error.response.message);
			}
			else{
				console.log("user detail not fetched");
			}
		}
	}

	useEffect(()=>{
		fetchUserDetail();
	},[userId])


	return (
		<>
			{isMobileOrTablet 
				?
				<>

					<div className=" mb-5 ">
					
						<div className="flex py-2 px-4 mobile-lg:py-5 mobile-lg:px-5" >

							<div className=" rounded-full shrink-0 w-16 h-16 overflow-hidden mobile-md:w-20 mobile-md:h-20 mobile-lg:w-24 mobile-lg:h-24 tablet-sm:w-28 tablet-sm:h-28">
								
								<img src={userDetail.profile} alt="profile"/>
							
							</div>
							
							<div className="profile-actions text-[1.1rem] w-full py-2 ml-4 flex justify-between text-center mobile-md:text-[1.2rem] mobile-md:py-4 mobile-lg:text-[1.6rem] mobile-lg:ml-6 tablet-sm:py-6">
								
								<div className="posts">

									<span className="  font-semibold relative ">34</span>
									<span className="block text-[0.8rem] text-blink-gray-1 ">posts</span>

								</div>

								<div className="followers" onClick={()=>setShowFollowers("followers")}>

									<span className="  font-semibold relative ">1M</span>
									<span className="block text-[0.8rem] text-blink-gray-1">followers</span>

								</div>

								<div className="following relative" onClick={()=>setShowFollowers("followings")}>

									<span className="  font-semibold relative ">80</span>
									<span className="block text-[0.8rem] text-blink-gray-1">following</span>

								</div>

							</div>

						</div>
					
						<div className="user-details px-2 mobile-md:px-4 mobile-lg:px-5">

							<div className="text-[1rem]  font-medium  mobile-lg:text-[1.2rem] tablet-sm:text-[1.3rem]">

								<span className="">{userDetail.username}</span>

							</div>

							<div className="about text-[0.9rem] text-blink-gray-1 mobile-lg:text-[1rem] tablet-sm:text-[1.1rem]">

								<span className="">{userDetail.bio}</span>

							</div>

						</div>

					</div>

				</>
				
				:

				<>
					<div className="px-5 text-white py-10 laptop-lg:py-0 laptop-lg:mb-5">

						<div className="flex py-2 px-5" >

							<div className="images-container rounded-full shrink-0  w-32 h-32 overflow-hidden outline outline-offset-[3px] outline-2 outline-blink-blue-1">
								
								<img src={userDetail.profile} alt="profile"/>
							
							</div>
							
							<div className="profile-actions text-[1.8rem] w-full mt-5 px-10 py-5 flex justify-between text-center">
								
								<div className="posts" >

									<span className="  font-semibold relative ">34</span>
									<span className="block text-sm text-blink-gray-1 ">posts</span>

								</div>

								<div className="followers" onClick={()=>setShowFollowers("followers")}>

									<span className="  font-semibold relative ">1M</span>
									<span className="block text-sm text-blink-gray-1">followers</span>

								</div>

								<div className="following relative" onClick={()=>setShowFollowers("followings")}>

									<span className="  font-semibold relative ">80</span>
									<span className="block text-sm text-blink-gray-1">following</span>

								</div>

							</div>

						</div>
					
						<div className="user-details ">

							<div className="text-2xl py-1  px-5 font-medium">

								<span className="">{userDetail.username}</span>

							</div>

							<div className="about text-[1.2rem] px-4  text-blink-gray-1">

								<span className="">{userDetail.bio}</span>

							</div>

						</div>

					</div>
				</>
			}	
		</>
	)
}

export default UserDetail;