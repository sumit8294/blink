import Stories from '../stories/Stories';
import FeedPosts from './FeedPosts';
import UserSuggestions from '../suggestions/UserSuggestions';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import Comment from '../others/Comment';
import Share from '../others/Share';


import { useContext, useCallback } from 'react';
import {DialogContext} from '../../store/DialogContext';

import { getPosts, getPostStatus } from  '../../reducers/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';


const Feed = () =>{
	
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	const {state} = useContext(DialogContext);

	const dispatch = useDispatch();
	
	const { userId, token } = useAuth();

	const postStatus = useSelector(getPostStatus)

  const handleScroll = useCallback((event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 800) { // Added buffer for preloading
      if (postStatus !== 'loading' ) {
        
        dispatch(getPosts({ token, userId, count: 10 }))
          
      }
    }
  }, [dispatch, token, userId, postStatus]);
	
	return (
		<>
			{isMobileOrTablet ?
				<> 
					<div onScroll={handleScroll} className="mobile text-white justify-center bg-blink-black-1 h-screen overflow-y-auto tablet-sm:px-3 tablet-md:px-6">

						<Stories />

						<FeedPosts />

						{state.commentsVisibility && <Comment />}

						{state.sharesVisibility && <Share />}

					</div>
				</>
				:
				<> 
					

					<div className="relative h-[94vh] w-full text-white bg-blink-black-1 laptop-lg:inline-grid">

						<div className=" mx-2 my-2 overflow-hidden laptop-lg:bg-blink-black-2 laptop-lg:py-4 drop-shadow-2xl rounded-2xl ">

							<div onScroll={handleScroll} className="custom-scroll justify-center h-screen overflow-y-auto laptop-lg:py-4 ">

								<Stories />

								<FeedPosts />

							</div>

							{state.commentsVisibility && <Comment />}

							{state.sharesVisibility && <Share />}

							
						</div>
						
					</div>

					

					<div className="hidden w-[19.5rem] laptop-xl:block shrink-0">

						<UserSuggestions />

					</div>

				</>
			}

		</>
	)
}

export default Feed;
