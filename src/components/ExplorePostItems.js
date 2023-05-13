import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

import './exploreposts.css'
const ExplorePostItems = ({user}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet
				?
					<>
						<div className="post relative image-box" >
							<div className="post-image relative  mx-auto  overflow-hidden " >
								<img className="" src={user.imageUrl} alt="images" />
							</div>
							{/*<div className="post-details flex px-1 py-2  mx-auto text-xs justify-between">
								<div className="user-name font-semibold">
									<span>{user.name}</span>
								</div>
								<div className="post-actions flex">
									<div className="likes mr-3">
										<span><FontAwesomeIcon icon={faHeart} /></span>
										<span className="text-[11px] ml-0.5 ">20k</span>
									</div>
									<div className="shares ">
										<span><FontAwesomeIcon icon={faComment} /></span>
										<span className="text-[11px] ml-0.5" >100k</span>
									</div>
								</div>
							</div>*/}
						</div>
					</>
				:

					<>
						<div className="post relative rounded-xl image-box" >
							<div className="post-image relative  mx-auto  overflow-hidden " >
								<img className="" src={user.imageUrl} alt="images" />
							</div>
							{/*<div className="post-details flex px-1 py-2  mx-auto text-xs justify-between">
								<div className="user-name font-semibold">
									<span>{user.name}</span>
								</div>
								<div className="post-actions flex">
									<div className="likes mr-3">
										<span><FontAwesomeIcon icon={faHeart} /></span>
										<span className="text-[11px] ml-0.5 ">20k</span>
									</div>
									<div className="shares ">
										<span><FontAwesomeIcon icon={faComment} /></span>
										<span className="text-[11px] ml-0.5" >100k</span>
									</div>
								</div>
							</div>*/}
						</div>
					</>

			}

		</>
	)
}

export default ExplorePostItems;