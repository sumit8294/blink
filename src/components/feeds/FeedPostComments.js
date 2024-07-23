import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

import { useMediaQuery } from 'react-responsive'
import {mobileMediaQuery} from '../../ReactResponsiveQueries'
import { useContext, useState } from 'react'
import { DialogContext } from '../../store/DialogContext'


const FeedPostComments = ({post}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery)
	const { setCommentsVisibility } = useContext(DialogContext)

	const handleCommentVisibility = () =>{
		setCommentsVisibility(true)
	}

	

	return (
		
		<>
			{isMobileOrTablet 
				?
				<>
						<div className="mb-1 pb-4">

							<div className="likes relative text-[0.8rem] px-2 mobile-md:text-[0.950rem] mobile-md:px-3 mobile-lg:text-[1.1rem] tablet-sm:text-[0.950rem]">
								
								<span className="block  text-blink-gray-1"> 
									
									<span className="font-bold text-white"> {post.user.username} </span>

									<span>	{post.caption} </span>

									<span className="">

										<button className="opacity-50"> more </button>			
								
									</span>

								</span>

								<ul>
								{post.comments && post.comments.map((commentItem,index)=>{

									return(
										<li key={index}>
											<div  className="mb-0.5 text-blink-gray-1 flex">

												<div className="inline-block w-4 h-4 rounded-full overflow-hidden" >

													<img className="" style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={commentItem.user.profile} alt="comments" />

												</div>
												
												<div>
													<span className="font-semibold text-white"> {commentItem.user.username} </span>

													<span>	{commentItem.content} </span>
												</div>

											</div>
										</li>
									)

								})}
								</ul>

								{post.comments?.length > 0 && <span className="block text-blink-gray-1"> 

									<button className="opacity-50" onClick={handleCommentVisibility}>View all comments</button>

								</span>}
						
							</div>
						

							{/* <div className="add-comment rounded justify-between">

								<div className="text-[12px] ">

									<div className="relative px-1 pb-4 py-0.5 shadow-lg shadow-blink-black-1/20 bg-blink-black-1 rounded-b-2xl">
										
										<div className=" w-full text-[#dbdbdb] drop-shadow-2xl flex overflow-x-auto bg-blink-black-1">
											
											<input className="px-1 py-1 w-10/12 bg-blink-black-1 focus:outline-none " type="text" placeholder="Add a comment..."/>
											
											<button className="px-3 w-2/12">
												
												<FontAwesomeIcon icon={faPaperPlane} />
											
											</button>
										
										</div>
									
									</div>
								
								</div>
							
							</div> */}

						</div>

				</>
				:
				<>
				<div className="post-comments rounded  justify-between pb-4">

						<div className="text-[0.950rem]">

							<div className="likes relative px-2 rounded-t-2xl">
								
								<span className="block text-blink-gray-1"> 
									
									<b className="font-semibold text-white"> {post.user.username} </b>

									<span>	{post.caption} </span>

									<span className="">

										<button className="opacity-50"> more </button>			
								
									</span>

								</span>

								<ul>
								{post.comments && post.comments.map((commentItem,index)=>{

									return(
										<li key={index}>
											<div  className="mb-0.5 text-blink-gray-1">

												<div className="inline-block w-5 h-5 rounded-full text-center  overflow-hidden" >

													<img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={commentItem.user.profile} alt="comments" />

												</div>
												
												<b className=" font-semibold text-white"> {commentItem.user.username} </b>

												<span>	{commentItem.content} </span>

											</div>
										</li>
									)

								})}
								</ul>

								{post.comments?.length > 0 && <span className="block text-blink-gray-1"> 

									<button className="opacity-50" onClick={handleCommentVisibility} >View all comments</button>

								</span>}

							</div>
						
						</div>

						{/* <div className="add-comment rounded justify-between laptop-lg:pb-3">

							<div className="text-[1rem] ">

								<div className="relative px-1 rounded-b-2xl ">
									
									<div className=" w-full text-[#dbdbdb] flex overflow-x-auto ">
										
										<input 
											className="px-1 py-1 w-10/12 bg-blink-black-1 focus:outline-none " 
											type="text" 
											placeholder="Add a comment..."
											
											/>
										
										<button className="px-3 w-2/12" >
											
											<FontAwesomeIcon icon={faPaperPlane} />
										
										</button>
									
									</div>
								
								</div>
							
							</div>
						
						</div> */}

					</div>
				</>
			}
		</>

	)

}

export default FeedPostComments;