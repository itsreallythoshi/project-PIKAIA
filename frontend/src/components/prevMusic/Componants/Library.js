import React from "react";
import "../Styles/Library.css";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, currentSong, setCurrentSong, setIsPlaying ,songState}) => {
  const renderSongItems = () => {
    return songs.map((song) => (
      <LibrarySong
        key={song.id}
        song={song}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        songState={songState}
      />
    ));
  
  };
  return (
    <div className="library">
      <div className="library__top">
        <h1>Top Suggetions</h1>
      </div>
      <div className="library__list">{renderSongItems()}</div>
    </div>
  );
};

export default Library;
