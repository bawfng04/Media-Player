import React, { useState, useEffect, useRef } from "react";
import "./MediaPlayer.css";

const MediaPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleError = () => {
    setError("Failed to load video. Please try again later.");
    setLoading(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      setLoading(false);
      setError("");
    } else {
      setError("No file selected.");
      setLoading(false);
    }
  };

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleSeek = (event) => {
    const time = event.target.value;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (event) => {
    const value = event.target.value;
    videoRef.current.volume = value;
    setVolume(value);
  };

  const handleMute = () => {
    const isCurrentlyMuted = !isMuted;
    videoRef.current.muted = isCurrentlyMuted;
    setIsMuted(isCurrentlyMuted);
  };

  return (
    <div className="media-player-container">
      <div className="media-player-controls">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="media-player-file-input"
        />
        {loading && <p className="media-player-loading">Loading video...</p>}
        {error && <p className="media-player-error">{error}</p>}
        {!loading && !error && fileURL && (
          <div>
            <video
              ref={videoRef}
              src={fileURL}
              onError={handleError}
              className="media-player-video"
              onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
            />
            <div className="media-player-control-buttons">
              <button onClick={handlePlay}>Play</button>
              <button onClick={handlePause}>Pause</button>
              <button onClick={handleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
            <div className="media-player-sliders">
              <input
                type="range"
                min="0"
                max={videoRef.current?.duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="media-player-seek-slider"
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="media-player-volume-slider"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
