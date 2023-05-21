import Home from './components/Home'


import './App.css';
import { Routes, Route} from 'react-router-dom';

import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';


function App() {	

	return (
	    <>
			<Routes>
				<Route path="/signup" element={<UserSignup />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="*" element={<Home />} />
			</Routes>
	    </>
	);
}

export default App;
