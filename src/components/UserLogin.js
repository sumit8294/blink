import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { LOGGED_IN } from '../reducers/users';
import {useDispatch} from 'react-redux';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});


const UserLogin = () =>{

	const dispatch = useDispatch();

	const handleLogin = (values,{ setSubmitting }) =>{

		setTimeout(() => {
         	dispatch(LOGGED_IN());
       		setSubmitting(false);
        }, 500);
	}

	return (

		<>
			<div className="mx-auto w-[30rem] mt-20 bg-blink-black-1 rounded-xl py-10 px-6">

				<div className="text-center px-2 mb-8 text-3xl font-bold text-blink-blue-1">
					<span>BLINK</span>
				</div>
				
				<Formik
			      initialValues={{ email: '', password: '' }}
			      validationSchema={validationSchema}
			      onSubmit={handleLogin}
			    >
			    	<Form>
			    		<div className="hidden error text-red-900 font-semibold mx-auto w-3/4 block py-2 px-2 mb-6 border rounded-[4px] bg-pink-300 border-red-900">
							<ErrorMessage name="email" component="div" />
							<ErrorMessage name="password" component="div" />
			    		</div>

			    		<div className="hidden success text-green-900 font-semibold mx-auto w-3/4 block py-2 px-2 mb-6 border rounded-[4px] bg-green-300 border-green-900">
							<span>Logged In Successfully !!</span>
			    		</div>
				       
				       	<div className="flex mx-auto w-3/4 mb-4 bg-blue-100 border border-blue-300">

				       		<span className="px-4 py-2"><FontAwesomeIcon icon={faEnvelope} /></span>
							
							<Field className=" py-2 px-2 w-full outline-none bg-blue-100 " type="text" id="email" name="email" placeholder="Type Your Email"/>
							
			    		</div>

			    		<div className="flex mx-auto w-3/4 mb-4 bg-blue-100 border border-blue-300">
							
			    			<span className="px-4 py-2 "><FontAwesomeIcon icon={faKey} /></span>

							<Field className="py-2 px-2 w-full w-3/4 outline-none bg-blue-100" type="text" id="password" name="password" placeholder="Type Your Password"/>
							
			    		</div>
				        

			        	<button className="bg-blink-gradient-1 text-blink-black-1 text-xl font-bold mx-auto w-3/4 block py-2 px-2 my-10" type="submit" >Login</button>
			        	
			      </Form>

			    </Formik>

			</div>
			     
		</>
	)
}

export default UserLogin;