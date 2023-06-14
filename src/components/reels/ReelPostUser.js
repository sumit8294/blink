import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import {Link} from 'react-router-dom';

const ReelPostUser = ({user}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);


	return (

		<>
			{isMobileOrTablet 
				?
				<>
					<div className="post-details px-2 mobile-md:py-2 rounded flex text-xs justify-between ">

						<Link to={`/profile/${user._id}`} >

							<div className="user-info  flex align-middle content-center">

								<div className="post-image w-10 h-10 tablet-sm:w-12 tablet-sm:h-12 rounded-full text-center  overflow-hidden" >

									<img className=""  src={user.profile} alt="images" />

								</div>

								<div className="px-2 py-2 tablet-sm:py-4">

									<span className="block text-[1.2rem] tablet-sm:text-[1.3rem] font-semibold">{user.username}</span>

								</div>

							</div>

						</Link>

					</div>
				</>
				:
				<>
					<div className="post-details px-4 py-1 rounded flex text-xs justify-between laptop-lg:px-2">

						<Link to={`/profile/${user._id}`} >

							<div className="user-info  flex align-middle content-center">

								<div className="post-image w-12 h-12 rounded-full text-center  overflow-hidden laptop-lg:h-8 laptop-lg:w-8" >

									<img className=""  src={user.profile} alt="images" />

								</div>

								<div className="px-2 py-2">

									<span className="block text-[1.3rem] laptop-lg:text-[1rem] font-semibold">{user.username}</span>

								</div>

							</div>

						</Link >

					</div>
				</>
			}

		</>

	)

}

export default ReelPostUser;