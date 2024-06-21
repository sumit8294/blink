
import Search from '../elements/Search';

import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import useAuth from '../../hooks/useAuth'
import { updateSettings, selectUserSettings, getSettings, selectGetSettingsStatus } from '../../reducers/userSettingSlice'

import axios from 'axios'
import {baseApi} from '../../config'
import { userLogout } from '../../reducers/authSlice';



const Settings = () =>{

	const {userId,token} = useAuth()

	const userSettings = useSelector(selectUserSettings)
	const status = useSelector(selectGetSettingsStatus)


	const [name,setName] = useState("");
	const [bio,setBio] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const dispatch = useDispatch();

	const [preview, setPreview] = useState(null);

	const handleFileInput = (event) =>{
		const file = event.target.files[0]
		setSelectedFile(event.target.files[0]);
		
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
			  setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		  } else {
			setPreview(null);
		}
	}

	const saveUpdates = async () =>{
		let body = {
			name,
			bio,
			fileUrl:""
		}

		const {timestamp,signature} = await getSignature();

		if(selectedFile){
			const uploadedPostData = await uploadToCloud(timestamp,signature)

			const {public_id, secure_url, format, version, signature:cloudSignature, created_at} = uploadedPostData;

			body = {
				name,
				bio,
				fileUrl:secure_url
			}
		}else{
			body = {
				name,
				bio,
				fileUrl:userSettings.profile
			}
		}
	
		dispatch(updateSettings({userId,body,token}))

	}

	
	
	const getSignature = async () =>{
		try{
			const response = await axios.get(
				`${baseApi}/cloudinary/get-signature`,
				{
					withCredentials:true,
					headers:{
						'Authorization': `Bearer ${token}`
					}
				}
			)
			return response.data;
		}
		catch(error){
			console.log("failed to get signature",error);
		}
	}
	const uploadToCloud = async (timestamp,signature) =>{
		try{

			const response = await axios.get(
				`${baseApi}/cloudinary/get-cloud`,
				{
					withCredentials:true,
					headers:{
						'Authorization': `Bearer ${token}`
					}
				}
			)
			const {cloud_name, api_key} = response.data
			const data = new FormData()
			data.append("file", selectedFile)
			data.append("api_key", api_key)
			data.append("signature", signature)
			data.append("timestamp", timestamp)

			
			const cloudinaryResponse = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
				data, 
				{
			    headers: { "Content-Type": "multipart/form-data" },
			    
			})
			
			return cloudinaryResponse.data;
		}
		catch(error){
			console.log("failed to cloud upload",error);
			return;
		}

	}
	const handleLogout = async () =>{

		await dispatch(userLogout());
		window.location.reload();

	}
	
	useEffect(()=>{
		
		if (!userSettings) return;
		dispatch(getSettings({userId,token}))
		setBio(userSettings.bio);
		setName(userSettings.username)
		setPreview(userSettings.profile)
	},[userSettings])

	useEffect(()=>{
		if(status !== 'updated') return;
		setTimeout(()=>{
			handleLogout()
		},3000)
	},[status])

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

									{status === 'updated' && <div className="bg-blue-200 border border-blink-blue-1 text-[18px] font-bold text-blink-black-1 px-2 py-2 w-full">
								Details Updated successfully || you need to login again
							</div>}

									<div className="setting-body px-3 py-3"> 

										
										<div className="flex pb-4">	

											<div className="rounded-full w-16 h-16 overflow-hidden ">
												{preview 
												
													? 
													<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={preview} alt="profile"/>
													: 
													<img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
												}
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

										<div className=" ">

											<button className="w-full bg-blink-blue-1 rounded-[6px] my-4 px-3 py-2" onClick={saveUpdates}>Save Updates</button>

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

									{status === 'updated' && <div className="bg-blue-200 border border-blink-blue-1 text-[18px] font-bold text-blink-black-1 px-2 py-2 w-full">
								Details Updated successfully || you need to login again
							</div>}

									<div className="setting-body px-3 py-3"> 

										
										<div className="flex pb-4">

											<div className="rounded-full w-16 h-16 overflow-hidden ">
												{preview 
												
													? 
													<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={preview} alt="profile"/>
													: 
													<img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
												}
											</div>			

											<label className="text-blink-blue-1 my-auto px-3 cursor-pointer" htmlFor="profile-input">Change Profile</label>

											<input type="file" id="profile-input" onChange={handleFileInput} style={{ display: 'none' }} />

										</div>

										<div className="flex pb-4">

											<span className="w-1/12 py-2 px-2">Name</span>

											<input className=" bg-blink-black-2 rounded-xl px-3 " type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

										</div>

										<div className="flex ">

											<span className="w-1/12 py-2 px-2">Bio</span>

											<input className="w-8/12 bg-blink-black-2 rounded-xl px-3 " type="text" value={bio} onChange={(e)=>setBio(e.target.value)}/>

										</div>

										<div className=" ">

											<button className="w-full bg-blink-blue-1 rounded-[6px] my-4 px-3 py-2" onClick={saveUpdates}>Save Updates</button>

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

export default Settings;