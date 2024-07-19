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

export const  setNotificationsRead = createAsyncThunk('setNotificationsRead', async ({token,userId}) =>{

    try{
        const response = await axios.put(
            `${baseApi}/notifications/read/${userId}`,
            {},
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
    
    const url = `${baseApi}/notifications/${userId}`;
    
    try {
        const response = await axios.get(
            url,
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

export const fetchUnreadNotificationCount = createAsyncThunk('fetchUnreadNotificationCount',async({token,userId})=>{
    
    const url = `${baseApi}/notifications/count/${userId}`;
    
    try {
        const response = await axios.get(
            url,
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
    status: 'idle', // 'idle' 'succeeded' 'failed'
    unreadNotificationCount: 0
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
            .addCase(fetchUnreadNotificationCount.fulfilled, (state,action)=>{
                state.unreadNotificationCount = action.payload
            })
            .addCase(setNotificationsRead.fulfilled, (state,action)=>{
                state.unreadNotificationCount = 0
            })
    }
})

export const selectAllNotifications = state => state.notifications.notifications;
export const selectUnreadNotificationCount = state => state.notifications.unreadNotificationCount;

export default notificationSlice.reducer;