import Header from '../layouts/Header';
import Explore from './Explore';
import Messages from './Messages';
import Feed from './Feed';
import Reels from './Reels';
import Settings from './Settings';
import SideBar from '../layouts/SideBar';


import { Routes, Route, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';


import './home.css'

const Home = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const [isMobileReels,setIsMobileReels] = useState(false);

	const params = useParams();
	
	useEffect(()=>{
		if(params['*'] === 'reels') setIsMobileReels(true);
		else setIsMobileReels(false);
	},[params])

	return (
		<>
			{isMobileOrTablet 
				? 
				<>
					{!isMobileReels && <Header />}
					<div className="h-full min-h-screen bg-blink-black-1">
						<Routes>
							<Route path="/explore" element={<Explore />} />
							<Route path="/feed" element={<Feed />} />
							<Route path="/messages" element={<Messages />} />
							<Route path="/reels" element={<Reels />} />
							<Route path="/settings" element={<Settings />} />
						</Routes>
					</div>
				</>
				:
				<>
					<Header />
					
						<div className="laptop-lg:flex max-w-[100rem] mx-auto h-full min-h-screen bg-blink-black-1">
							<SideBar />
							<Routes>
								<Route path="/explore" element={<Explore />} />
								<Route path="/feed" element={<Feed />} />
								<Route path="/messages" element={<Messages />} />
								<Route path="/reels" element={<Reels />} />
								<Route path="/settings" element={<Settings />} />
							</Routes>
						</div>
					
				</>

			}

		</>
	)
}

export default Home;
