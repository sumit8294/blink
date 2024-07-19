import NotificationItem from './NotificationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

import { useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, selectAllNotifications } from '../../reducers/notificationSlice';
import useAuth from '../../hooks/useAuth';

const Notifications = () =>{
	
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const {userId,token} = useAuth()

	const notifications = useSelector(selectAllNotifications)
	
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(getNotifications({token, userId}))
	},[])

	return (
		<>
			{isMobileOrTablet
				?
				<>
					<div className="overflow-y-auto">

						<div className="ml-2 my-2 py-4 bg-blink-black-1 drop-shadow-2xl rounded-2xl">
							
							<div className="suggestion-head border-b border-blink-black-2 px-4 pb-3 text-sm flex ">

								<button onClick={()=> window.history.go(-1)}>
									<FontAwesomeIcon icon={faLeftLong}/> 
								</button> &nbsp;&nbsp;
								<button className="text-blink-gray-2" > Notifications </button>

							</div>

							<div className="notifications py-4 h-[80vh] overflow-y-auto">

								{notifications?.length > 0 && notifications.map( (notification,index) => {

									return <NotificationItem key={index} notification={notification} />

								}) }								

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

								{notifications?.length > 0 && notifications.map((notification,index)=>{
									return <NotificationItem key={index} notification={notification} />
								})}
							
							</div>

						</div>

					</div>
				</>

			}
		</>
	)
}

export default Notifications;