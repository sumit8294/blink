
const SuggestionItem = ({user}) =>{
	return (
		<>
			<div className="flex py-2 px-3 justify-between border-b last:border-none border-blink-black-3">

				<div className="flex">

					<div className="post-image shrink-0 h-12 my-auto w-12 rounded-full text-center overflow-hidden" >

						<img className="w-full"  src={user.imageUrl} alt="images" />

					</div>

					<div className="px-2 py-1">
						
						<span className="block text-[1em] tracking-wide font-normal text-white"> 
							
							{user.name} 

						</span>

						<span className="block text-[11px] text-blink-gray-1"> 
							
							<span className="tracking-wide"> Followed by </span>

							<span className="text-white"> harry, </span>
							
							<span className="text-white"> karan... </span>

						</span>
				
					</div>
				
				</div>

				<div className="text-[12px]  text-blink-blue-1 flex justify-end content-center">

					<button>Follow</button>
				
				</div>
				
			</div>

		</>

	)

}

export default SuggestionItem;