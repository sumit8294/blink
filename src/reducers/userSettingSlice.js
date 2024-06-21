import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {baseApi} from '../config'

export const updateSettings = createAsyncThunk('settings/updateSettings', async ({userId,body,token})=>{
	console.log('update settings')
	const response = await axios.patch(
		`${baseApi}/users/settings/update/${userId}`,
        body,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

export const getSettings = createAsyncThunk('settings/getSettings', async ({userId,token})=>{
	
	const response = await axios.get(
		`${baseApi}/users/settings/${userId}`,
		{
			withCredentials:true,
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}
	)
	return response.data;

})

const initialState = {
	settings: [],
	status: 'idle',
	error: null,
}

const settingSlice = createSlice({
	name: 'settings',
	initialState,
	reducers:{
		resetSettings:(state,action)=>{
			state = initialState
			console.log("hhhsd reseteddd",state)
		}
	},
	extraReducers:(builder)=>{
		builder
		.addCase(getSettings.pending, (state,action)=>{
			state.status = 'loading'
		})
		.addCase(getSettings.fulfilled, (state,action)=>{
			state.status = 'succeeded'
			state.settings = action.payload
		})
		.addCase(getSettings.rejected, (state,action)=>{
			console.log(action);
		})
		.addCase(updateSettings.fulfilled, (state,action)=>{
			state.status = 'updated'
		})
		
		
	}
})

export const selectUserSettings = state => state.settings.settings
export const selectGetSettingsStatus = state => state.settings.status
export const {resetSettings} = settingSlice.actions

export default settingSlice.reducer;
