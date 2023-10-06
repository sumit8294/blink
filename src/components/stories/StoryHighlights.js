import HighlightItems from './HighlightItems'

import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import {useParams} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

import {getStoriesByUserId,selectAllStories} from '../../reducers/storySlice'

const StoryHighlights = () =>{

	//----> no specific APIs are present currently

	const {token} = useAuth()
	const {userId} = useParams()

	const dispatch = useDispatch()

	const storiesHighlights = useSelector(selectAllStories)

	const fetchStories = async () =>{

		await dispatch(getStoriesByUserId({userId,token}))
	}

	useEffect(()=>{
		fetchStories();
	},[])

	return (
		<>

			{storiesHighlights.story && storiesHighlights.story.map((storyItem,index)=>{

				return	(<HighlightItems key={index} profile={storyItem.storyUrl} />)
				
			})}
		</>
	)
}

export default StoryHighlights;