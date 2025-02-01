import Home from './components/Home'


import './App.css';
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';

import UserSignup from './components/auth/UserSignup';
import UserLogin from './components/auth/UserLogin';
import PersistLogin from './components/auth/PersistLogin';
import RequiredAuth from './components/auth/RequiredAuth';
import {getAccessToken} from './reducers/authSlice';
import {useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import SocketProvider from './store/SocketContext';
import DialogProvider from './store/DialogContext';
import PeerProvider from './store/PeerContext';
import { baseApi } from './config';
import axios from 'axios';
import useAuth from './hooks/useAuth';
import askForNotificationPermission from './services/pushNotificationService';

function App() {

	const token = useSelector(getAccessToken);

	const {userId} = useAuth();

	// useEffect(()=>{
	// 	if(userId){
	// 		axios.get(`${baseApi}/notifications/check-subscription/${userId}`)
	// 		.then((res)=>{
	// 			if(res.data.subscribed === false) askForNotificationPermission(userId)
	// 		})
	// 		.catch((err) => {
	// 			askForNotificationPermission(userId)
	// 			console.error("failed to fetch subscribe status", err)
	// 		});
	// 	}	
		  
	// },[userId])

	useEffect(() => {
        if (userId) {
            const subscribed = Cookies.get("pushSubscribed");

            if (!subscribed || subscribed === "false") {
                askForNotificationPermission(userId);
            }
        }
    }, [userId]);

	
    
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
