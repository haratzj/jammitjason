# God, Jamm it, Jason!
## Overview
This is a personal project that was done to practice ReactJS, OAuth, and making API calls.

## How It Works
1. Login via OAuth - Upon clicking to log-in, the user is asked to log in to Spotify, and grant permissions for OAuth.
2. Come with Token - After successful logging-in, the user comes back with the token and now can use the full features
3. Features
   1. Search Songs - Search songs from the Spotify library. The response is processed and stored as a *state*, which is then automatically displayed on the screen.
   2. Add Songs to Playlist - From the search result, users can choose songs to add to their playlist. By repeating Steps 1 to 2, user can populate his/her new playlist. The songs that were selected are instantly added to the playlist box on the screen, also using state.
   3. Save the New Playlist - Once the user is happy with the new playlist, he/she can save this new playlist, which will be submitted to Spotify. If successful, then the user can enjoy this new playlist on any devices!
   4. Display the List of Playlists - The user can retrieve the names of the playlists. This was mainly just added to see if the save in Step 3 was successful.

## Technical Stuffs
1. The business logic was managed in a separate module (Spotify.js), for more readable code.
2. Components were broken into small modules for modularity.
3. States were mainly managed in the top component, but many states were also updated in their children components. This was achieved by passing down the appropriate methods to the children components.
4. JavaScript Class Field was used. This is still not a part of official script, but is highly likely to be included in the next generation of ES as is in stage 3. Using Class Field just makes things slightly easier and saves some typing (don't have to bind the functions in constructor anymore!).
5. A simple usage of a LifeCycle method, componentDidMount().
6. ES6 Array methods were actively used, such as map, filter, etc.
7. GET / POST requests were made via Spotify API. Which was pretty straight forward thanks to their great documentation!

## Problem
There is one problem that hasn't been resolved - CORS. I was using cors-anywhere by Rob (thanks, Rob), but he had to restrict the use of it due to some bad people who were abusing it! Thus, some features will fail if you did not request grant from the server manually. Thus I have included some photos to demonstrate how this app works. These can be found under the DEMO folder.

## Improvements
- The UI for "current playlist" could be improved, but that wasn't the main purpose so I left it at that.
- Maybe I will have to create my own cors anywhere server for other projects!?
- I could change the Class components to Function components, which seem to be where ReactJS is heading to.

## Thank you
Thank you for reading.

## Acknowledgement
1. This is based on a project that was part of a Codecademy program, but I improved it a bit and added a new feature.
2. This was created from Create React App.
