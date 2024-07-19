import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setNotificationsRead } from '../../reducers/notificationSlice';
import useAuth from '../../hooks/useAuth'

const NotificationItem = ({notification}) =>{
	const {contentId,type} = notification.content

	const {userId,token} = useAuth()

	const dispatch = useDispatch();

	const setRead = () =>{
		console.log("dfsd")
		dispatch(setNotificationsRead({userId,token}))
	}

	return (
		<>
			<Link to={`/content/${type}/${contentId}/${notification.type}`} onClick={setRead}>
			
				<div className="notification px-2 py-2 flex">				

					<div className="post-image shrink-0 h-10 w-10 rounded-full overflow-hidden" >

						<img className="w-full"  src={notification.sender.profile} alt="images" />

					</div>

					<div className="">

						<div className="px-3 ">
							
							<span className="text-[12px] tracking-wide font-normal text-white"> 
								
								{notification.sender.username}

							</span>

							<span className=" text-[11px] "> 

								{notification.type === 'like' && <span className=" text-blink-gray-1"> liked your {notification.content.type} </span>}
								
								{notification.type === 'comment' && <span>
										<span className=" text-blink-gray-1"> Commented on your {notification.content.type} </span>
										<br />
										<span className=" text-white font-bold text-[14px]"> {notification.comment.content} </span>
									</span>
								}
								
								{notification.type === 'follow' && <span className=" text-blink-gray-1"> started following you </span>}

								<span className="block text-blink-gray-2 text-[11px]"> {format(new Date(notification.createdAt), 'dd MMM yyyy hh:mm a')} </span>

							</span>
					
						</div>
					
					</div>	
					
				</div>

			</Link>
		</>
	)
}

export default NotificationItem;