import React from "react";
import Track from "../Track/Track";

export default class SearchResult extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2 id="result">Results</h2>
        <div className="TrackList">
          {this.props.tracks.map((track) => {
            return (
              <Track
                key={track.id}
                addToPlaylist={this.props.addToPlaylist}
                trackAction="+"
                id={track.id}
                uri={track.uri}
                name={track.name}
                artist={track.artist}
                album={track.album}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
