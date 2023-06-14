import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

import './postsgrid.css'


const PostsGrid = ({post}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet

				?
					<>

						<div className="post relative image-box" >

							<div className="post-image relative  mx-auto  overflow-hidden " >

								<img className="" src={post.imageUrl} alt="images" />

							</div>
							
						</div>

					</>
				:

					<>

						<div className="post relative rounded-xl image-box" >

							<div className="post-image relative  mx-auto  overflow-hidden " >

								<img className="" src={post.imageUrl} alt="images" />

							</div>
							
						</div>

					</>

			}


		</>

	)
}

export default PostsGrid;