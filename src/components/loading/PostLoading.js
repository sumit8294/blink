import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const PostLoading = () =>{
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);
	return (
		<>
	{isMobileOrTablet
			?
		<div className="animate-pulse post bg-blink-black-1 w-[100vw] tablet-sm:w-[24rem] px-4 py-4 mx-auto mb-10" >

				<div className="flex space-x-4 mb-2" >	
					<div className="rounded-full shrink-0 bg-slate-200 h-12 w-12"></div>
					<div className="rounded-2xl my-auto bg-slate-200 h-6 w-1/2"></div>
				</div>

				<div className="rounded-2xl flex bg-slate-200 space-x-10 w-[80%] tablet-sm:w-[22rem] h-[22rem]" >	
					
				</div>

				<div className="flex space-x-2 w-[80%] tablet-sm:w-[22rem] my-3" >	
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
				</div>

				<div className="flex mb-2 space-x-1 my-3" >	
					<div className="rounded-full shrink-0 bg-slate-200 h-6 w-6"></div>
					<div className="rounded-full shrink-0 bg-slate-200 h-6 w-6"></div>
					<div className="rounded-full shrink-0 bg-slate-200 h-6 w-6"></div>
					<div className="rounded-2xl mx-4 my-auto bg-slate-200 h-6 flex-1"></div>
				</div>
				
				{/*<div className="rounded-2xl my-3 bg-slate-200 h-20 flex-1"></div>*/}
				
			</div>


		
			:
		
			<div className="animate-pulse post bg-blink-black-1 w-[24rem] px-4 py-4 mx-auto mb-10" >

				<div className="flex space-x-4 mb-2" >	
					<div className="rounded-full shrink-0 bg-slate-200 h-12 w-12"></div>
					<div className="rounded-2xl my-auto bg-slate-200 h-6 w-1/2"></div>
				</div>

				<div className="rounded-2xl flex bg-slate-200 space-x-10 w-[22rem] h-[22rem]" >	
					
				</div>

				<div className="flex space-x-2 w-[22rem] my-3" >	
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
					<div className="rounded-2xl bg-slate-200 h-8 w-1/4"></div>
				</div>

				<div className="flex mb-2 space-x-1 my-3" >	
					<div className="rounded-full shrink-0 bg-slate-200 h-6 w-6"></div>
					<div className="rounded-full shrink-0 bg-slate-200 h-6 w-6"></div>
					<div className="rounded-full shrink-0 bg-slate-200 h-6 w-6"></div>
					<div className="rounded-2xl mx-4 my-auto bg-slate-200 h-6 flex-1"></div>
				</div>
				
				{/*<div className="rounded-2xl my-3 bg-slate-200 h-20 flex-1"></div>*/}
				
			</div>
	}
		</>
	
	)
}

export default PostLoading;
