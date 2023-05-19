import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {Link} from 'react-router-dom';

const HeaderNav = () =>{
	return (
		<>
			<div className="flex">
				<Link to={`/notifications`}>

					<span className="text-blink-blue-1 mr-4 text-2xl">

						<FontAwesomeIcon icon={faCommentDots} />

					</span>							

				</Link>
				<Link to={`/messages`}>

					<span className="text-blink-blue-1 mr-4 text-2xl">

						<FontAwesomeIcon icon={faEnvelope} />

					</span>							

				</Link>
			</div>
		</>
	)
}

export default HeaderNav;