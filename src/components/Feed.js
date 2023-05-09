import Stories from './Stories';
import FeedPosts from './FeedPosts';

const Feed = () =>{
	return (
		<>
			{/*<div className=" w-9/12   h-full text-white  ">*/}

			<div className="w-full pl-[19.7rem] h-full text-white  ">

				<div className="w-[98%] mx-3 my-2 h-[97vh] overflow-hidden bg-blink-black-2 drop-shadow-2xl rounded-2xl py-4 ">

					<div className="right-container justify-center bg-blink-black-2 h-[97vh] overflow-y-auto  ">

						<Stories />

						<FeedPosts />

					</div>

				</div>
				
			</div>
		</>
	)
}

export default Feed;