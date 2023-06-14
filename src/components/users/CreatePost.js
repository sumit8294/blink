import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


const CreatePost = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

				?
					<>

						<div className="w-full text-white h-screen overflow-hidden">
							
							<div className=" px-4 justify-center bg-blink-black-1 rounded-2xl h-[97vh] overflow-y-auto  ">

								<div className="">

									<div className="setting-head border-b border-blink-black-2">

										<button className="duration-100 border-b-4 border-blink-black-1 text-xl font-semibold py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1">Post</button>

										<button className="duration-100 text-xl font-semibold py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1">Story</button>

										<button className="duration-100 text-xl font-semibold py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1">Reel</button>

									</div>

									<form action="">

										<div className="mb-20">

											<div className="py-2">
												<div className="pb-4 bg-blink-black-2 h-[22rem] rounded-2xl flex justify-center items-center" >		

													<label className="mx-auto text-blink-black-1 h-56 w-44 my-auto px-3 cursor-pointer" htmlFor="profile-input">
														<span className=" text-[9rem] text-center rounded-full ">
															<FontAwesomeIcon icon={faCirclePlus} />
														</span>
													</label>

													<input type="file" id="profile-input" style={{ display: 'none' }} />

												</div>
											</div>

											<div className="">								

												<div className="setting-body py-3">

													<div className="mb-2">

														<label className=" block w-1/12 py-2 px-2">Caption</label>

														<textarea className="w-full bg-blink-black-2 rounded-xl px-3 py-2" type="text" name="" id="" cols="30" rows="4"></textarea> 

													</div>

													<div className="">

														<label className="block w-1/12 py-2 px-2">Bio</label>

														<input className="w-full bg-blink-black-2 rounded-xl px-3 py-2" type="text" />

													</div>

													<div className="mt-10">

														<button className="w-full bg-blink-gradient-1 font-bold rounded-xl px-3 py-2" type="submit" >Upload</button>

													</div>

												</div>	

											</div>

										</div>
								
									</form>

								</div>

							</div>

						</div>

					</>
				:

					<>

						<div className="w-full text-white  ">

						<div className="w-[98%] mx-3 my-2  h-screen overflow-hidden bg-blink-black-2 drop-shadow-xl rounded-2xl py-4 ">
							
							<div className="right-container mx-6 px-4 justify-center bg-blink-black-1 rounded-2xl h-[97vh] overflow-y-auto  ">

								<div className="">

									<div className="setting-head border-b border-blink-black-2">

										<button className="duration-100 border-b-4 border-blink-black-1 text-xl font-semibold py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1">Post</button>

										<button className="duration-100 text-xl font-semibold py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1">Story</button>

										<button className="duration-100 text-xl font-semibold py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1">Reel</button>

									</div>

									<form action="">

										<div className="flex">

											<div className="w-1/2 p-5">
												<div className="pb-4 w-11/12 bg-blink-black-2 h-[22rem] rounded-2xl flex justify-center items-center" >		

													<label className="mx-auto text-blink-black-1 h-56 w-44 my-auto px-3 cursor-pointer" htmlFor="profile-input">
														<span className=" text-[9rem] text-center rounded-full ">
															<FontAwesomeIcon icon={faCirclePlus} />
														</span>
													</label>

													<input type="file" id="profile-input" style={{ display: 'none' }} />

												</div>
											</div>

											<div className="w-1/2">								

												<div className="setting-body px-3 py-3">

													<div className="mb-4">

														<label className=" block w-1/12 py-2 px-2">Caption</label>

														<textarea className="w-full bg-blink-black-2 rounded-xl px-3 py-2" type="text" name="" id="" cols="30" rows="4"></textarea> 

													</div>

													<div className="">

														<label className="block w-1/12 py-2 px-2">Bio</label>

														<input className="w-full bg-blink-black-2 rounded-xl px-3 py-2" type="text" />

													</div>

													<div className="mt-16">

														<button className="w-full bg-blink-gradient-1 font-bold rounded-xl px-3 py-2" type="submit" >Upload</button>

													</div>

												</div>	

											</div>

										</div>
								
									</form>

								</div>

							</div>

						</div>
						
					</div>

					</>

			}


		</>

	)
}

export default CreatePost;