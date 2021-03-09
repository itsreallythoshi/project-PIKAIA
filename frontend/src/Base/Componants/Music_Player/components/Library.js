import React from 'react';
import '../styles/library.css';

import LibrarySong from './LibrarySong';


const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isLibOpen,
  setIsLibOpen,
}) => {
  const renderSongItems = () => {
    return songs.map((song) => (
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
    <div className='active-library'>
      <div className="heading-container">
        <h2>Top Suggestions</h2>
      </div>
      <div className="library-songs">{renderSongItems()}</div>
    </div>
  );
};

export default Library;
