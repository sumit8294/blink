import Search from './Search';
import ExplorePosts from './ExplorePosts';

import './explore.css'
const Explore = () =>{
	return (
		<>
			{/*<div className="home-content w-9/12   h-full text-white  ">*/}

			<div className=" w-full pl-[19.7rem] h-full text-white  ">

				<div className="w-[98%] mx-3 my-2 h-[97vh] overflow-hidden rounded-2xl  py-4 text-white bg-blink-black-2 drop-shadow-2xl">

					<div className="right-container justify-center bg-blink-black-2 h-[97vh] overflow-y-auto  ">

						<Search />

						<ExplorePosts />

					</div>

				</div>

			</div>
		</>
	)
}

export default Explore;