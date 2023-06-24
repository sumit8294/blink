import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
	user: {},
	status: 'idle',
	error: null,
	count: 1
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers:{
		increase:(state,action)=>{
			console.log(state);
			state.count++;
		}
	}
})

export const {increase} = userSlice.actions;

export default userSlice.reducer;
