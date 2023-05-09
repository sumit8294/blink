import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const StoryItems = ({user}) =>{
	return (
		<>
			
			<div className="flex flex-col relative w-[5.5rem] shrink-0 items-center justify-center text-center">

				<div className="relative w-16 mx-auto rounded-full shrink-0 overflow-hidden h-16 outline outline-offset-[3px] outline-2 outline-blink-blue-1">
					
					<img className=" my-image" src={user.imageUrl} alt="user-story"/>		
				
				</div>

				{user.name === "Your story" &&

				<span className="absolute right-3 bottom-8 bg-blink-black-1 rounded-full text-[0px]">

					<FontAwesomeIcon className="text-2xl text-blink-blue-1 " icon={faCirclePlus} />

				</span>

				}

				<div className="text-xs font-semibold py-2">

					<span>{user.name}</span>

				</div>

			</div>
			
		</>
	)
}

export default StoryItems;