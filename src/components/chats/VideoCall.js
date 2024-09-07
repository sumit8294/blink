import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import { usePeer } from '../../store/PeerContext';
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faVideoSlash } from '@fortawesome/free-solid-svg-icons'

const VideoCall = ({
    participant,
}) => {

    const {socket} = useSocket();
    const {userId} = useAuth() 

    const {
        createOffer,
        handleAnswer,
        handleIceCandidate,
        remoteStream,
        localStream,
        setLocalStream,
        isConnected,
        makingCallOffer,
        minimizeVideoCall,
        disconnectCall
    } = usePeer();
  
    const localVideoRef = useRef()
    const remoteVideoRef = useRef()
    const videoGridRef = useRef();
    
   
    useEffect(()=>{
        if(remoteStream && isConnected){

           remoteVideoRef.current.srcObject = remoteStream
        }

        if(localStream && isConnected){

            localVideoRef.current.srcObject = localStream
        }

        
    },[remoteStream,localStream,isConnected]);

    // useEffect(()=>{
        
    //     if(!isLoading){
    //         setIsLoading(true)
    //         if((incomingCallOffer || makingCallOffer) && !isConnected){
                
    //             navigator.mediaDevices.getUserMedia({
    //                 video: true,
    //                 audio: true,
    //             }).then((stream) => {
    //                 setLocalStream(stream)
                    
    //                 localVideoRef.current.srcObject = stream;
                    
    //                 if(incomingCallOffer){
                       
    //                     // handleOffer({
    //                     //     offer:incomingCallOffer,
    //                     //     stream
    //                     // })

    //                 }else{
                    
    //                     createOffer({
    //                         participant,
    //                         stream
    //                     })
    //                 }

    //             }); 
                
    //         }

    //     }
		
	// },[socket,incomingCallOffer,isConnected,makingCallOffer,userId,participant,isLoading])

    useEffect(()=>{
        
        if(socket && !isConnected && makingCallOffer) {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            }).then((stream) => {
                setLocalStream(stream)
               
                localVideoRef.current.srcObject = stream;
                createOffer({
                    participant,
                    stream
                })
            })
        }
        
	},[socket,isConnected,makingCallOffer,participant])


    useEffect(()=>{
       
        if(socket && !isConnected){

            const videoCallAnswerCallback = ({answer})=>{ 
				handleAnswer({answer,userId})
			}
            const iceCandidateCallback = ({candidate})=>{
                handleIceCandidate({candidate})
			}
            
			socket.on('videoCallAnswer',videoCallAnswerCallback)
            socket.on('ice-candidate', iceCandidateCallback)

            return () => {
                socket.off('videoCallAnswer',videoCallAnswerCallback)
                socket.off('ice-candidate',iceCandidateCallback)
            }
		}
    },[socket,isConnected])

    const [isSwapped, setIsSwapped] = useState(false);

    const swapScreen = () => {
      setIsSwapped(!isSwapped);
    };


    return (
        <>
            
            <div ref={videoGridRef} className="relative scale-x-[-1] h-full">
                <div  className="z-40 absolute bottom-0 w-full flex justify-center p-2">
                    <button onClick={minimizeVideoCall} className="mx-2 bg-gray-800 px-2 opacity-80 w-16 text-[24px] h-16 rounded-full hover:cursor-pointer hover:opacity-100 transition-opacity duration-300">
                        <FontAwesomeIcon icon={faCompress} />
                    </button>
                    <button onClick={disconnectCall} className="bg-red-600 px-2 opacity-80 w-16 text-[24px] h-16 rounded-full hover:cursor-pointer hover:opacity-100 transition-opacity duration-300">
                        <FontAwesomeIcon icon={faVideoSlash} />
                    </button>
                </div>
                <video
                    ref={localVideoRef}
                    onClick={swapScreen}
                    autoPlay
                    muted
                    className={`absolute transition-all duration-500 ease-in-out 
                    ${isSwapped ? 'w-full h-full left-0 top-0' : 'h-56 w-40 tablet-sm:w-50 tablet-sm:h-40  z-50 left-0 top-0'}`}
                ></video>
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    onClick={swapScreen}
                    className={`transition-all duration-500 ease-in-out 
                    ${isSwapped ? 'h-56 w-40 tablet-sm:w-50 tablet-sm:h-40 absolute z-50 left-0 top-0' : 'w-full h-full'}`}
                ></video>
            </div>
        </>
    )
}

export default VideoCall;