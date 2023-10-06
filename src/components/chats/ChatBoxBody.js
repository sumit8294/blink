
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import useAuth from '../../hooks/useAuth';

import './chatboxbody.css'
const ChatBoxBody = ({messages,participant}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const {userId} = useAuth(); 

	return (

		<>

			{isMobileOrTablet

				?
				<>

					<div className=" w-full overflow-y-auto px-1 text-[0.9rem] py-14 mobile-md:px-2 mobile-md:text-[1rem] mobile-lg:text-[1.2rem] tablet-sm:py-24 tablet-sm:px-4 tablet-sm:text-[1.4rem]">

						
						{messages && messages.map((messageItem,index)=>{
							
							if(messageItem.sender._id === userId){

								return (

									<div key={index} className="relative flex justify-end right-0" >

										<p className="text-start text-white bg-blink-gradient-1 px-2 mx-4 my-2 rounded-2xl py-2">
										{messageItem.content}</p>

									</div>

								)

							}
							else{

								return (

									<div className="flex px-2 my-4" >

										<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

											<img className="w-7 h-7  rounded-2xl"  src={participant.profile} alt="images" />

										</div>

										<p className=" text-start bg-blink-gradient-5 px-2 rounded-2xl py-2">
										{messageItem.content}</p>

									</div>

								)
							}
						})}

						{/*<div className="tablet-sm:flex" >

							<div className=" post-image flex flex-col justify-start mb-1 overflow-hidden" >

								<img className="w-6 h-6 mobile-md:w-8 mobile-md:h-8 rounded-full tablet-sm:w-12 tablet-sm:h-12"  src="./assets/images/users/badshah.jpg" alt="images" />

							</div>					

							<div className=" post-image my-auto w-24 rounded-xl text-center overflow-hidden mb-2 mobile-md:w-32 tablet-sm:mx-2 tablet-sm:w-40" >

								<img className="w-full h-40 mobile-md:h-52 tablet-sm:h-64"  src="./assets/images/users/zyan.jpg" alt="images" />

							</div>	


						</div>


						<div className="flex mt-0.5 max-w-[80%] tablet-sm:ml-14" >
 
							<p className=" text-start bg-blink-gradient-1 px-2 rounded-r-xl rounded-t-xl py-0.5">utility classes indifferent states using variant modifiers.</p>
						
						</div>

						<div className="flex mt-0.5 tablet-sm:ml-14" >

							<p className=" text-start bg-blink-gradient-1 px-2 rounded-r-xl rounded-b-xl py-0.5 max-w-[80%]">
							you can also use </p>


						</div>

						<div className="relative flex flex-col items-end justify-end  right-0 tablet-sm:mt-10 " >

							<div className=" post-image my-auto w-24 rounded-xl text-center overflow-hidden mb-2 mobile-md:w-32 tablet-sm:w-40" >

								<img className="w-full h-40 mobile-md:h-52 tablet-sm:h-64"  src="./assets/images/users/badshah.jpg" alt="images" />

							</div>	

							<div className="relative flex justify-end mt-0.5 right-0 max-w-[80%]" >

								<p className="text-start bg-blink-gradient-1 px-2 rounded-l-xl rounded-t-xl py-0.5">utility classes in different states using variant modifiers.</p>

							</div>

							<div className="relative flex justify-end mt-0.5 right-0 max-w-[80%]" >

								<p className="text-start text-white bg-blink-gradient-1 px-2 mb-2 rounded-l-xl rounded-b-xl py-0.5">
								you can also use variant</p>

							</div>			
						
						</div>*/}



						

					</div>

				</>

				:

				<>

					<div className=" chatbox w-full h-[500px] overflow-y-auto text-[1rem]">

						{messages && messages.map((messageItem,index)=>{
							
							if(messageItem.sender._id === userId){

								return (

									<div key={index} className="relative flex justify-end right-0" >

										<p className="text-start text-white bg-blink-gradient-1 px-2 mx-4 my-2 rounded-2xl py-2">
										{messageItem.content}</p>

									</div>

								)

							}
							else{

								return (

									<div className="flex px-2 my-4" >

										<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

											<img className="w-7 h-7  rounded-2xl"  src={participant.profile} alt="images" />

										</div>

										<p className=" text-start bg-blink-gradient-5 px-2 rounded-2xl py-2">
										{messageItem.content}</p>

									</div>

								)
							}
						})}

						{/*<div className=" flex px-2 py-2" >

							<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

								<img className="w-full w-7 h-7  rounded-2xl"  src="./assets/images/users/badshah.jpg" alt="images" />

							</div>					

							<div className=" post-image  my-auto w-32 rounded-xl text-center overflow-hidden" >

								<img className="w-full h-52"  src="./assets/images/users/zyan.jpg" alt="images" />

							</div>	


						</div>*/}

						

						

						{/*<div className="relative flex justify-end px-2 py-1 right-0" >

							<div className=" post-image my-auto w-32 rounded-xl text-center overflow-hidden" >

								<img className="w-full h-52"  src="./assets/images/users/badshah.jpg" alt="images" />

							</div>

							<div className="shrink-0 post-image flex flex-col justify-end  px-2  overflow-hidden" >

								<p className="w-7 h-7  rounded-2xl " ></p>

							</div>					
						
						</div>*/}


						

					</div>

				</>

			}

		</>

	)

}

export default ChatBoxBody;