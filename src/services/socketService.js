import io from "socket.io-client";
import {baseApi} from '../config';
import useAuth from "../hooks/useAuth";

const ENDPOINT = baseApi;

const makeConnection = (userId) =>{
    const socket = io.connect(baseApi,{
        query:{
            userId
        }
    });
    return socket;
}


export default makeConnection;