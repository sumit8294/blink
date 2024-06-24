import io from "socket.io-client";
import {baseApi} from '../config';

const ENDPOINT = baseApi;

const makeConnection = () =>{
    const socket = io.connect(baseApi);
    return socket;
}


export default makeConnection;