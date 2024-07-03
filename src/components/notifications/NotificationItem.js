
const NotificationItem = ({notification}) =>{

	return (
		<>
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
							
							{notification.type === 'comment' && <div>
									<span className=" text-blink-gray-1"> Commented on your {notification.content.type} </span>
									<span className=" text-white font-bold"> {notification.comment.content} </span>
								</div>
							}
							
							{notification.type === 'follow' && <span className=" text-blink-gray-1"> started following you </span>}

							<span className="block text-blink-gray-2 text-[11px]"> {notification.createdAt} </span>

						</span>
				
					</div>
				
				</div>	
				
			</div>
		</>
	)
}

export default NotificationItem;