import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} />
      <div className="song-info">
        <h2>{currentSong.name}</h2>
        <h6>{currentSong.artist}</h6>
      </div>
    </div>
  );
};

export default Song;
