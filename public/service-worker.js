importScripts("/config.js");
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installed");
    event.waitUntil(self.skipWaiting()); // Activate the service worker immediately
  });
  
  self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activated");
    event.waitUntil(self.clients.claim()); // Take control of all pages immediately
  });
  
  // Listening for Push Notifications
  self.addEventListener("push", (event) => {
    
    if (event.data) {
        
      const data = event.data.json();
      
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        data: { url: data.url }, // Custom data to open a specific page on click
      });
    }
  });

  
  
  // Handle Notification Clicks
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    
    event.waitUntil(
      
      clients.matchAll({ type: "window" }).then((clientList) => {
        console.log(`${self.baseApi}/${event.notification.data.url}`)
        if (clientList.length > 0) {
          clientList[0].focus();
        } else {
          clients.openWindow(`${self.baseApi}/${event.notification.data.url}` || "/");
        }
      })
    );
  });


