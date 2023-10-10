import BottomNavigation from '../layouts/BottomNavigation';
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';
import Explore from './explores/Explore';
import Feed from './feeds/Feed';
import Reels from './reels/Reels';
import Settings from './userSettings/Settings';
import Messages from './chats/Messages';
import Chats from './chats/Chats';
import Notifications from './notifications/Notifications';
import StoryViewer from './stories/StoryViewer';
import UserProfile from './users/UserProfile';
import CreatePost from './users/CreatePost';
import ContentLoader from './others/ContentLoader';
import {Outlet,Navigate,useLocation} from 'react-router-dom';
import DialogProvider from '../store/DialogContext';



import { Routes, Route, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';


import './home.css'


const Home = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const [isNoHeaderMobilePages,setNoHeaderMobilePages] = useState(false);
	const [isNoNavigationMobilePages,setNoNavigationMobilePages] = useState(false);


	const params = useParams();
	
	useEffect(()=>{
		if(params['*'] === 'reels' || params['*'] === 'messages') setNoHeaderMobilePages(true);
		else setNoHeaderMobilePages(false);

		if(params['*'] === 'messages') setNoNavigationMobilePages(true)
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
							<Route path="/feed" element={<DialogProvider><Feed /></DialogProvider>} />
							<Route path="/messages" element={<Messages />} />
							<Route path="/reels" element={<DialogProvider><Reels /></DialogProvider>} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/profile/:userId" element={<DialogProvider><UserProfile /></DialogProvider>} />
							<Route path="/chats" element={<Chats />} />
							<Route path="/notifications" element={<Notifications />} />
							<Route path="/stories/following" element={<StoryViewer />} />
							<Route path="/create" element={<CreatePost />} />
							<Route path="/content" element={<DialogProvider><ContentLoader /></DialogProvider>} />
						</Routes>
					</div>
					{!isNoHeaderMobilePages && <BottomNavigation />}
				</>
				:
				<>
					<Header />
					
						<div className="laptop-lg:flex max-w-[100rem] mx-auto h-full min-h-screen bg-blink-black-1">
							<SideBar />
							<Routes>
								<Route path="/explore" element={<Explore />} />
								<Route path="/feed" element={<DialogProvider><Feed /></DialogProvider>} />
								<Route path="/messages" element={<Messages />} />
								<Route path="/reels" element={<DialogProvider><Reels /></DialogProvider>} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/profile/:userId" element={<DialogProvider><UserProfile /></DialogProvider>} />
								<Route path="/notifications" element={<Notifications />} />
								<Route path="/stories/following" element={<StoryViewer />} />
								<Route path="/create" element={<CreatePost />} />
								<Route path="/content" element={<DialogProvider><ContentLoader /></DialogProvider>} />
							</Routes>
						</div>
						
					<BottomNavigation />
				</>

			}

		</>
	)
}

export default Home;
