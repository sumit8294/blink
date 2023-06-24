import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import ReelComments from './ReelComments';
import {DialogContext} from '../../store/DialogContext';
import {useContext} from 'react';


const ReelPostsComments = () => {

	const {setCommentsVisibility} = useContext(DialogContext);

	return (

		<>
			<div className="absolute flex justify-center w-full top-0 py-20">

				<div className=" pb-[600px] w-[25rem] bg-blink-black-1 rounded-2xl py-4 border border-blink-black-3 py-10 mx-auto mb-10">

					<div className="px-4 relative text-center text-[18px] text-white font-bold border-b-2 mx-2 pb-2 border-blink-black-3">

						Comments

						<button className="absolute right-4 text-blink-blue-1" onClick={()=>setCommentsVisibility(false)}><FontAwesomeIcon icon={faSquareXmark} /> </button>

					</div>

					<div className="">

						<ReelComments />

					</div>

				</div>	

			</div>

		</>

	)

}

export default ReelPostsComments;