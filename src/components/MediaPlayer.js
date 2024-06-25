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
  //playback speed
  const playbackSpeeds = [0.5, 1, 1.5, 2];
  const [currentPlaybackSpeed, setCurrentPlaybackSpeed] = useState(1);
  const handlePlaybackSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setCurrentPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };
  //loop
  const [isLooping, setIsLooping] = useState(false);
  const handleLoop = () => {
    setIsLooping(!isLooping);
    videoRef.current.loop = !isLooping;
  };
  //screenshot
  const [screenshotURL, setScreenshotURL] = useState("");

  const handleCaptureScreenshot = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageURL = canvas.toDataURL("image/png");
    setScreenshotURL(imageURL);
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
              autoplay
              onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
              style={videoStyle}
            />
            <div className="media-player-control-buttons">
              <button
                onClick={handleIsPlaying}
                className={isPlaying ? "on" : "off"}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={handleMute} className={isMuted ? "on" : "off"}>
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <button onClick={handleLoop} className={isLooping ? "on" : "off"}>
                {isLooping ? "Unloop" : "Loop"}
              </button>
            </div>
            <div className="media-player-sliders">
              <label>Seek:</label>
              <input
                type="range"
                min="0"
                max={videoRef.current?.duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="media-player-seek-slider"
              />
              <div className="videoInfoDisplay">
                <p>
                  {currentTime} / {videoRef.current?.duration} s
                </p>
              </div>

              <label>Volume:</label>
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
            <div className="videoInfoDisplay">
              <p>{volume * 100} %</p>
            </div>
            <div className="selectButton">
              <label>Video Ratio:</label>
              <select
                onChange={handleVideoRatioChange}
                value={currentVideoRatio}
              >
                {videoRatios.map((ratio) => (
                  <option key={ratio.label} value={ratio.value}>
                    {ratio.label}
                  </option>
                ))}
              </select>

              <label>Playback Speed:</label>
              <select
                onChange={handlePlaybackSpeedChange}
                value={currentPlaybackSpeed}
              >
                {playbackSpeeds.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}
                  </option>
                ))}
              </select>
            </div>
            <div className="screenshotdiv">
              <button
                className="screenshotButton"
                onClick={handleCaptureScreenshot}
              >
                Capture Screenshot
              </button>
              {screenshotURL && (
                <img
                  src={screenshotURL}
                  alt="Screenshot"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
