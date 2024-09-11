import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import './exploreposts.css'
import { Link } from 'react-router-dom';


const ExplorePostItems = ({post}) =>{
	

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet
				?
					<>
						
							<div className="post relative image-box" >
								<Link to={`/content/post/${post._id}`}>
								<div className="post-image relative  mx-auto  overflow-hidden " >
									<img className="" src={post.imageUrl} alt="images" />
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
								</Link>
							</div>
						
					</>
				:

					<>
						
							<div className="post relative rounded-xl image-box" >
								<Link to={`/content/post/${post._id}`}>
								<div className="post-image relative  mx-auto  overflow-hidden " >
									<img className="" src={post.imageUrl} alt="images" />
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
								</Link>
							</div>
					</>

			}

		</>
	)
}

export default ExplorePostItems;