import React from "react";
import "../Styles/LibrarySong.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

const LibrarySong = ({ song, currentSong, setCurrentSong, songState }) => {
  // handlers
  const handleSelectSong = () => {
    setCurrentSong(song);
  };

  const getNormalTime = (time) => {
    if (time) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    } else {
      return "0:00";
    }
  };

  return (
    <div
      className={`librarySong ${song.id === currentSong.id ? "active" : ""}`}
      onClick={handleSelectSong}
    >
      <img className="librarySong__album" src={song.cover} alt={song.name} />
      <div className="librarySong__name">
        <h5>{song.name}</h5>
        <div className="librarySong__artistDummy">
          <p>{song.artist}</p>
        </div>
      </div>
      <div className="librarySong__artist">
        <h5>{song.artist}</h5>
      </div>
      <div className="librarySong__time">
        <h5>{getNormalTime(songState.duration)}</h5>
      </div>
      <div className="librarySong__rating">
        <FavoriteOutlinedIcon className="musicWidget__button" />
        <MoreVertIcon className="musicWidget__button" />
      </div>
    </div>
  );
};

export default LibrarySong;
