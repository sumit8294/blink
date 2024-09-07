import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faExpand, faVideoSlash } from '@fortawesome/free-solid-svg-icons'

import { usePeer } from "../../store/PeerContext";
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../../ReactResponsiveQueries';
import useAuth from '../../hooks/useAuth';

const MovableVideoCall = () => {

    const { maximizeVideoCall, caller, remoteStream, minimizeVideoCall, disconnectCall } = usePeer()
    const movableRef = useRef()
    const remoteVideoMovableRef = useRef()
	const {username,profile} = useAuth()
	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

    useEffect(()=>{
        if(remoteStream){
            remoteVideoMovableRef.current.srcObject = remoteStream
        }
    },[remoteStream]);

    useEffect(()=>{
		movableRef.current.addEventListener('mousedown', function(e) {
			// Change cursor to 'grabbing'
			movableRef.current.style.cursor = 'grabbing';
		
			// Calculate the offset between the mouse position and the top-left corner of the div
			let offsetX = e.clientX - movableRef.current.offsetLeft;
			let offsetY = e.clientY - movableRef.current.offsetTop;
		
			// Function to handle the mouse movement
			function onMouseMove(e) {
				// Update the position of the div
				movableRef.current.style.left = (e.clientX - offsetX) + 'px';
				movableRef.current.style.top = (e.clientY - offsetY) + 'px';
			}
		
			// Attach the mousemove event to the document
			document.addEventListener('mousemove', onMouseMove);
		
			// Stop moving when the mouse is released
			document.addEventListener('mouseup', function() {
				// Remove the mousemove event
				document.removeEventListener('mousemove', onMouseMove);
		
				// Reset cursor to 'grab'
				movableRef.current.style.cursor = 'grab';
			}, { once: true });
		});
	},[])

    return (
        <>

           <div ref={movableRef} className="relative z-30">
			<video ref={remoteVideoMovableRef} autoPlay muted className="h-44 w-32 tablet-sm:w-56 tablet-sm:h-40 absolute peer right-0 scale-x-[-1]"></video>
  
 
			<div className="hidden peer-hover:flex absolute h-44 w-32 tablet-sm:w-56 tablet-sm:h-40 z-30 right-0 top-0 justify-center items-center hover:flex">
				{!isMobileOrTablet && <div className=" peer-hover:flex hover:flex absolute w-56 h-16 z-40 right-0 top-0 flex p-2 bg-gradient-to-b from-gray-800">
					<img src={caller.profile} className="h-6 w-6 rounded-full mr-2" />
					<span className="text-sm">{caller.username}</span>
					<div onClick={disconnectCall} className="h-6 z-50 contact-options cursor-pointer flex absolute right-0">
						<span className="text-[10px] px-2 pt-1 mr-1 rounded-xl bg-red-600">
							<button>
							<FontAwesomeIcon icon={faVideoSlash} />
							</button>
							<span> End Call</span>
						</span>
					</div>
				</div>}
				<button onClick={maximizeVideoCall} className="h-8 rounded-[4px] z-50 bg-gray-800 px-2 hover:cursor-pointer">
				<FontAwesomeIcon icon={faExpand} />
				</button>
			</div>

			</div>

        </>
    )
}

export default MovableVideoCall;