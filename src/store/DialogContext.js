import {createContext,useState,useReducer} from 'react'

export const DialogContext = createContext()

const reducer = (state,action) =>{

	switch (action.type){
		case 'COMMENTS': 
			return {...state , commentsVisibility:action.payload};
		case 'SHARES': 
			return {...state , sharesVisibility:action.payload};
		case 'FOLLOWERS':
			return {...state, followersVisibility:action.payload};
		default:
			return state;

	}
}
const initialState = {
	commentsVisibility:false,
	sharesVisibility: false,
	followersVisibility: false,
}

const DialogProvider = ({children}) => {
	
	const [state,dispatch] = useReducer(reducer,initialState)
	

	const setCommentsVisibility = (visibility) =>{
		
		dispatch({type:'COMMENTS',payload:visibility})
	}

	const setSharesVisibility = (visibility) =>{
		
		dispatch({type:'SHARES',payload:visibility})
	}

	const setfollowersVisibility = (visibility) =>{
		
		dispatch({type:'FOLLOWERS',payload:visibility})
	}

	return(
		<DialogContext.Provider value={{ 
			setCommentsVisibility,
			setSharesVisibility,
			setfollowersVisibility,
			state 
		}}>
			{children}
		</DialogContext.Provider>
	)
}

export default DialogProvider