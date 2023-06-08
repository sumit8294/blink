import Header from '../layouts/Header';
import Explore from './explores/Explore';
import Messages from './chats/Messages';
import Feed from './feeds/Feed';
import Reels from './reels/Reels';
import Settings from './userSettings/Settings';
import SideBar from '../layouts/SideBar';
import Chats from './chats/Chats';
import BottomNavigation from '../layouts/BottomNavigation';
import UserProfile from './users/UserProfile';
import Notifications from './notifications/Notifications';


import { Routes, Route, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';


import './home.css'


const Home = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const [isNoHeaderMobilePages,setNoHeaderMobilePages] = useState(false);

	const params = useParams();
	
	useEffect(()=>{
		if(params['*'] === 'reels' || params['*'] === 'messages') setNoHeaderMobilePages(true);
		else setNoHeaderMobilePages(false);
	},[params])

	return (
		<>
			{isMobileOrTablet 
				? 
				<>
					{!isNoHeaderMobilePages && <Header />}
					<div className="h-full min-h-screen bg-blink-black-1">
						<Routes>
							<Route path="/explore" element={<Explore />} />
							<Route path="/feed" element={<Feed />} />
							<Route path="/messages" element={<Messages />} />
							<Route path="/reels" element={<Reels />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/profile" element={<UserProfile />} />
							<Route path="/chats" element={<Chats />} />
							<Route path="/notifications" element={<Notifications />} />
						</Routes>
					</div>
					<BottomNavigation />
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
								<Route path="/profile" element={<UserProfile />} />
								<Route path="/notifications" element={<Notifications />} />
							</Routes>
						</div>
						
					<BottomNavigation />
				</>

			}

		</>
	)
}

export default Home;
