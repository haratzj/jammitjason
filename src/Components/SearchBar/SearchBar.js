import React from "react";

export class SearchBar extends React.Component {
  handleSearchTracks = (e) => {
    e.preventDefault();
    let songTitle = document.getElementsByTagName("input")[0].value;
    this.props.searchTracks(songTitle);
  };
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" />
        {/* eslint-disable-next-line */}
        <a onClick={this.handleSearchTracks}>SEARCH</a>
      </div>
    );
  }
}
