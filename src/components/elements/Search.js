
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';

const Search = ({setQueryName,queryName}) =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet 
				?
					<>

						<div className=" px-2 py-2 text-[0.8rem] mobile-md:text-[0.9rem] ">

							<div className="w-[14rem] drop-shadow-2xl rounded-2xl flex my-auto bg-blink-black-2">
								
								<input className="px-5 py-1 mobile-md:py-2 w-10/12 rounded-2xl bg-blink-black-2 focus:outline-none focus:border-blink-blue-1 " 
								type="text" 
								placeholder="Search"
								value={queryName}
								onChange={e=> setQueryName(e.target.value)}
								/>
								
								{/* <button className="px-4 mobile-md:py-1 text-[#dbdbdb] border-l-px  rounded-r-2xl">

									<FontAwesomeIcon icon={faMagnifyingGlass} />

								</button> */}
							
							</div>
						
						</div>

					</>
				:
					<>

						<div className=" px-5 py-2 ">

							<div className=" w-5/6 drop-shadow-2xl rounded-3xl flex my-auto overflow-x-auto ">
								
								<input className="px-6 py-2 w-11/12 rounded-3xl bg-blink-black-2 focus:outline-none focus:border-blink-blue-1 laptop-lg:bg-blink-black-1" 
								type="text" 
								placeholder="Search"
								value={queryName}
								onChange={e=> setQueryName(e.target.value)}
								/>
								
								{/* <button className="px-6 text-[#dbdbdb] border-l-px bg-blink-black-2 rounded-r-3xl laptop-lg:bg-blink-black-1">

									<FontAwesomeIcon icon={faMagnifyingGlass} />

								</button> */}
							
							</div>
						
						</div>

					</>

			}
			
		</>
	)
}

export default Search;