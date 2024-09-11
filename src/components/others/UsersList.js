import { useDispatch } from "react-redux"
import { setUsers } from "../../reducers/userSlice"
import { Link } from "react-router-dom"

const UsersList = ({users}) => {
    const dispatch = useDispatch()
    const handleOnClick = () => {
        
    }

    return (
        <>
            <div className="w-full text-end p-2 px-4">
                <button onClick={()=>dispatch(setUsers([]))}>X</button>
            </div>
           {users.map((user) => <Link 
                key= {user._id}
                className={`cursor-pointer relative flex px-4 py-2 `} 
                to={`/profile/${user._id}`} >

                <div className="shrink-0 post-image h-12 my-auto w-12 rounded-full text-center overflow-hidden" >

                    {user.profile
                            ? <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={user.profile} alt="profile"/>

                            : <img src="https://res.cloudinary.com/dzaklkjrk/image/upload/v1709810476/posts-and-profile/temp-user_o7kzmj.png" alt="profile"/>
                    }

                </div>

                <div className="px-3 ">
                    
                    <span className={"font-bold tracking-wide block text-white"}> 
                        
                        {user.username}

                    </span>
            
                </div>
                
                
                
            </Link>
           )}
        </>
    )
}

export default UsersList