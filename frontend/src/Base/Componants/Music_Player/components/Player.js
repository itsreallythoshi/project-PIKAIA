import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../utilities/playAudio";

import "../styles/Player.css";

const Player = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  nextSong,
  prevSong,
  buttonStatus,
  audioRef,
  songState,
  setSongState,
}) => {
  // helpers
  const getNormalTime = (time) => {
    if (time) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    } else {
      return "0:00";
    }
  };

  // event handlers
  const handlePlayPauseSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const handleSeekBarDrag = (event) => {
    audioRef.current.currentTime = event.target.value;
    setSongState({ ...songState, currentTime: event.target.value });
  };

  useEffect(() => {
    if (isPlaying) {
      playAudio(isPlaying, audioRef);
    }
  }, [currentSong, isPlaying, audioRef]);

  const handleAnimation = {
    transform: `translateX(${songState.seekbarPercentage * 17}%)`,
  };
  const trackAnimation = {
    transform: `translateX(${songState.seekbarPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="player__top">
        <div className="song-container">
          <img src={currentSong.cover} alt={currentSong.name} />
        </div>
        <div className="play-control">
          <div className="song-info">
            <h2>{currentSong.name}</h2>
            <h4>{currentSong.artist}</h4>
          </div>
          <div className="play-controlBottom">
            <button className="skip-back" disabled={!buttonStatus.previous}>
              <FontAwesomeIcon
                size="3x"
                icon={faAngleLeft}
                onClick={prevSong}
              />
            </button>
            <button className="play">
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                onClick={handlePlayPauseSong}
              />
            </button>
            <button className="skip-forward">
              <FontAwesomeIcon
                size="3x"
                icon={faAngleRight}
                onClick={nextSong}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="track_container">
        <p>{getNormalTime(songState.currentTime)}</p>
        <div
          className="track__handle"
          style={handleAnimation}
        ></div>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songState.duration}
            value={songState.currentTime}
            onChange={handleSeekBarDrag}
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{getNormalTime(songState.duration)}</p>
      </div>
    </div>
  );
};

export default Player;
