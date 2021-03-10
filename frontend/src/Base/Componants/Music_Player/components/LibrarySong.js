import React from "react";
import "../styles/LibrarySong.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const LibrarySong = ({ song, currentSong, setCurrentSong }) => {
  // handlers
  const handleSelectSong = () => {
    setCurrentSong(song);
  };

  return (
    <div
      className={`library-song ${song.id === currentSong.id ? "active" : ""}`}
      onClick={handleSelectSong}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h5>{song.artist}</h5>
      </div>
      <div className="song-rating">
        <button>
          <FontAwesomeIcon icon={faHeart} size="2x" />{" "}
        </button>
        <button>
          <FontAwesomeIcon icon={faEllipsisV} size="2x" />{" "}
        </button>
      </div>
    </div>
  );
};

export default LibrarySong;
