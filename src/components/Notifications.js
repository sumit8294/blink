import NotificationItem from './NotificationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

import {NotificationContext} from '../store/NotificationContext';
import {useContext} from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

const Notifications = () =>{
	
	const {setNotifyBarVisibility} = useContext(NotificationContext);

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet
				?
				<>
					<div className="overflow-y-auto">

						<div className="ml-2 my-2 py-4 bg-blink-black-1 drop-shadow-2xl rounded-2xl">
							
							<div className="suggestion-head border-b border-blink-black-2 px-4 pb-3 text-sm flex justify-between">

								<button className="text-blink-gray-2" >Notifications</button>

							</div>

							<div className="notifications py-4 h-[80vh] overflow-y-auto">

								<NotificationItem />
								<NotificationItem />
								

							</div>

				
						</div>

					</div>
				</>

				:

				<>
					<div className="w-full overflow-y-auto">

						<div className="ml-2 my-2 py-4 bg-blink-black-1 laptop-lg:bg-blink-black-2 drop-shadow-2xl rounded-2xl">
							
							<div className="suggestion-head border-b border-blink-black-2 px-4 pb-3 text-sm flex justify-between">

								<button className="text-blink-gray-2" >Notifications</button>

							</div>

							<div className="notifications py-4 h-[80vh] overflow-y-auto">

								<NotificationItem />
								<NotificationItem />
								

							</div>

				
						</div>

					</div>
				</>

			}
		</>
	)
}

export default Notifications;