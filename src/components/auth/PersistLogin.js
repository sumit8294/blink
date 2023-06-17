import {getAccessToken,getAccessTokenWithRefreshToken} from '../../reducers/authSlice';
import {useSelector,useDispatch} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Spinner from '../elements/Spinner';
const PersistLogin = () =>{

	const token = useSelector(getAccessToken);
	const dispatch = useDispatch();
	const [checkingAuth,setCheckingAuth] = useState(true);

	const checkAuthToken = async ()=>{
		
			try{
				if(!token){
					await dispatch(getAccessTokenWithRefreshToken());
				}
			}
			catch(error){
				console.log("not having refresh token");
			}
			finally{
				setCheckingAuth(false);
			}
		
	}

	useEffect(()=>{
		checkAuthToken();
	},[])

	return(
		<>
			{checkingAuth
				? <Spinner /> 
				: <Outlet />
			}
		</>
	)
}

export default PersistLogin;