import { useState, useEffect } from "react";

const InstallPwaBtn = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        console.log("User choice:", choice.outcome);
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "16px" }}>
          Install PWA
        </button>
      )}
    </>
  );
};

export default InstallPwaBtn;
