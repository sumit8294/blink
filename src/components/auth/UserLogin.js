import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'


import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {userLogin,getAuthStatus, getAuthError, getAccessToken} from '../../reducers/authSlice';
import {useEffect} from 'react';

import Alert from '../elements/Alert';


const validationSchema = Yup.object().shape({
	usernameOrEmail: Yup.string().required('Enter Username or Email'),
	password: Yup.string()
	.required('Password is required')
	.min(6, 'Password must be at least 6 characters long'),
});


const UserLogin = () =>{

	const dispatch = useDispatch();
	const loginStatus = useSelector(getAuthStatus);
	const loginError = useSelector(getAuthError);
	const token = useSelector(getAccessToken);
	const navigate = useNavigate();


	const handleLogin = async (values) =>{
		
		const body = {...values}; // 'usernameOrEmail','password' --> fields require for login api
		
		await dispatch(userLogin(body));
		
		navigate('/');

	}

	const formik = useFormik({
	  initialValues: {
	    usernameOrEmail: '',
	    password: '',
	  },
	  validateOnBlur: false,
	  validateOnChange: false,
	  validationSchema: validationSchema,
	  onSubmit: handleLogin,
	});

	const {handleChange, handleSubmit, touched, errors, values} = formik;

	return (

		<>
			<div className="mx-auto tablet-sm:w-[26rem] mt-20 bg-blink-black-1 rounded-xl py-10 px-10 text-black">

				<div className="text-center px-2 mb-8 text-[3rem] laptop-sm:text-3xl font-bold text-blink-blue-1">
					<span>BLINK</span>
				</div>
				
		    	<form onSubmit={handleSubmit}>
		    		
			       {loginStatus === 'succeeded' && <Alert type="success" message={"Logged In Successfully!!"}/>}
			       {loginStatus === 'loading' && <Alert type="toaster" message={"Sending login request..."}/>}
			       {loginStatus === 'failed' && loginError && <Alert type="errors" message={loginError}/>}

			       {(touched.usernameOrEmail && errors.usernameOrEmail) ?
			       		<Alert type="errors" message={errors.usernameOrEmail}/>
			       	:
			       	(touched.password && errors.password) ?
			       		<Alert type="errors" message={errors.password}/>
			       	: null
			       }
			       	<div className="flex mx-auto my-4 bg-blue-100 border border-blue-300">

			       		<span className="px-4 py-2"><FontAwesomeIcon icon={faUser} /></span>
						
						<input className=" py-2 px-2 w-full outline-none bg-blue-100 " type="text" id="usernameOrEmail" name="usernameOrEmail" placeholder="Type Your Username / Email" value={values.usernameOrEmail} onChange={handleChange}/>
						
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