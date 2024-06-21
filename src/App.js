import Home from './components/Home'


import './App.css';
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';

import UserSignup from './components/auth/UserSignup';
import UserLogin from './components/auth/UserLogin';
import PersistLogin from './components/auth/PersistLogin';
import RequiredAuth from './components/auth/RequiredAuth';
import {getAccessToken} from './reducers/authSlice';
import {useSelector} from 'react-redux';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {

	const ENDPOINT = "http://localhost:5000";

	const token = useSelector(getAccessToken);

	
	const socket = io.connect(ENDPOINT);

	socket.emit('hello_message',{data:"hello from frontend",room:"123"})

	const joinRoom = () => {
		
		  socket.emit("join_room", "123");
		
	  };

	useEffect(()=>{
		socket.on('server_message',(data)=>{
			console.log(data.message);
		});
	},[socket]);
    

	return (
	    <>
			<Routes>
					
				<Route element={<PersistLogin />} >

					<Route path="/signup" element={token ? <Navigate to="/" /> : <UserSignup />} />
					<Route path="/login" element={token ? <Navigate to="/" /> : <UserLogin />} />

					<Route element={<RequiredAuth />}>
						<Route path="*" element={<Home />} />
					</Route>

				</Route>

			</Routes>
	    </>
	);
}

export default App;
