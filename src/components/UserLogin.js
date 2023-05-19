import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'

import {useState} from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { LOGGED_IN } from '../reducers/users';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import Alert from './Alert';


const validationSchema = Yup.object().shape({
  // email: Yup.string().email('Invalid email').required('Email is required'),
  // password: Yup.string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters long'),
});


const UserLogin = () =>{

	const dispatch = useDispatch();
	const [successAlert,setSuccessAlert] = useState(false);

	const handleLogin = (values) =>{
		setSuccessAlert(true);
		setTimeout(() => {
         	dispatch(LOGGED_IN());
         	
        }, 1000);
	}


	const formik = useFormik({
	  initialValues: {
	    email: '',
	    password: '',
	  },
	  validationSchema: validationSchema,
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
		    		
			       {successAlert && <Alert type="success" message="Logged In Successfully!!"/>}
			       {touched.email && errors.email && <Alert type="errors" message={errors.email}/>}

			       	<div className="flex mx-auto my-4 bg-blue-100 border border-blue-300">

			       		<span className="px-4 py-2"><FontAwesomeIcon icon={faEnvelope} /></span>
						
						<input className=" py-2 px-2 w-full outline-none bg-blue-100 " type="text" id="email" name="email" placeholder="Type Your Email" value={values.email} onChange={handleChange}/>
						
		    		</div>

		    		<div className="flex mx-auto mb-4 bg-blue-100 border border-blue-300">
						
		    			<span className="px-4 py-2 "><FontAwesomeIcon icon={faKey} /></span>

						<input className="py-2 px-2 w-full w-3/4 outline-none bg-blue-100" type="text" id="password" name="password" placeholder="Type Your Password" value={values.password} onChange={handleChange}/>
						
		    		</div>
			        

		        	<button className="bg-blink-gradient-1 text-blink-black-1 text-xl font-bold w-full block py-2 px-2 my-10" type="submit" >Login</button>
		        	
		    	</form>

		    	<span className="text-blue-100">
		    		Don't Have An Account? - 
		    		<Link to="/signup">
		    			<span className="text-blink-blue-1 font-semibold"> Signup Here</span>
		    		</Link>
		    	</span>

			</div>
			     
		</>
	)
}

export default UserLogin;