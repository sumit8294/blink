
const SuggestionItem = ({user}) =>{
	return (
		<>
			<div className="flex px-2 py-2">

				<div className="post-image h-12 my-auto w-12 rounded-full text-center overflow-hidden" >

					<img className="w-full"  src={user.imageUrl} alt="images" />

				</div>

				<div className="">

					<div className="px-2 py-2 ">
						
						<span className="block"> 
							
							<b className=" tracking-wide font-normal text-white"> {user.name} </b>

						</span>

						<span className="block text-[11px] text-blink-gray-1"> 
							
							<span className="tracking-wide"> Followed by </span>

							<span className="text-white"> harry, </span>

							<span className="text-white"> divine and </span>
							
							<span className="text-white"> karan... </span>

						</span>
				
					</div>
				
				</div>

				<div className="text-[12px] text-blink-blue-1 flex content-center">

					<button>Follow</button>
				
				</div>
				
			</div>

		</>

	)

}

export default SuggestionItem;