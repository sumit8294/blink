import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const HeaderInbox = () =>{
	return (
		<>
			<span className="text-blink-blue-1 mr-4 text-2xl">
				<FontAwesomeIcon icon={faCommentDots} />
			</span>
			<span  className="text-blink-blue-1 mr-4 text-2xl">
				<FontAwesomeIcon icon={faBars} />
			</span>
		</>
	)
}

export default HeaderInbox;