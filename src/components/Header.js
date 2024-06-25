import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

function Header() {
  const [about, setAbout] = useState(false);
  const [owner, setOwner] = useState(false);
  const aboutRef = useRef();

  const toggleAbout = () => {
    setAbout(!about);
  };
  const toggleOwner = () => {
    setOwner(!owner);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAbout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="App-header">
      <div className="appName">
        <h1>React Media Player</h1>
      </div>
      <div className="HeaderComponents">
        <nav>
          <ul>
            <li>
              <a href="http://localhost:3000/">Home</a>
            </li>
            <li>
              <button className="headerButtons" onClick={toggleAbout}>
                About
              </button>
              {about && (
                <div ref={aboutRef} className="about-info fadeIn">
                  <p>
                    This is a media player that allows you to play videos,
                    control playback speed, and adjust volume. You can also mute
                    the video and seek to a specific time in the video, capture
                    screenshot. The media player is built using React and styled
                    with CSS.
                    <br></br>
                  </p>
                  <button className="closeButtonHeader" onClick={toggleAbout}>
                    Close
                  </button>
                </div>
              )}
            </li>
            <li>
              <button className="headerButtons" onClick={toggleOwner}>
                Owner
              </button>
              {owner && (
                <div className="owner-info fadeIn">
                  <p>This media player is created by bangwoo4.</p>
                  <button className="closeButtonHeader" onClick={toggleOwner}>
                    Close
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
