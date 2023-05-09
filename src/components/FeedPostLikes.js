const FeedPostLikes = () =>{
	return (

		<>
			<div className="post-likers rounded justify-between">

				<div className="text-[16px]">

					<div className="likes flex px-2 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">
						
						<span className=" flex">

							<div className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

								<img className=""  src="./assets/images/users/harry.jpg" alt="likers" />

							</div>

							<div className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

								<img className=""  src="./assets/images/users/badshah.jpg" alt="likers" />

							</div>

							<div className="liker w-5 h-5 rounded-full text-center  overflow-hidden" >

								<img className=""  src="./assets/images/users/zyan.jpg" alt="likers" />

							</div>

						</span>

						<span className="text-[11px] ml-1 text-blink-gray-1">

							liked by 
							<b className="text-sm font-normal text-white"> Karan Aujla </b>
							and 
							<b className="text-sm font-normal text-white"> 20k others..</b>

						</span>

					</div>

				</div>

			</div>

		</>

	)

}

export default FeedPostLikes;