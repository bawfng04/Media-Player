import React from "react";

function MediaPlayer() {
  return (
    <div className="App-media-player">
      <h1>Media Player</h1>
      <video
        controls
        src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
      ></video>
    </div>
  );
}

export default MediaPlayer;
