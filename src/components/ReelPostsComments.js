import ReelComments from './ReelComments';

const user = {name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg",message:"Thanks for having me on stage",messageTime:"sun 1:13 pm"};

const ReelPostsComments = () => {

	return (

		<>

			<div className="">

				<div  className="">

					<div className="reel-posts posts-container py-10 mx-auto mb-10 h-screen snap-y snap-mandatory overflow-y-auto" >

						<div className="bg-blink-black-1 rounded-2xl py-4">

							<div className="px-4  flex justify-between">

								<button className="text-blink-gray-2" >	Comments </button>

							</div>

							<div className="">

								<ReelComments user={user} />

							</div>

						</div>
					
					</div>

				</div>


			</div>

		</>

	)

}

export default ReelPostsComments;