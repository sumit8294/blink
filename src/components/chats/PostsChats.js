import {Link} from 'react-router-dom';



const PostsChats = ({message,userId}) =>{

	return (
		<>
			{userId === message.sender._id

			?
				<div className=" flex justify-end px-2 py-1 right-0" >

					<div className=" post-image my-auto w-32 rounded-xl text-center overflow-hidden" >

						<Link to={`/content/${message.contentType}/${message.contentId}`}>

						{message.contentType === 'post'

							? <img className="w-full h-52"  src={message.content} alt="images" />

							: <video className="w-full h-52" src={message.content}></video> 

						}

						</Link>

					</div>

					<div className="flex flex-col justify-end  px-2  overflow-hidden" >

						<img className="w-6 h-6 mobile-md:w-8 mobile-md:h-8 rounded-full tablet-sm:w-12 tablet-sm:h-12"  src={message.sender.profile} alt="images" />
						
					</div>					
				
				</div>

			:

				<div className="tablet-sm:flex" >

					<div className=" post-image flex flex-col justify-start mb-1 overflow-hidden" >

						<img className="w-6 h-6 mobile-md:w-8 mobile-md:h-8 rounded-full tablet-sm:w-12 tablet-sm:h-12"  src={message.sender.profile} alt="images" />

					</div>					

					<div className=" post-image my-auto w-24 rounded-xl text-center overflow-hidden mb-2 mobile-md:w-32 tablet-sm:mx-2 tablet-sm:w-40" >

						<Link to={`/content/${message.contentType}/${message.contentId}`}>

						{message.contentType === 'post'

						? <img className="w-full h-40 mobile-md:h-52 tablet-sm:h-64"  src={message.content} alt="images" />

						: <video className="w-full h-40 mobile-md:h-52 tablet-sm:h-64" src={message.content}></video> 

						}

						</Link>

					</div>	


				</div>


			}
		</>
	)	
}

export default PostsChats