import { useMediaQuery } from 'react-responsive'
import {mobileMediaQuery} from '../../ReactResponsiveQueries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { createPost, getCreatePostStatus } from '../../reducers/posts/postSlice'
import { createReel, getCreateReelStatus } from '../../reducers/reels/reelSlice'
import { createStory,getCreateStoryStatus} from '../../reducers/storySlice'

import useAuth from '../../hooks/useAuth'
import { getSignature, uploadToCloud } from '../../cloud.js'
import axios from 'axios'
import { baseApi } from '../../config.js'


const CreatePost = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery)
	const {userId,token} = useAuth()
	const dispatch = useDispatch();

	const [createType,setCreateType] = useState('post') // 'post' | 'story' | 'reel'
	const [caption,setCaption] = useState('');
	const [title,setTitle] = useState('');

	const [error,setError] = useState(null);

	const [selectedFile,setSelectedFile] = useState(null)
	const [previewImage,setPreviewImage] = useState(null)

	const [previewVideo,setPreviewVideo] = useState(null)

	const createPostStatus = useSelector(getCreatePostStatus)
	const createReelStatus = useSelector(getCreateReelStatus)
	const createStoryStatus = useSelector(getCreateStoryStatus)
	
	const [uploading,setUploading] = useState(false)
	const [successAlert,setSuccessAlert] = useState(false)

	useEffect(()=>{
		if(createReelStatus === 'succeeded'){
			setSuccessAlert(true)
			setTimeout(()=>{
				setPreviewVideo(null)
				setSelectedFile(null)
				setTitle('')
				setSuccessAlert(false)
			},3000)
			
		}else if(createPostStatus === 'succeeded' || createStoryStatus=== 'succeeded'){
			setSuccessAlert(true)
			setTimeout(()=>{
				setPreviewImage(null)
				setSelectedFile(null)
				setCaption('')
				setSuccessAlert(false)
			},3000)
		}
	},[createPostStatus,createReelStatus,createStoryStatus])



	const handleUpload = async (e) =>{
		e.preventDefault();
		let body = {};

		if(createType === 'post' || createType === 'story'){

			if(caption === '' || selectedFile === null){
				setError('All fields are require')
				setTimeout(()=>{
					setError(null)
				},2000)
				return;
			}
			setUploading(true)
			const {timestamp,signature} = await getSignature();

			const uploadedPostData = await uploadToCloud(timestamp,signature)

			const {public_id, secure_url, format, version, signature:cloudSignature, created_at} = uploadedPostData;

			body = {
				public_id,
				version,
				signature:cloudSignature,
				image:`${public_id}.${format}`,
				secure_url,
				userId,
				caption,
			}

			if(createType === 'post'){
				dispatch(createPost({userId,body,token}))
			}
			else{
				dispatch(createStory({userId,body,token}))
			}

			setUploading(false)
		}

		else if(createType === 'reel'){

			if(title === '' || selectedFile === null){
				setError('All fields are require')
				setTimeout(()=>{
					setError(null)
				},2000)
				return;
			}
			setUploading(true)
			const {timestamp,signature} = await getSignature();

			const uploadedPostData = await uploadToCloud(timestamp,signature)

			const {public_id, secure_url, format, version, signature:cloudSignature, created_at} = uploadedPostData;

			body = {
				public_id,
				version,
				signature:cloudSignature,
				video:`${public_id}.${format}`,
				secure_url,
				userId,
				title,
			}

			dispatch(createReel({userId,body,token}))
			setUploading(false)
		}

	}

	

	const handleFileChange = (event) =>{
		const file = event.target.files[0];

		if (file) {
			setSelectedFile(file);

			const reader = new FileReader();

			
			reader.onloadend = () => {
				if(createType === 'post' || createType === 'story'){
					setPreviewImage(reader.result)
				}
				else{
					setPreviewVideo(reader.result)
					// console.log(reelPreviewRef)
					// reelPreviewRef.play()
					// .then(success=>{})
					// .catch(err=>{})
				}
			}
			reader.readAsDataURL(file);
		}
		
	}

	const handleReset = (event) =>{
		setSelectedFile(null)
		if(createType === 'reel'){
			setPreviewVideo(null)
		}else{

			setPreviewImage(null)
		}
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
	const loadingBarRef = useRef(null);

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
			    onUploadProgress: function (progressEvent) {
			      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			      loadingBarRef.current.style.width = `${percentage}%`;
			    }
			})
			
			return cloudinaryResponse.data;
		}
		catch(error){
			console.log("failed to cloud upload",error);
			return;
		}

	}


	return (
		<>
			
			<div className="w-full text-white">

				<div className="w-[98%] mx-3 my-2  h-screen overflow-hidden bg-blink-black-2 drop-shadow-xl rounded-2xl tablet-md:py-4">
					
					<div className="right-container tablet-md:mx-6 px-4 justify-center bg-blink-black-1 rounded-2xl h-[97vh] overflow-y-auto">

						<div className="">

							<div className="setting-head border-b border-blink-black-2 text-xl font-semibold">

								<button className={
									"py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1 "+(createType === 'post' ? "border-b-4 border-blink-blue-1 text-blink-blue-1" : "")}
									onClick={()=>setCreateType('post')}
								>Post</button>

								<button className={
									"py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1 "+(createType === 'story' ? "border-b-4 border-blink-blue-1 text-blink-blue-1" : "")}
									onClick={()=>setCreateType('story')}
								>Story</button>

								<button className={
									"py-3 px-5 hover:text-blink-blue-1 hover:border-b-4 hover:border-blink-blue-1 "+(createType === 'reel' ? "border-b-4 border-blink-blue-1 text-blink-blue-1" : "")}
									onClick={()=>setCreateType('reel')}
								>Reel</button>

							</div>
							
							{successAlert && <div className="bg-blue-200 border border-blink-blue-1 text-[18px] font-bold text-blink-black-1 px-2 py-2 w-full">
								{createType} uploaded successfully
							</div>}

							<form onSubmit={handleUpload}>

								{(createType === 'post' || createType === 'story')
								?
								<div className="tablet-md:flex">
									
									<div className="tablet-md:w-1/2 p-5">
										{previewImage
											?

												<div className="">
													<img className="w-full h-full" src={previewImage} alt="Post preview" />
													<button 
														onClick={handleReset}
														className="px-2 my-2 rounded float-right bg-blink-red-1"
													>Reset Image</button>
												</div>
											:
											<div className="pb-4 tablet-md:w-11/12 bg-blink-black-2 h-[22rem] rounded-2xl flex justify-center items-center" >		

												<label className="mx-auto text-blink-black-1 h-56 w-44 my-auto px-3 cursor-pointer" htmlFor="profile-input">
													<span className=" text-[9rem] text-center rounded-full ">
														<FontAwesomeIcon icon={faCirclePlus} />
													</span>
												</label>

												<input 
													type="file"
													id="profile-input"
													style={{ display: 'none' }}
													onChange={handleFileChange}
												 />

											</div>
										}

									</div>

																

									<div className="tablet-md:w-1/2 px-3 py-3 tablet-md:mb-0 mb-16">
									
										<div className="mb-4">

											<label className="block w-1/12 py-2 px-2" >Caption</label>

											<textarea 
												className="w-full bg-blink-black-2 outline outline-blink-blue-1 rounded-xl px-3 py-2" 
												value={caption} 
												onChange={(e)=>setCaption(e.target.value)}
												type="text"
												placeholder="Add a caption..."
												cols="30" 
												rows="4"
											> 
											</textarea> 

										</div>

										{!uploading && <div className="relative mt-16 h-10">

											<button className="w-full bg-blink-gradient-1 font-bold rounded-xl px-3 h-10 py-2" type="submit" ></button>
											<button className="left-0 absolute w-full font-bold rounded-xl px-3 py-2" >{!error ? "Upload" : error}</button>
										</div>}

										{uploading && <div className="w-full border-2 border-blink-blue-1 rounded-xl h-10 relative">
											<button ref={loadingBarRef} className=" font-bold loading-bar rounded-xl h-10 py-2" ></button>
											<button className="left-0 absolute w-full font-bold rounded-xl px-3 py-2" >Uploading...</button>


										</div>}

									</div>	

									

								</div>

								:

								<div className="tablet-md:flex">
									
									<div className="tablet-md:w-1/2 p-5">
										{previewVideo
											?

												<div className="">

													<video 
														className="w-[10rem] mx-auto rounded-2xl" 
														src={previewVideo} 
														accept="video/*"
														alt="Post preview" 
													/>

													<button 
														onClick={handleReset}
														className="px-2 my-2 rounded float-right bg-blink-red-1"
													>
														Reset Video
													</button>

												</div>
											:
											<div className="pb-4 tablet-md:w-11/12 bg-blink-black-2 h-[22rem] rounded-2xl flex justify-center items-center" >		

												<label className="mx-auto text-blink-black-1 h-56 w-44 my-auto px-3 cursor-pointer" htmlFor="profile-input">
													<span className=" text-[9rem] text-center rounded-full ">
														<FontAwesomeIcon icon={faCirclePlus} />
													</span>
												</label>

												<input 
													type="file"
													id="profile-input"
													style={{ display: 'none' }}
													onChange={handleFileChange}
												 />

											</div>
										}

									</div>

																

									<div className="tablet-md:w-1/2 px-3 py-3 mb-16 tablet-md:mb-0">

										<div className="mb-4">

												<label className="block w-1/12 py-2 px-2" >Title</label>

												<textarea 
													className="w-full bg-blink-black-2 outline outline-blink-blue-1 rounded-xl px-3 py-2" 
													value={title} 
													onChange={(e)=>setTitle(e.target.value)}
													type="text"
													placeholder="Add a title..."
													cols="30" 
													rows="4"
												> 
												</textarea> 

										</div>

										{!uploading && <div className=" relative mt-16 h-10">

											<button className="w-full bg-blink-gradient-1 font-bold rounded-xl px-3 h-10 py-2" type="submit" ></button>
											<button className="left-0 absolute w-full font-bold rounded-xl px-3 py-2" >{!error ? "Upload" : error}</button>
										</div>}

										{uploading && <div className="w-full border-2 border-blink-blue-1 rounded-xl h-10 relative">
											<button ref={loadingBarRef} className=" font-bold loading-bar rounded-xl h-10 py-2" ></button>
											<button className="left-0 absolute w-full font-bold rounded-xl px-3 py-2" >Uploading...</button>


										</div>}

									</div>	

									

								</div>

								
							}
							</form>



						</div>

					</div>

				</div>
				
			</div>

		</>

	)
}

export default CreatePost;