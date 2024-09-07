const CallConfirmation = ({type,participant,eventOnDecline,eventOnConfirm}) => {



	return (
		<>
			<div className="absolute h-full w-full z-30 top-0 flex flex-auto justify-center items-center bg-gray-800 bg-opacity-40">
				<div className=" h-40 rounded-xl text-center bg-blink-gray-2 py-10">
                    {
                        type === 'caller' 
                        ? <span>Do you want to call <b>{participant?.username} </b>?</span>
                        : <span>You have a call from <b>{participant?.username} </b>?</span>
                    }
					
					<br/>
					<div className="text-blink-blue-1 font-bold">
						<button className="border-0 m-8" onClick={eventOnDecline}>{ type !== 'caller' ? "Decline" : "Cancel"}</button>
						<button className="border-0 m-10" onClick={eventOnConfirm}>{ type !== 'caller' ? "Accept" : "Call"}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default CallConfirmation

