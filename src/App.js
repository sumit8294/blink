import Home from './components/Home'


import './App.css';
import { Routes, Route} from 'react-router-dom';

import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import {useSelector} from 'react-redux';

function App() {

	const user = useSelector(state => state.user);
	return (
	    <>
	    	{!user.isLoggedIn ?

	    		<Routes>
	    			<Route path="/signup" element={<UserSignup />} />
	    			<Route path="/login" element={<UserLogin />} />
	    			<Route path="*" element={<UserLogin />} />
	    		</Routes>
	    	:
	    		<Routes>
	    			<Route path="*" element={<Home />} />
	    		</Routes>
	    	}
	    </>
	);
}

export default App;
