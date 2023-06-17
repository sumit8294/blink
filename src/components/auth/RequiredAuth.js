import {Outlet,Navigate,useLocation} from 'react-router-dom';
import {getAccessToken} from '../../reducers/authSlice';
import {useSelector} from 'react-redux';

const RequiredAuth = () => {
	
	const token = useSelector(getAccessToken);
	const location = useLocation();

	return (
		<>
			{token
				? <Outlet />
				: <Navigate to="/login" state={{ from: location }} replace />
			}
		</>
	);
}


export default RequiredAuth;