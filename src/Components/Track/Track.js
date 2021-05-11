import React from "react";

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    // I also know how to 'bind' in the constructor :)
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
    this.handleDeleteFromPlaylist = this.handleDeleteFromPlaylist.bind(this);
  }
  handleAddToPlaylist(e) {
    e.preventDefault();
    this.props.addToPlaylist({
      id: this.props.id,
      name: this.props.name,
      artist: this.props.artist,
      album: this.props.album,
      uri: this.props.uri,
    });
  }
  handleDeleteFromPlaylist(e) {
    e.preventDefault();
    this.props.deleteFromPlaylist(this.props.id);
  }
  render() {
    if (this.props.trackAction === "+") {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.name}</h3>
            <p>
              {this.props.artist} | {this.props.album}
            </p>
          </div>
          {/* eslint-disable-next-line */}
          <a onClick={this.handleAddToPlaylist} className="Track-action">
            +
          </a>
        </div>
      );
    } else {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.name}</h3>
            <p>
              {this.props.artist} | {this.props.album}
            </p>
          </div>
          {/* eslint-disable-next-line */}
          <a onClick={this.handleDeleteFromPlaylist} className="Track-action">
            -
          </a>
        </div>
      );
    }
  }
}
