import {createSlice,createAsyncThunk} from '@reduxjs/tookit';

const initialState = {
	user: {},
	name: 'users',
	status: 'idle',
	error: null,
}


