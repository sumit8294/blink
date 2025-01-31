import {baseApi} from '../config';
import axios from 'axios';

const askForNotificationPermission = async (userId) => {


    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      
      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker.ready.then(async (sw) => {
          const subscription = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
          });
          
          axios.post(`${baseApi}/notifications/subscribe`, {userId,subscription})
          .then((res) => console.log(res.data.message))
          .catch((err) => console.error("Subscription failed", err));
        
        
        });
      }

    } else {
      console.log("Notification permission denied.");
    }
};

export default askForNotificationPermission;