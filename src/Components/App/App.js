import React from "react";
import "../../reset.css";
import "../../styles.css";
import { SearchBar } from "../SearchBar/SearchBar";
import SearchResult from "../SearchResult/SearchResult";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../Util/Spotify";

class App extends React.Component {
  // Utilising JS Class Fields specs, instead of using constructor,
  // and binding. For functions, using an arrow function binds the
  // function scope to the current instance automatically.
  state = {
    trackList_searchResult: [],
    trackList_playlist: [],
    playlistName: "",
    curPlay: [],
    loggedIn: false,
  };

  componentDidMount = () => {
    // We check the access_token
    if (window.location.href.match(/access_token=([^&]*)/) !== null) {
      this.setState({
        loggedIn: true,
      });
      Spotify.getAccessToken();
      // cleaning up the address bar
      window.history.pushState("Access Token", null, "/jammitjason");
    } // else - nothing. wait for log in.
  };

  getPlaylistName = (newName) => {
    this.setState({
      playlistName: newName,
    });
  };

  postPlaylist = () => {
    const playlistNameToPost = this.state.playlistName;
    if (playlistNameToPost === "" || this.state.trackList_playlist === []) {
      alert("Please enter playlist name!");
    } else {
      const urisToPost = this.state.trackList_playlist.map(
        (track) => track.uri
      );
      Spotify.postPlaylist(playlistNameToPost, urisToPost);
    }
  };

  loginToSpotify() {
    Spotify.getAccessPermission();
  }

  searchTracks = (trackName) => {
    console.log(`searching ${trackName}`);
    // if(Spotify.getAccessToken() !== 0 ){
    if (this.state.loggedIn) {
      // storing the returned tracks as an array.
      Spotify.search(trackName).then((tracks) =>
        this.setState({
          trackList_searchResult: tracks,
        })
      );
    }
  };

  getPlaylists = () => {
    Spotify.getPlaylist().then((res) => {
      if (res) {
        this.setState({
          curPlay: res,
        });
      }
    });
  };

  addToPlaylist = (track) => {
    // the input track must be an object
    // check if the playlist already has this song, if not, add!
    if (
      this.state.trackList_playlist.every(
        (playlistTrack) => playlistTrack.id !== track.id
      )
    ) {
      this.setState({
        // add using spread syntax
        trackList_playlist: [...this.state.trackList_playlist, track],
      });
    }
  };

  deleteFromPlaylist = (trackId) => {
    this.setState({
      trackList_playlist: this.state.trackList_playlist.filter(
        (playlistTrack) => playlistTrack.id !== trackId
      ),
    });
  };

  render() {
    if (!this.state.loggedIn) {
      // If the user is not logged in to Spotify, show the login button
      return (
        <div>
          <h1 className="title">
            Jamm <span className="highlight">it</span> Jason!
          </h1>
          <div className="App">
            <div id="curpBox">
              <button id="clickToLogin" onClick={this.loginToSpotify}>
                Click to Login!
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      // If the user is logged in to Spotify, show the search bar, etc.
      // 1. Search songs
      // 2. When search is completed and the corresponding state is updated,
      //    SearchResult component will update the UI automatically.

      return (
        <div>
          <h1 className="title">
            Jamm <span className="highlight">it</span> Jason!
          </h1>
          <div className="App">
            <SearchBar searchTracks={this.searchTracks} />
            <div className="App-playlist">
              <SearchResult
                addToPlaylist={this.addToPlaylist}
                tracks={this.state.trackList_searchResult}
              />
              <Playlist
                postPlaylist={this.postPlaylist}
                getPlaylistName={this.getPlaylistName}
                deleteFromPlaylist={this.deleteFromPlaylist}
                tracks={this.state.trackList_playlist}
              />
            </div>
            <div id="curpBox">
              <button id="getcurp" onClick={this.getPlaylists}>
                {" "}
                Get current playlists{" "}
              </button>
              <div id="curPlay">
                <ol>
                  {this.state.curPlay.map((item) => {
                    return <li> {item} </li>;
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
