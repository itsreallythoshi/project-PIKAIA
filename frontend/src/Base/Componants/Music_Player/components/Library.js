import "../styles/Library.css";
import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ 
    songs,
    currentSong,
    setCurrentSong,
    setIsPlaying,
}) => {
    const renderSongItems = () => {
    return songs.map((song) =>(
        <LibrarySong
            key={song.id}
            song={song}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setIsPlaying={setIsPlaying}
        />
    ));
};
  return (
    <div className="library">
      <div className="heading-container">
        <h5>Top Suggestions</h5>
      </div>
      <div className="library-container">
      {renderSongItems()}
      </div>
    </div>
  );
}

export default Library;
