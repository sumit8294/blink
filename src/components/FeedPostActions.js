
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import {CommentsContext} from '../store/CommentsContext';
import {useContext} from 'react';



const FeedPostActions = ({user}) =>{

	const {commentsVisibility,setCommentsVisibility} = useContext(CommentsContext);

	const handleVisiblility = () =>{
		setCommentsVisibility(!commentsVisibility);
	}

	return (

		<>
			
			<div className="post-details  py-1 rounded flex  justify-between">

				<div className="post-actions text-[16px] flex">

					<div className="likes cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

						<span className="text-[#eb3349]">
						
							<FontAwesomeIcon icon={faHeart} />

						</span>

						<span className="text-[11px] ml-1 ">20k</span>

					</div>


					<div onClick={handleVisiblility} className="comments cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

						<span>

							<FontAwesomeIcon icon={faComment} />

						</span>

						<span className="text-[11px] ml-1" >23k</span>

					</div>


					<div className="shares cursor-pointer px-2 mr-1 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

						<span>

							<FontAwesomeIcon icon={faShare} />

						</span>


						<span className="text-[11px] ml-1" >100k</span>

					</div>

				</div>

				<div className="post-actions text-[14px] flex">

					<div className="save cursor-pointer px-2 py-1 shadow-md shadow-blink-black-1/20 bg-blink-black-1 rounded-2xl">

						<span>

							<FontAwesomeIcon icon={faBookmark} />

						</span>

						<span className="text-[11px] ml-1">20k</span>

					</div>

				</div>

			</div>

		</>

	)

}

export default FeedPostActions;