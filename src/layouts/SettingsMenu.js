import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DialogContext } from '../store/DialogContext'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/authSlice'
import {resetStore} from '../store/index'

const SettingsMenu = () => {

    const menuItems = [
        "Settings",
        "Create",
        // "Saved",
    ]

    const dispatch = useDispatch()

    const {setSettingMenuVisibility} = useContext(DialogContext)

    /*const handleLogout = () =>{
       
        dispatch(userLogout())
        window.location.reload()
            
    }
    */

    const handleLogout = async () =>{

		await dispatch(userLogout());
		resetStore(dispatch)
		window.location.reload();

    }
    

    return (
        <>
           <div className='bg-blink-black-1 w-full h-full absolute top-12 z-30' >
                <ul className='p-4 text-[20px] font-bold'>
                    {menuItems.map((item,index)=>{
                        return <Link to={`/${item}`} onClick={()=>setSettingMenuVisibility(false)}>
                            <li key={index} className='px-4 py-4' >
                                {item}
                            </li>
                        </Link>
                    })}
                    <li className='px-4 py-4' onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </div> 
        </>
    )
}

export default SettingsMenu;
