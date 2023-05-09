const Profile = () =>{
	return (
		<>
			<div className="h-68 px-5 pb-10 text-white">
				<div className="images-container mx-auto rounded-full w-24 h-24 overflow-hidden outline outline-offset-[3px] outline-2 outline-blink-blue-1">
					<img src="./assets/images/users/zyan.jpg" alt="profile"/>
				</div>
				<div className="user-details">
					<div className="text-xl pt-2 pb-0.5 font-medium text-center">
						<span className="">Zyan Malik</span>
					</div>
					<div className="about text-[10px] px-4  text-blink-gray-1 text-center">
						<span className="">Singer | Artist | Composer</span>
					</div>
				</div>
				<div className="profile-actions mt-5 px-2 py-0.5 flex justify-around text-center">
					<div className="posts">
						<span className="text-sm block font-semibold relative top-[5px]">34</span>
						<span className="text-xs text-blink-gray-1 ">posts</span>
					</div>
					<div className="followers">
						<span className="text-sm block font-semibold relative top-[5px]">1M</span>
						<span className="text-xs text-blink-gray-1">followers</span>
					</div>
					<div className="following relative">
						<span className="text-sm block font-semibold relative top-[5px]">80</span>
						<span className="text-xs text-blink-gray-1">following</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile;