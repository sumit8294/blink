import { useState, useEffect } from 'react';

const VideoPlayer = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Load the YouTube Player API script
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // Create the player instance when the script has loaded
    script.onload = () => {
      setPlayer(new window.YT.Player('player', {
        videoId: 'z4fJ9i2yNEQ',
        playerVars: {
          autoplay: 0,
          controls: 1,
        },
        events: {
          onReady: () => {
            console.log('Player ready');
          },
        },
      }));
    };
  }, []);

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const handlePlay = () => {
    if (player) {
      player.playVideo();
    }
  };

  return (
    <>
      <div id="player"></div>
      <div className="button-container">
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Play</button>
      </div>
    </>
  );
};

export default VideoPlayer;
