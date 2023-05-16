import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	user:[],
	loading: false,
	error: false,

}
const usersSlice = createSlice({
	name:'users',
	initialState,
	reducers:{

	}
})

// export const { increment, decrement } = counterSlice.actions;
export default usersSlice.reducer;