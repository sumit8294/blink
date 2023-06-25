
import SuggestionItem from './SuggestionItem';
import { useSelector,useDispatch } from 'react-redux'
import { getSuggestions,selectAllSuggestions,selectUsersStatus } from '../../reducers/userSlice'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'



const UserSuggestions = () =>{
	const {userId,token} = useAuth()
	const dispatch = useDispatch()
	const users = useSelector(selectAllSuggestions)
	const usersStatus = useSelector(selectUsersStatus)


	const fetchUsers = () =>{
		dispatch(getSuggestions({token,userId}))
	}

	useEffect(()=>{
		fetchUsers()
	},[])
	return (
		<>
			<div className=" mr-2 ml-1 my-2 bg-blink-black-2 rounded-2xl">

				<div className="suggestion-head py-3 px-3 text-sm flex justify-between">

					<h3 className="poppins text-blink-gray-1 font-semibold mt-2">Suggested for you</h3>

					<button className="text-blink-blue-1" >see all</button>

				</div>

				{users?.length > 0 && users.map((user,index)=>{

					return <SuggestionItem key={index} user={user}/>

				})}

				{usersStatus === 'loading' && <p>Loading...</p>}


			</div>

		</>

	)

}

export default UserSuggestions;