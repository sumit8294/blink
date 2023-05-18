import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	user:[],
	loading: false,
	error: false,
	isLoggedIn: false
}
const usersSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		LOGGED_IN:{
			reducer(state,action){
				state.isLoggedIn = true;
			}
		},
		LOGGED_OUT:{
			reducer(state,action){
				state.isLoggedIn = false;
			}
		}
	}
})

export const { LOGGED_OUT, LOGGED_IN } = usersSlice.actions;
export default usersSlice.reducer;