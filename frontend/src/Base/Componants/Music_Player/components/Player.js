import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../utilities/playAudio";
import "../styles/player.css";

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

  // styles
  const trackAnimation = {
    transform: `translateX(${songState.seekbarPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="player__top">
        <div className="song-container">
          <img src={currentSong.cover} alt={currentSong.name} />
        </div>
        <div className="player__right">
          <h2>{currentSong.name}</h2>
          <h3>{currentSong.artist}</h3>
          <div className="play__control">
            <button disabled={!buttonStatus.previous}>
              <FontAwesomeIcon
                className="play__skipBtn"
                icon={faStepBackward}
                onClick={prevSong}
                size="2x"
              />
            </button>
            <button>
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                onClick={handlePlayPauseSong}
                className="play__playBtn"
                size="2x"
              />
            </button>
            <button disabled={!buttonStatus.next}>
              <FontAwesomeIcon
                className="play__skipBtn"
                icon={faStepForward}
                onClick={nextSong}
                size="2x"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="time-control">
        <p>{getNormalTime(songState.currentTime)}</p>
        <div className="track">
          <input
            type="range"
            min={0}
            max={songState.duration}
            value={songState.currentTime}
            onChange={handleSeekBarDrag}
          />
          <div style={trackAnimation} className="animate-track"/>
        </div>
        <p>{getNormalTime(songState.duration)}</p>
      </div>
    </div>
  );
};

export default Player;
