import { createContext, useRef, useState, useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { useSocket } from "./SocketContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getActiveChatId, setActiveChatId } from "../reducers/chatSlice";

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from './../ReactResponsiveQueries';

export const PeerContext = createContext()

export const usePeer = () => useContext(PeerContext)

const PeerProvider = ({children}) => {

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

    
	const {socket} = useSocket()
	const {token, ...loggedInUser} = useAuth()
	const {userId} = useAuth()

	const peerConnections = useRef({});
	const [remoteStream,setRemoteStream] = useState(null)
	const [localStream,setLocalStream] = useState(null)
	const [isConnected,setIsConnected] = useState(false)

	const [caller,setCaller] = useState(null);
	const [callConfirmDialog,setCallConfirmDialog] = useState(false);
	const [incomingCallOffer,setIncomingCallOffer] = useState(null);
	const [callAccepted,setCallAccepted] = useState(false);
	const [makingCallOffer,setMakingCallOffer] = useState(false);
	const [peerType,setPeerType] = useState(null);
	const [isMovable,setIsMovable] = useState(false);
	const [disconnected,setDisconnected] = useState(false);
	const [isMaximize,setIsMaximize] = useState(false);

	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useDispatch()
	const activeChatId = useSelector(getActiveChatId)

	useEffect(()=>{
		
	},[])
	

	useEffect(()=>{
		if(params["*"] !== 'messages'){
			setIsMovable(true)
		}else{
			if(isMobileOrTablet){
				if(isMaximize){
					setIsMovable(false)
				}else{
					setIsMovable(true)
				}
				
			}else{
				if(activeChatId === null || activeChatId === 'null' || activeChatId === undefined || activeChatId === 'undefined'){
					setIsMovable(false)
				}else{
					setIsMovable(true)
				}
			}
			
		}
		
	},[params,activeChatId])

	const maximizeVideoCall = () => {
		navigate("/messages")
		
		if(!isMobileOrTablet){
			dispatch(setActiveChatId(null))
		}else{
			setIsMaximize(true)
		}
		setIsMovable(false)
		
	}
	const minimizeVideoCall = () => {
		if(isMobileOrTablet){
			setIsMaximize(false)
		}
		setIsMovable(true)
	}
	

    const createOffer = ({participant,stream}) => {
		
		const peerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: ['stun:stun1.l.google.com:19302', 'stun:stun3.l.google.com:19302']
				}
			]
		});
		peerConnections.current[userId] = peerConnection;

		stream.getTracks().forEach(track => {
			peerConnection.addTrack(track,stream)
		});

		peerConnection.onicecandidate = (event) => {
			if(event.candidate) {
				socket.emit('ice-candidate', {candidate:event.candidate, to : participant._id})
			}
		}

		peerConnection.ontrack = (event) => {
			setRemoteStream(event.streams[0])
			
		}

		peerConnection.createOffer().then((offer)=>{
			peerConnection.setLocalDescription(offer)
			socket.emit('videoCallOffer', {offerTo : participant._id,offerFrom : loggedInUser, offer})
			
		}).catch((error)=>{console.log(error)})

		peerConnection.oniceconnectionstatechange = () => {
			const iceState = peerConnection.iceConnectionState
			if (iceState === 'failed') {
				setIsConnected(false)
				peerConnection.restartIce();
			}
			else if(iceState === 'connected' || iceState === 'completed'){
				setIsConnected(true)
			}
			else if(iceState === 'disconnected' || iceState === 'closed'){
				stream.getTracks().forEach(track => track.stop());
				disconnectCall()
			}
			console.log('ICE connection state: ', iceState);
		};

	}


    const handleOffer = ({offer,stream}) => {
		
		const peerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: ['stun:stun1.l.google.com:19302', 'stun:stun3.l.google.com:19302']
				}
			]
		});
		peerConnections.current[userId] = peerConnection;

		stream.getTracks().forEach(track => {
			peerConnection.addTrack(track, stream)
		})
		
		peerConnection.setRemoteDescription(new RTCSessionDescription(offer))

		peerConnection.createAnswer().then((answer)=>{
			peerConnection.setLocalDescription(answer)
			socket.emit('videoCallAnswer',{answer, answerTo: caller.userId})
			
		})

		peerConnection.onicecandidate = (event) => {
			if(event.candidate){
				socket.emit('ice-candidate',{candidate:event.candidate,to: caller.userId})
			}
		}

		peerConnection.ontrack = (event) => {
			
			setRemoteStream(event.streams[0])
			
		}

		peerConnection.oniceconnectionstatechange = () => {
			const iceState = peerConnection.iceConnectionState
			if (iceState === 'failed') {
				setIsConnected(false)
				peerConnection.restartIce();
			}
			else if(iceState === 'connected' || iceState === 'completed'){
				setIsConnected(true)
			}
			else if(iceState === 'disconnected' || iceState === 'closed'){
				stream.getTracks().forEach(track => track.stop());
				disconnectCall();
			}
			console.log('ICE connection state: ', iceState);
		};

	}
	
    const handleAnswer = ({ answer }) => {
		const peerConnection = peerConnections.current[userId];		
		
		if (peerConnection.signalingState === "have-local-offer") {
			peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
				.catch(error => {
					console.error("Failed to set remote description:", error);
				});
		} else {
			console.warn("Unexpected signaling state:", peerConnection.signalingState);
		}
	};

    const handleIceCandidate = ({candidate}) => {
		Object.values(peerConnections.current).forEach((peerConnection) => {
		  peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
			.catch(error => {
			  console.error("Failed to add ICE candidate:", error);
			});
		});
	};

	const disconnectCall = () => {
		
		if(peerConnections.current[userId]){
			peerConnections.current[userId].close()
			peerConnections.current[userId] = null;
			
		}
		
		
		if(params["*"] === "messages"){
			navigate("/messages")
			setIsMovable(false)
		}

		if(localStream){
			localStream.getTracks().forEach(track => track.stop());
		}


		setRemoteStream(null)
		setCaller(null)
		setIncomingCallOffer(null)
		setPeerType(null)
		setIsConnected(false)
		setCallAccepted(false)
		setMakingCallOffer(false)
		setIsMovable(false)
		setDisconnected(true)
		setIsConnected(false);
		setLocalStream(null)
			
		
	}

	const eventOnCallDisconnect = () => {
		setDisconnected(false)
	}


	const eventOnCallAccept = () => {
		navigate('/messages')
		// setIsMovable(false);
		setCallConfirmDialog(false);
		setCallAccepted(true)

		if(incomingCallOffer && !isConnected){
                
			navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			}).then((stream) => {
				setLocalStream(stream)
				
				setLocalStream(stream)
				
					handleOffer({
						offer:incomingCallOffer,
						stream
					})

			}); 
			
		}
	}

	const eventOnConfirmCreateCall = () => {
		setCallConfirmDialog(false);
		setIsMovable(false);

		setMakingCallOffer(true);
	}
	

	const eventOnDeclineCreateCall = () => {
		setCallConfirmDialog(false);
	}

	const eventOnCallDecline = () => {
		setCallConfirmDialog(false);
	}


	useEffect(()=>{
		if(socket && !isConnected){

			const videoCallOfferCallback = ({offer,offerFrom})=>{
				setCaller(offerFrom)
				setCallConfirmDialog(true)
				setIncomingCallOffer(offer)
				setPeerType("receiver")
				
			}
			socket.on('videoCallOffer',videoCallOfferCallback)

			return () => {
				socket.off('videoCallOffer',videoCallOfferCallback)
			}
		}
		
	},[socket,isConnected])

    return <PeerContext.Provider value={{
            createOffer,
            handleOffer,
			handleAnswer,
            handleIceCandidate,
			remoteStream,
			isConnected,
			caller,
			setCaller,
			callAccepted,
			incomingCallOffer,
			callConfirmDialog,
			setCallConfirmDialog,
			makingCallOffer,
			setCallAccepted,
			eventOnCallAccept,
			eventOnCallDecline,
			eventOnConfirmCreateCall,
			eventOnDeclineCreateCall,
			eventOnCallDisconnect,
			peerType,
			setPeerType,
			isMovable,
			setIsMovable,
			maximizeVideoCall,
			minimizeVideoCall,
			localStream,
			setLocalStream,
			disconnectCall,
			disconnected,
			isMaximize
        }}>
        {children}
    </PeerContext.Provider>
}

export default PeerProvider