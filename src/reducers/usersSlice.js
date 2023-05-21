import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	users:[],
	status:'idle',
	error:null

}

export const fetchUsers = createAsyncThunk('users/fetch', async ()=>{

	try{
		const response = await axios.get('http://localhost:5000/users');
		return [...response.data];
	}
	catch(err){
		return err;
	}
})

const usersSlice = createSlice({

	name:"users",
	initialState,
	reducers:{

	},
	extraReducers(builder){
		builder
		.addCase(fetchUsers.pending,(state,action)=>{
			state.status = 'loading'
		})
		.addCase(fetchUsers.fulfilled,(state,action)=>{
			state.status = 'succeeded'
			state.users = action.payload;
		})
		.addCase(fetchUsers.rejected,(state,action)=>{
			state.error = action.error;
		})
	}
})

export const selectAllUsers = state => state.users.users;
export const selectUserStatus = state => state.users.status;
export const selectUserError = state => state.users.error;

export const { LOGGED_OUT, LOGGED_IN } = usersSlice.actions;
export default usersSlice.reducer;