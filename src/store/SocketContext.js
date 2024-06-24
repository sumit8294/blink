import { createContext, useEffect, useState } from "react"

import useAuth from '../hooks/useAuth';
import makeConnection from '../services/socketService';

export const SocketContext = createContext();
const SocketProvider = ({children}) =>{

    const {userId} = useAuth();
	const [socket,setSocket] = useState(null)

    useEffect(()=>{
		const newSocket = makeConnection();
		setSocket(newSocket)

		return () => newSocket.close();
	},[])

	useEffect(()=>{
		if(socket) socket.emit("join_room",userId);
	},[socket,userId])

    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider;