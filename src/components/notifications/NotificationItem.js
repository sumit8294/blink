
const NotificationItem = () =>{

	return (
		<>
			<div className="notification px-2 py-2 flex">				

				<div className="post-image shrink-0 h-10 w-10 rounded-full overflow-hidden" >

					<img className="w-full"  src="./assets/images/users/karanaujla.jpg" alt="images" />

				</div>

				<div className="">

					<div className="px-3 ">
						
						<span className="text-[12px] tracking-wide font-normal text-white"> 
							
							Karan Aujla

						</span>

						<span className=" text-[11px] "> 
							
							<span className=" text-blink-gray-1"> Thanks for having me on stage </span>

							<span className="block text-blink-gray-2 text-[11px]"> 12:55pm </span>

						</span>
				
					</div>
				
				</div>	
				
			</div>
		</>
	)
}

export default NotificationItem;