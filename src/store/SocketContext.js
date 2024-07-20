import { createContext, useContext, useEffect, useState } from "react"

import useAuth from '../hooks/useAuth';
import makeConnection from '../services/socketService';
import {useDispatch,useSelector} from 'react-redux';
import {
	fetchChatMessages,
	getActiveChatId,
	setActiveChatId,
	getChatsByUserId,
	fetchUnseenChatsCount
} from '../reducers/chatSlice';
import {setNewNotification} from '../reducers/notificationSlice'

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({children}) =>{

    const {userId,token} = useAuth();
	const [socket,setSocket] = useState(null)
	const [onlineUsers,setOnlineUsers] = useState(new Map())
	const activeChatId = useSelector(getActiveChatId);
	const dispatch = useDispatch()
 
    useEffect(()=>{
		const newSocket = makeConnection(userId);
		setSocket(newSocket)

		return () => {
			newSocket.close();
		}
	},[])

	useEffect(()=>{
		if(socket) {
			socket.emit("join_room",userId);
		
		socket.on('getOnlineUser',(data)=> {

			setOnlineUsers(new Map(onlineUsers.set(data)))
			
		})

		socket.on('getOfflineUser',(data)=> {

			onlineUsers.delete(data)

			setOnlineUsers(new Map(onlineUsers))

		})

		socket.on('send_message', (data) => {

		  if (activeChatId) dispatch(fetchChatMessages({ token, chatId: activeChatId, userId }));
			
		  else console.log('no active chat id')
		  
		  dispatch(getChatsByUserId({ userId, token }))

		  dispatch(fetchUnseenChatsCount({userId,token}))

		});

		socket.on('send_notification', (data)=>{

			dispatch(setNewNotification(data))
		})

		return () => {
			socket.off('getOnlineUser')
			socket.off('getOfflineUser')
			socket.off('send_message')
			socket.off('send_notification')
		}

		}

	}, [ socket,activeChatId ] )

	const emitLastMessageSeened = (chatId,sender) => {

		socket.emit('lastMessageSeened',{chatId,sender})
		
	}

    return <SocketContext.Provider value={{socket,onlineUsers,emitLastMessageSeened}}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider;