
const FeedPostHeader = ({user}) =>{

	return (

		<>
			
			<div className="post-details  py-2 rounded flex text-xs justify-between">

				<div className="user-info  flex align-middle content-center">

					<div className="post-image w-10 h-10 rounded-full text-center  overflow-hidden" >

						<img className=""  src={user.imageUrl} alt="images" />

					</div>

					<div className="">

						<p className="h-4 px-2 py-1 font-semibold">{user.name}</p>

						<p className="h-4 px-2 py-1 text-blink-gray-1">original audio</p>

					</div>

				</div>

			</div>

		</>

	)

}

export default FeedPostHeader;