import {baseApi} from '../config';
import axios from 'axios';
import Cookies from "js-cookie"

const askForNotificationPermission = async (userId) => {


    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      
      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker.ready.then(async (sw) => {
          const subscription = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY),
          });
          
          axios.post(`${baseApi}/notifications/subscribe`, {userId,subscription})
          .then((res) =>Cookies.set("pushSubscribed", "true", { expires: 365 }))
          .catch((err) => console.error("Subscription failed", err));
        
        
        });
      }

    } else {
      console.log("Notification permission denied.");
    }

    
}

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

export default askForNotificationPermission;
