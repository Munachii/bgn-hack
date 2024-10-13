import React, { useRef, useState } from 'react';

function AudioPlayer({ audioSrc }) {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the audio is playing

  // Play the audio
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the audio
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Stop the audio and reset to the beginning
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
      setIsPlaying(false);
    }
  };

  return (
    <div>
      {/* Audio element that will play the file */}
      <audio ref={audioRef} src={audioSrc} />

      {/* Control buttons */}
      <button onClick={handlePlay} disabled={isPlaying}>
        Play
      </button>
      <button onClick={handlePause} disabled={!isPlaying}>
        Pause
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </div>
  );
}

export default AudioPlayer;
