
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = () =>{
	return (
		<>
			<div className=" px-5 py-2 ">
				<div className=" w-3/6 drop-shadow-2xl rounded-3xl flex my-auto overflow-x-auto bg-blink-black-1">
					<input className="px-6 py-2 w-11/12 rounded-l-3xl bg-blink-black-1 focus:outline-none focus:border-blink-blue-1 " type="text" placeholder="Search"/>
					<button className="px-6 text-[#dbdbdb] border-l-px border-blink-blue-1 rounded-r-3xl"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
				</div>
			</div>
			
		</>
	)
}

export default Search;