import Home from './components/Home'


import './App.css';
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';

import UserSignup from './components/auth/UserSignup';
import UserLogin from './components/auth/UserLogin';
import PersistLogin from './components/auth/PersistLogin';
import RequiredAuth from './components/auth/RequiredAuth';
import {getAccessToken} from './reducers/authSlice';
import {useSelector} from 'react-redux';
import React from 'react';
import SocketProvider from './store/SocketContext';
import DialogProvider from './store/DialogContext';
import PeerProvider from './store/PeerContext';

function App() {

	const token = useSelector(getAccessToken);
    
	return (
	    <>
			<Routes>
					
				<Route element={<PersistLogin />} >

					<Route path="/signup" element={token ? <Navigate to="/feed" /> : <UserSignup />} />
					<Route path="/login" element={token ? <Navigate to="/feed" /> : <UserLogin />} />

					<Route element={<RequiredAuth />}>
						<Route path="*" element={
							<SocketProvider>
								<PeerProvider>
									<DialogProvider>
										<Home />
									</DialogProvider>
								</PeerProvider>
							</SocketProvider>} 
						/>
					</Route>

				</Route>

			</Routes>
	    </>
	);
}
export default App;
