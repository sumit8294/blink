import {useSelector} from 'react-redux';
import {getAccessToken} from '../reducers/authSlice';
import jwtDecode from 'jwt-decode';



const useAuth = () =>{

	const token = useSelector(getAccessToken);

	if(token){
		const decoded = jwtDecode(token);
		const {username,userId,profile} = decoded.UserInfo;
		
		return {username,userId,profile,token}
	}
	else{

		return {username: null, userId: null,profile:null}
	}
}

export default useAuth;