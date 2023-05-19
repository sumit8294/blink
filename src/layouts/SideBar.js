import Profile from '../components/Profile';
import Navigation from '../components/Navigation';
import Notifications from '../components/Notifications';

import {NotificationContext} from '../store/NotificationContext';

import {useState} from 'react';

const SideBar = () =>{
	
	const [notifyBarVisibility,setNotifyBarVisibility] = useState(false);
	
	return (
		<>
			<NotificationContext.Provider value={{notifyBarVisibility,setNotifyBarVisibility}}>

				<div className="hidden laptop-lg:block h-full w-[19.5rem] shrink-0 overflow-y-auto">

					<div className="ml-2 my-2 py-10 bg-blink-black-2 drop-shadow-2xl rounded-2xl">

						{/*<Profile />	*/}

						<Navigation />	

					</div>

				</div>
			
				{notifyBarVisibility && <Notifications />}

			</NotificationContext.Provider>
		</>
	)
}

export default SideBar;