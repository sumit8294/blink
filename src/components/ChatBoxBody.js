import './chatboxbody.css'
const ChatBoxBody = () =>{

	return (

		<>

			<div className=" chatbox w-full h-[500px] overflow-y-auto">

				<div className=" flex px-2 py-2" >

					<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

						<img className="w-full w-7 h-7  rounded-2xl"  src="./assets/images/users/badshah.jpg" alt="images" />

					</div>					

					<div className=" post-image  my-auto w-32 rounded-xl text-center overflow-hidden" >

						<img className="w-full h-56"  src="./assets/images/users/zyan.jpg" alt="images" />

					</div>	


				</div>

				<div className="flex px-2 " >

					<div className=" post-image flex flex-col justify-start  px-2  overflow-hidden" >

						<p className="w-7 h-7  rounded-2xl " ></p>

					</div>

					<p className="text-sm text-start bg-blink-gradient-1 px-2 rounded-r-2xl rounded-b-2xl py-2">
					you can also use variant modifiers to target media queries</p>


				</div>

				<div className="flex px-2 py-1" >

					<div className=" post-image flex flex-col justify-start  px-2 py-2 overflow-hidden" >

						<p className="w-7 h-7  rounded-2xl " ></p>

					</div>

					<p className="text-sm text-start bg-blink-gradient-1 px-2 rounded-2xl py-2">Tailwind lets you conditionally apply utility classes in <br/>different states using variant modifiers.</p>


				</div>

				<div className="relative flex justify-end px-2 py-1 right-0" >

					<div className=" post-image my-auto w-32 rounded-xl text-center overflow-hidden" >

						<img className="w-full h-56"  src="./assets/images/users/badshah.jpg" alt="images" />

					</div>

					<div className="shrink-0 post-image flex flex-col justify-end  px-2  overflow-hidden" >

						<p className="w-7 h-7  rounded-2xl " ></p>

					</div>					
				
				</div>


				<div className="relative text-sm flex justify-end py-1 right-0" >

					<p className="text-start bg-blink-gradient-1 px-2 rounded-2xl py-2">Tailwind lets you conditionally apply utility classes in <br/>different states using variant modifiers.</p>

					<div className="shrink-0 post-image flex flex-col justify-end  px-2  overflow-hidden" >

						<p className="w-7 h-7  rounded-2xl " ></p>

					</div>

				</div>

				<div className="relative text-sm flex justify-end right-0" >

					<p className="text-start text-white bg-blink-gradient-1 px-2 mb-2 rounded-l-2xl rounded-t-2xl py-2">
					you can also use variant modifiers to target media queries</p>

					<div className="shrink-0 post-image flex flex-col justify-end  px-2  overflow-hidden" >

						<img className="w-7 h-7  rounded-2xl"  src="./assets/images/users/zyan.jpg" alt="images" />

					</div>

				</div>

			</div>

		</>

	)

}

export default ChatBoxBody;