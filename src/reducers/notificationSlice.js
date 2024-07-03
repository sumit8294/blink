import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseApi } from "../config"
import axios from "axios"

export const  createNotification = createAsyncThunk('createNotificaiton', async ({token,body}) =>{

    try{
        const response = await axios.post(
            `${baseApi}/notifications`,
            body,
            {
                withCredentials: true,
                headers:{
                    'Authentication': `Bearer ${token}`
                }
            }
        )

        return response.data
    }
    catch(error){
        const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    	throw new Error(errorMessage);
    }
    
})

export const getNotifications = createAsyncThunk('getNotifications',async({token,userId})=>{

    try {
        const response = await axios.get(
            `${baseApi}/notifications/${userId}`,
            {
                withCredentials:true,
                headers:{
                    'Authentication': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        const  errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
        throw new Error(errorMessage)
    }
})

const initialState = {
    notifications: [],
    status: 'idle' // 'idle' 'succeeded' 'failed'
}

const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    reducers:{
        setState:(state,action)=>{
            state.status = action.payload
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getNotifications.fulfilled, (state,action)=>{
                state.notifications = action.payload
            })
    }
})

export const selectAllNotifications = state => state.notifications.notifications;

export default notificationSlice.reducer;