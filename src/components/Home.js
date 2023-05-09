import Header from '../layouts/Header';
import Explore from './Explore';
import Messages from './Messages';
import Feed from './Feed';
import Reels from './Reels';
import Settings from './Settings';

import SideBar from '../layouts/SideBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import './home.css'

const Home = () =>{
	return (
		<>
			
			{/*{<Header />}*/}
			<div className="flex h-full min-h-screen bg-blink-black-1">
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
	)
}

export default Home;
