import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

const ReelComments = ({user}) =>{
	return (
		
		<>
			<div className="post-comments mt-1 px-2 rounded  justify-between">

				<div className="text-[16px]">

					<div className="likes relative px-2 py-2 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-t-2xl">
						
						<span className="block text-[11px] mb-1 text-blink-gray-1"> 
							
							<b className=" tracking-wider text-sm font-normal text-white"> {user.name} </b>

							<span>	My silence is just... another word for my pain !! </span>

							<span className="block">

								<button className="opacity-50"> more </button>			
						
							</span>

						</span>

						<span className="block text-[11px] text-blink-gray-1"> 

							<button className="opacity-50">View all comments</button>

						</span>

						<span className="block text-[11px] text-blink-gray-1"> 
							
							<b className="tracking-wider text-sm font-normal text-white"> ranveersingh </b>

							<span>	VIV SUPREMACY 👑 </span>

						</span>
						
						<span className="block text-[11px]  mb-0.5 text-blink-gray-1"> 
							
							<b className="text-sm font-normal text-white"> yoyohoneysingh </b>

							<span>	Unforgettable. Thank you for having </span>

						</span>
				
					</div>
				
				</div>

				<div className="add-comment rounded  justify-between">

					<div className="text-[12px] ">

						<div className="likes relative px-1 pb-4 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-b-2xl">
							
							<div className=" w-full text-[#dbdbdb] drop-shadow-2xl flex overflow-x-auto bg-blink-black-1">
								
								<input className="px-1 py-1 w-10/12 bg-blink-black-1 focus:outline-none " type="text" placeholder="Add a comment..."/>
								
								<button className="px-3 w-2/12">
									
									<FontAwesomeIcon icon={faPaperPlane} />
								
								</button>
							
							</div>
						
						</div>
					
					</div>
				
				</div>

			</div>

		</>

	)

}

export default ReelComments;