const client_id = "976b8fcc5dd94cb88e490f959d9afbda";
const url = "https://accounts.spotify.com/authorize";
const uri = "https://jsheiban.club/jammitjason/";
// const uri = "http://localhost:3000/";
const scopes =
  "playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private";
const endpoint = `${url}?client_id=${client_id}&response_type=token&redirect_uri=${uri}&state=jsh23eiban&scope=${scopes}`;

let accessToken = null;

let userId;
let playlistId;

export const Spotify = {
  getAccessPermission() {
    window.location = endpoint;
  },
  getAccessToken() {
    // store accessToken
    if (
      !accessToken &&
      window.location.href.match(/access_token=([^&]*)/) !== null
    ) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    } else {
      console.log("Somehow calling get access permission in else!?");
      this.getAccessPermission();
    }

    return;
  },

  getPlaylist() {
    return fetch(
      "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/jasonji/playlists",
      {
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        return jsonResponse.items.map((item) => {
          return item.name;
        });
      });
  },

  search(trackName) {
    let urlAfterToken = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?q=${trackName}&type=track`;

    return fetch(urlAfterToken, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error(response);
            throw new Error(
              `Something went wrong with the response!: ${response}`
            );
          }
        },
        (networkError) => {
          console.log(networkError.message);
        }
      )
      .then((jsonResponse) => {
        // returning the tracks as an organised array
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.album.name,
            album: track.artists[0].name,
            uri: track.uri,
          };
        });
      });
  },

  postPlaylist(playlistName, trackUris) {
    let getIdUrl =
      "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me";
    // getIdUrl = isLocal ? heroku+getIdUrl : getIdUrl;
    fetch(getIdUrl, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong while getting the user ID!");
        },
        (networkError) => {
          console.log("Trying to get the id...");
          console.log(networkError.message);
        }
      )
      .then((jsonResponse) => (userId = jsonResponse.id))
      .then(() => {
        let addPlaylistUrl = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`;
        // addPlaylistUrl = isLocal ? heroku+addPlaylistUrl : addPlaylistUrl;
        fetch(addPlaylistUrl, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
          }),
        })
          .then(
            (response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(
                "Something went wrong while creating the playlist!"
              );
            },
            (networkError) => {
              console.log("Trying to create the playlist...");
              console.log(networkError.message);
            }
          )
          .then((jsonResponse) => (playlistId = jsonResponse.id))
          .then(() => {
            let addTracksUrl = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            // addTracksUrl = isLocal ? heroku+addTracksUrl : addTracksUrl;
            fetch(addTracksUrl, {
              method: "POST",
              headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uris: trackUris,
              }),
            }).then((response) => {
              if (response.ok) {
                alert("Your new playlist was added successfully!");
              }
            });
          });
      });
  },
};
