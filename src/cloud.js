import { baseApi } from './config.js'
import axios from 'axios'

 
export const getSignature = async (token) =>{
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

export const uploadToCloud = async (timestamp,signature,file,token) =>{
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
		data.append("file", file)
		data.append("api_key", api_key)
		data.append("signature", signature)
		data.append("timestamp", timestamp)

		const cloudinaryResponse = await axios.post(
			`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
			data, 
			{
		    headers: { "Content-Type": "multipart/form-data" },
		    onUploadProgress: function (e) {
		      console.log(e.loaded / e.total)
		    }
		})

		return cloudinaryResponse.data;
	}
	catch(error){
		console.log("failed to cloud upload",error);
		return;
	}

	
}