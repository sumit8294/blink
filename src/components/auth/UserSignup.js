import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


import {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Alert from '../elements/Alert';


const validationSchema = Yup.object().shape({
  email: Yup.string()
  	.email('Invalid email')
  	.required('Email is required'),
  username: Yup.string()
  	.required('Username is required')
  	.matches(/^\S*$/, 'Spaces are not allowed')
  	.min(3, 'Username contains at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});


const UserSignup = () =>{

	const [successAlert,setSuccessAlert] = useState({status:false,message:""});
	const [errorAlert,setErrorAlert] = useState({status:false,message:""});

	const handleLogin = async (values) =>{

		const body = {...values};

		try{
			const response = await axios.post('http://localhost:5000/users/',body,{withCredentials: true});
			if(response.data){
				setSuccessAlert({status:true,message:response.data.message});
			}
		}catch(error){

			
			if(error.response && error.response.status === 409){

				const errorMessage = error.response.data.message || 'Conflict with user status';

				setErrorAlert({status:true,message:errorMessage});

				setTimeout(()=>{
					setErrorAlert({status:false,message:''});
				},3000)
			}
			else{

				setErrorAlert({status:true,message:"Signup Failed!!"});
			}
			
		}

		
		setTimeout(() => {

        }, 2000);
	}


	const formik = useFormik({
		initialValues: {
		email: '',
		username: '',
		password: '',
		},
		validationSchema: validationSchema,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: handleLogin,
	});

	const {handleChange, handleSubmit, touched, errors, values} = formik;


	return (

		<>

			<div className="mx-auto tablet-sm:w-[26rem] mt-20 bg-blink-black-1 rounded-xl py-10 px-10">

				<div className="text-center px-2 mb-8 text-[3rem] laptop-sm:text-3xl font-bold text-blink-blue-1">
					<span>BLINK</span>
				</div>
				
		    	<form onSubmit={handleSubmit}>
		    		
			       {successAlert.status && <Alert type="success" message={successAlert.message}/>}
			       {errorAlert.status && <Alert type="errors" message={errorAlert.message}/>}


			       {
			       		(touched.email && errors.email) ? <Alert type="errors" message={errors.email}/>
			       	
			    		:(touched.username && errors.username) ? <Alert type="errors" message={errors.username}/>

			    		:(touched.password && errors.password) ? <Alert type="errors" message={errors.password}/>
			       
			    		: null
			       	}

			       	<div className="flex mx-auto my-4 bg-blue-100 border border-blue-300">

			       		<span className="px-4 py-2"><FontAwesomeIcon icon={faEnvelope} /></span>
						
						<input className=" py-2 px-2 w-full outline-none bg-blue-100 " type="text" id="email" name="email" placeholder="Type Your Email" value={values.email} onChange={handleChange}/>
						
		    		</div>

		    		<div className="flex mx-auto my-4 bg-blue-100 border border-blue-300">

			       		<span className="px-4 py-2"><FontAwesomeIcon icon={faUser} /></span>
						
						<input className=" py-2 px-2 w-full outline-none bg-blue-100 " type="text" id="username" name="username" placeholder="Type Your Username" value={values.username} onChange={handleChange}/>
						
		    		</div>

		    		<div className="flex mx-auto mb-4 bg-blue-100 border border-blue-300">
						
		    			<span className="px-4 py-2 "><FontAwesomeIcon icon={faKey} /></span>

						<input className="py-2 px-2 w-full w-3/4 outline-none bg-blue-100" type="text" id="password" name="password" placeholder="Type Your Password" value={values.password} onChange={handleChange}/>
						
		    		</div>
			        

		        	<button className="bg-blink-gradient-1 text-blink-black-1 text-xl font-bold w-full block py-2 px-2 my-10" type="submit" >Signup</button>
		        	
		    	</form>

		    	<span className="text-blue-100">
		    		Already Have An Account? - 
		    		<Link to="/login">
		    			<span className="text-blink-blue-1 font-semibold"> Login Here</span>
		    		</Link>
		    	</span>

			</div>
			     
		</>
	)
}

export default UserSignup;