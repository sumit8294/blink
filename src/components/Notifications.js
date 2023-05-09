import NotificationItem from './NotificationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

import {NotificationContext} from '../store/NotificationContext';
import {useContext} from 'react';

const Notifications = () =>{
	
	const {setNotifyBarVisibility} = useContext(NotificationContext);

	return (
		<>
			<div className="sidebar absolute ml-[19.7rem] w-1/4 z-10 overflow-y-auto">

				<div className="ml-2 my-2 py-4 bg-blink-black-1 drop-shadow-2xl bg-blink-black-1 rounded-2xl">
					
					<div className="suggestion-head border-b border-blink-black-2 px-4 pb-3 text-sm flex justify-between">

						<button className="text-blink-gray-2" >Notifications</button>

						<button onClick={()=>setNotifyBarVisibility(false)} className="text-blink-gray-2" >

							<FontAwesomeIcon icon={faSquareXmark} />

						</button>


					</div>

					<div className="notifications py-4 h-[80vh] overflow-y-auto">

						<NotificationItem />
						<NotificationItem />
						

					</div>

		
				</div>

			</div>
		</>
	)
}

export default Notifications;