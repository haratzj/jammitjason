import React from "react";
import Track from "../Track/Track";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }
  onChangeHandler(e) {
    e.preventDefault();
    const newName = document.getElementById("playlistInput").value;
    this.props.getPlaylistName(newName);
  }
  render() {
    return (
      <div className="Playlist">
        <input
          id="playlistInput"
          // we can also bind here, but could cause performance issues
          onChange={this.onChangeHandler.bind(this)}
          placeholder="Enter Playlist Name"
        />
        <div className="TrackList">
          {this.props.tracks.map((track) => {
            return (
              <Track
                deleteFromPlaylist={this.props.deleteFromPlaylist}
                id={track.id}
                key={track.id}
                trackAction="-"
                name={track.name}
                artist={track.artist}
                album={track.album}
              />
            );
          })}
        </div>
        {/* eslint-disable-next-line */}
        <a onClick={this.props.postPlaylist} className="Playlist-save">
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}
