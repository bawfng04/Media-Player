import "./App.css";
import React from "react";
import Header from "./components/Header";
import MediaPlayer from "./components/MediaPlayer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
      </div>
      <div className="App-media-player">
        <MediaPlayer />
      </div>
      <div className="App-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
