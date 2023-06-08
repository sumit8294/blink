
import Search from '../elements/Search';

import {useState} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const Feed = () =>{

	const [name,setName] = useState("Zyan Malik");
	const [bio,setBio] = useState("Singer | Artist | Composer");

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet ?

				<>

					<div className="w-full text-white  ">

						<div className=" h-screen overflow-hidden bg-blink-black-1 py-4 ">

							<Search />

							<div className="px-2 justify-center bg-blink-black-1 rounded-2xl overflow-y-auto  ">

								<div className="">

									<div className="setting-head py-3  border-b border-blink-black-2">

										<span className="text-xl font-semibold">Edit Profile</span>

									</div>

									<div className="setting-body px-3 py-3"> 

										
										<div className="flex pb-4">

											<div className="rounded-full w-16 h-16 overflow-hidden ">
												<img src="./assets/images/users/zyan.jpg" alt="profile"/>
											</div>			

											<label className="text-blink-blue-1 my-auto px-3 cursor-pointer" htmlFor="profile-input">Change Profile</label>

											<input type="file" id="profile-input" style={{ display: 'none' }} />

										</div>

										<div className=" pb-4">

											<span className="block w-1/12 py-2 px-2">Name</span>

											<input className="w-full bg-blink-black-2 rounded-[6px] px-3 py-2" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

										</div>

										<div className=" ">

											<span className="block w-1/12 py-2 px-2">Bio</span>

											<input className="w-full bg-blink-black-2 rounded-[6px] px-3 py-2" type="text" value={bio} onChange={(e)=>setBio(e.target.value)}/>

										</div>

									</div>
									
								</div>

								<div className="">

									<div className="setting-head py-3  border-b border-blink-black-2">

										<span className="text-xl font-semibold">Privacy</span>

									</div>

									<div className="setting-body">
										
										

									</div>
									
								</div>

								<div className="">

									<div className="setting-head py-3  border-b border-blink-black-2">

										<span className="text-xl font-semibold">Notification</span>

									</div>	

									<div className="setting-body">
										
									</div>
									
								</div>

							</div>

						</div>
						
					</div>
				</>

				:

				<>

					<div className="w-full text-white  ">

						<div className="w-[98%] mx-3 my-2  h-screen overflow-hidden bg-blink-black-2 drop-shadow-2xl rounded-2xl py-4 ">
							<Search />
							<div className="right-container mx-6 px-4 justify-center bg-blink-black-1 rounded-2xl h-[97vh] overflow-y-auto  ">

								<div className="">

									<div className="setting-head py-3  border-b border-blink-black-2">

										<span className="text-xl font-semibold">Edit Profile</span>

									</div>

									<div className="setting-body px-3 py-3"> 

										
										<div className="flex pb-4">

											<div className="rounded-full w-16 h-16 overflow-hidden ">
												<img src="./assets/images/users/zyan.jpg" alt="profile"/>
											</div>			

											<label className="text-blink-blue-1 my-auto px-3 cursor-pointer" htmlFor="profile-input">Change Profile</label>

											<input type="file" id="profile-input" style={{ display: 'none' }} />

										</div>

										<div className="flex pb-4">

											<span className="w-1/12 py-2 px-2">Name</span>

											<input className=" bg-blink-black-2 rounded-xl px-3 " type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

										</div>

										<div className="flex ">

											<span className="w-1/12 py-2 px-2">Bio</span>

											<input className="w-8/12 bg-blink-black-2 rounded-xl px-3 " type="text" value={bio} onChange={(e)=>setBio(e.target.value)}/>

										</div>

									</div>
									
								</div>

								<div className="">

									<div className="setting-head py-3  border-b border-blink-black-2">

										<span className="text-xl font-semibold">Privacy</span>

									</div>

									<div className="setting-body">
										
										

									</div>
									
								</div>

								<div className="">

									<div className="setting-head py-3  border-b border-blink-black-2">

										<span className="text-xl font-semibold">Notification</span>

									</div>	

									<div className="setting-body">
										
									</div>
									
								</div>

							</div>

						</div>
						
					</div>

				</>

			}
		</>
	)
}

export default Feed;