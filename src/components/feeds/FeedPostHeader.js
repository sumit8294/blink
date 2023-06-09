import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const FeedPostHeader = ({post}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	return (

		<>
			{isMobileOrTablet 
				?
				<>
					<div className="post-details px-2 py-1 mobile-md:py-2 rounded flex text-xs justify-between ">

						<div className="user-info  flex align-middle content-center">

							<div className="post-image w-8 h-8 rounded-full text-center  overflow-hidden" >

								<img className=""  src={post.user.profile} alt="user" />

							</div>

							<div className="px-2">

								<span className="block text-[1rem] font-semibold">{post.user.username}</span>

								<span className="block text-[10px] text-blink-gray-1">original audio</span>

							</div>

						</div>

					</div>
				</>
				:
				<>
					<div className="post-details py-2 rounded flex justify-between">

						<div className="user-info  flex align-middle content-center">

							<div className="post-image w-10 h-10 rounded-full text-center  overflow-hidden" >

								<img className=""  src={post.user.profile} alt="user" />

							</div>

							<div className="">

								<p className="text-[1rem] h-4 px-2 py-1 font-semibold">{post.user.username}</p>

								<p className="text-[0.6rem] h-4 px-2 mt-2 text-blink-gray-1">original audio</p>

							</div>

						</div>

					</div>
				</>
			}

		</>

	)

}

export default FeedPostHeader;