import Search from '../elements/Search';
import ExplorePosts from './ExplorePosts';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import { useCallback, useEffect, useState } from 'react';

import { getPosts, getPostStatus } from  '../../reducers/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { searchUsers, selectAllUsers, setUsers } from '../../reducers/userSlice';
import UsersList from '../others/UsersList';


const Explore = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const dispatch = useDispatch();
	
	const { userId, token } = useAuth();

	const postStatus = useSelector(getPostStatus)
	const users = useSelector(selectAllUsers)

	const [queryName,setQueryName] = useState("");

	const handleScroll = useCallback((event) => {

    	const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

		if (scrollHeight - scrollTop <= clientHeight + 800) { // Added buffer for preloading
			if (postStatus !== 'loading' ) {
				
				dispatch(getPosts({ token, userId, count: 10 }))
				
			}
		}

	}, [dispatch, token, userId, postStatus]);


	const dynamicExploreSearch = () => {
		dispatch(searchUsers({queryName,token}))
	}

	useEffect(()=>{
		if(queryName !== ""){
			dynamicExploreSearch();
		}else{
			dispatch(setUsers([]))
		}
	},[queryName])

	return (
		<>
			{isMobileOrTablet
				?
					<>

						<div onScroll={handleScroll} className="text-white h-screen overflow-y-auto justify-center bg-blink-black-1   ">

							<Search queryName={queryName} setQueryName={setQueryName}/>

							{users.length > 0
							
							? <UsersList users={users}/>
							
							: <ExplorePosts /> }

						</div>

					</>
				:
					<>

						<div className="h-screen text-white w-full laptop-lg:inline-grid">

							<div className=" my-2 text-white py-4 rounded-2xl text-white laptop-lg:mx-2 laptop-lg:bg-blink-black-2">

								<div onScroll={handleScroll} className="custom-scroll h-screen overflow-y-auto laptop-lg:px-4">

									<Search queryName={queryName} setQueryName={setQueryName}/>

									{users.length > 0
										
										? <UsersList users={users}/>
										
										: <ExplorePosts /> }

								</div>

							</div>

						</div>

					</>
			}
		</>
	)
}

export default Explore;
