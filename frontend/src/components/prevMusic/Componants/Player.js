import "../Styles/Player.css";
import React, { useEffect } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { playAudio } from "../Utils/playAudio";
import ButtonIcon from "./ButtonIcon";
import { green } from "@material-ui/core/colors";

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

  const trackAnimation = {
    transform: `translateX(${songState.seekbarPercentage}%)`,
  };
  return (
    <div className="musicWidget">
      <div className="musicWidget__album">
        <img src={currentSong.cover} alt={currentSong.name} />
      </div>
      <div className="musicWidget__Info">
        <h3>{currentSong.name}</h3>
        <p>{currentSong.artist}</p>
      </div>
      <div className="musicWidget__container">
        <div className="musicWidget__controls">
          <button className="button skip-back">
            <SkipPreviousIcon
              onClick={prevSong}
              disabled={!buttonStatus.previous}
            />
          </button>
          <button onClick={handlePlayPauseSong}>
            <ButtonIcon
              className="ButtonIcon"
              icon={
                isPlaying ? (
                  <PauseCircleOutlineIcon
                    style={{ color: green[50], fontSize: 60 }}
                  />
                ) : (
                  <PlayCircleOutlineIcon
                    style={{ color: green[50], fontSize: 60 }}
                  />
                )
              }
            />{" "}
          </button>
          <button className="button skip-forward">
            <SkipNextIcon onClick={nextSong} />
          </button>
        </div>
        <div className="musicWidget__trackContainer">
          <p>{getNormalTime(songState.currentTime)}</p>
          <div className="track">
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
      <div className="musicWidget__other">
        <FavoriteOutlinedIcon className="musicWidget__button" />
        <MoreVertIcon className="musicWidget__button" />
      </div>
    </div>
  );
};

export default Player;
