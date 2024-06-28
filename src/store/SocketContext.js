import { createContext, useContext, useEffect, useState } from "react"

import useAuth from '../hooks/useAuth';
import makeConnection from '../services/socketService';

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({children}) =>{

    const {userId} = useAuth();
	const [socket,setSocket] = useState(null)
	const [onlineUsers,setOnlineUsers] = useState(new Map())
 
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
		return () => {
			socket.off('getOnlineUser')
			socket.off('getOfflineUser')
		}

		}
	},[socket])

	const fun = (chatId,sender) =>{
		socket.emit('lastMessageSeened',{chatId,sender})
	}

    return <SocketContext.Provider value={{socket,onlineUsers,fun}}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider;