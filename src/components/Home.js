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
import { DialogContext } from '../store/DialogContext';



import { Routes, Route, useParams} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

import './home.css'
import SettingsMenu from '../layouts/SettingsMenu';

const Home = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	const {state} = useContext(DialogContext);
	
	const [isNoHeaderMobilePages,setNoHeaderMobilePages] = useState(false);
	const [isNoNavigationMobilePages,setNoNavigationMobilePages] = useState(false);

	const params = useParams();
	
	useEffect(()=>{
		if(
			params['*'] === 'reels' || 
			params['*'] === 'messages' || 
			params['*'] === 'content'

		) setNoHeaderMobilePages(true);

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
							<Route path="/" element={<Navigate to="/feed" />} />
							<Route path="/feed" element={<Feed />} />
							<Route path="/explore" element={<Explore />} />
							<Route path="/messages" element={<Messages />} />
							<Route path="/reels" element={<Reels />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/profile/:userId" element={<UserProfile />} />
							<Route path="/chats" element={<Chats />} />
							<Route path="/notifications" element={<Notifications />} />
							<Route path="/stories/following" element={<StoryViewer />} />
							<Route path="/create" element={<CreatePost />} />
							<Route path="/content/:contentType/:contentId/:notificationType?" element={<ContentLoader />} />
						</Routes>
					</div>
					{!isNoNavigationMobilePages && <BottomNavigation />}
					
					{state.settingMenuVisibility && <SettingsMenu />}
				</>
				:
				<>
					<Header />
					
						<div className="laptop-lg:flex max-w-[100rem] mx-auto h-full min-h-screen bg-blink-black-1">
							<SideBar />
							<Routes>
								<Route path="/" element={<Navigate to="/feed" />} />
								<Route path="/feed" element={<Feed />} />
								<Route path="/explore" element={<Explore />} />
								<Route path="/messages" element={<Messages />} />
								<Route path="/reels" element={<Reels />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/profile/:userId" element={<UserProfile />} />
								<Route path="/notifications" element={<Notifications />} />
								<Route path="/stories/following" element={<StoryViewer />} />
								<Route path="/create" element={<CreatePost />} />
								<Route path="/content/:contentType/:contentId/:notificationType?" element={<ContentLoader />} />
							</Routes>
						</div>
						
					<BottomNavigation />
				</>

			}

		</>
	)
}

export default Home;
