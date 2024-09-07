const SimpleOkAlert = ({message,eventOnConfirm}) => {



	return (
		<>
			<div className="absolute h-full w-full z-30 top-0 flex flex-auto justify-center items-center bg-gray-800 bg-opacity-40">
				<div className="w-56 h-40 rounded-xl text-center bg-blink-gray-2 py-10">
                    
                    <span>{message}</span>
                    
					
					<br/>
					<div className="text-blink-blue-1 font-bold">
						<button className="border-0 m-10" onClick={eventOnConfirm}>Ok</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default SimpleOkAlert

