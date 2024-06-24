import React, { useState, useEffect, useRef } from "react";
import "./MediaPlayer.css";

const MediaPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  //ratio
  const videoRatios = [
    { label: "16:9", value: "16/9" },
    { label: "4:3", value: "4/3" },
    { label: "1:1", value: "1/1" },
    { label: "3:2", value: "3/2" },
  ];
  const [currentVideoRatio, setCurrentVideoRatio] = useState(
    videoRatios[0].value
  );

  const handleVideoRatioChange = (event) => {
    const ratioValue = event.target.value;
    setCurrentVideoRatio(ratioValue);
  };

  const videoStyle = {
    aspectRatio: currentVideoRatio,
  };

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

  const handleIsPlaying = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
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
          placeholder="input video file"
        />
        {loading && <p className="media-player-loading">Loading video...</p>}
        {error && <p className="media-player-error">{error}</p>}
        {!loading && !error && fileURL && (
          <div className="videoBox">
            <video
              ref={videoRef}
              src={fileURL}
              onError={handleError}
              className="media-player-video"
              onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
              style={videoStyle}
            />
            <div className="media-player-control-buttons">
              <button
                onClick={handleIsPlaying}
                style={{
                  backgroundColor: isPlaying ? "lightcoral" : "lightblue",
                  color: "white",
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={handleMute}
                style={{
                  backgroundColor: isMuted ? "lightcoral" : "lightblue",
                  color: "white",
                }}
              >
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
            <div className="media-player-control-buttons">
              {videoRatios.map((ratio) => (
                <button
                  className="media-player-control-buttons"
                  key={ratio.value}
                  value={ratio.value}
                  onClick={handleVideoRatioChange}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
