import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
const HeaderInbox = () =>{
	return (
		<>
			<span className="text-blink-blue-1 px-10 py-4 text-2xl">
				<FontAwesomeIcon icon={faCommentDots} />
			</span>
		</>
	)
}

export default HeaderInbox;