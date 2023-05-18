

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});


const UserSignup = () =>{

	return (

		<>
			<div className="mx-auto my-auto w-1/2">
				
				<Formik
			      initialValues={{ email: '', password: '' }}
			      validationSchema={validationSchema}
			      onSubmit={(values, { setSubmitting }) => {
			        setTimeout(() => {
			          alert(JSON.stringify(values, null, 2));
			          setSubmitting(false);
			        }, 500);
			      }}
			    >
			    	<Form>

				        <div>
				        	<label htmlFor="email">Email</label>
							<Field type="email" id="email" name="email" />
							<ErrorMessage name="email" component="div" />
				        </div>

				        <div>
							<label htmlFor="password">Password</label>
							<Field type="password" id="password" name="password" />
							<ErrorMessage name="password" component="div" />
				        </div>

			        	<button type="submit" className="bg-blink-blue-1">Signup</button>

			      </Form>

			    </Formik>

			</div>
			     
		</>
	)
}

export default UserSignup;