import React, { useState, useEffect } from 'react';

export default function useSpotifyAPI(name1, setName1, name2, setName2, setPage, playlists1, setPlaylists1, playlists2, setPlaylists2, whoAsked, setWhoAsked, setSignedIn1, setSignedIn2, setProfilePicture1, setProfilePicture2, selectedPlaylists1, selectedPlaylists2, userId1, userId2, setUserId1, setUserId2, intersectionId, setIntersectionId, setIntersectionCover, setPlaylistsStatus1, setPlaylistsStatus2, errorMessage, setErrorMessage, logInTime1, logInTime2, setLogInTime1, setLogInTime2) {

    // const redirect_uri = "https://interspot.net/";
    const redirect_uri = "http://10.0.0.17:3000/";
    const client_id = "0efc3677a80a4cf7b6057c244d948f0f";
    const client_secret = "636fe3d7e2ee4e7087c2e1f7579a3e06"
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
    const TOKEN = "https://accounts.spotify.com/api/token";
    const SCOPE = "user-read-private playlist-read-private playlist-modify-public"

    // States
    const [access_token1, setAccess_token1] = useState(sessionStorage.getItem('access_token1') ?? "")
    const [access_token2, setAccess_token2] = useState(sessionStorage.getItem('access_token2') ?? "")
    const [refresh_token1, setRefresh_token1] = useState(sessionStorage.getItem('refresh_token1') ?? "")
    const [refresh_token2, setRefresh_token2] = useState(sessionStorage.getItem('refresh_token2') ?? "")

    // Spotify API
    let SpotifyWebApi = require('spotify-web-api-js');
    let spotifyApi = new SpotifyWebApi();

    // Call onPageLaod() the first time page loads
    useEffect(() => {
        onPageLoad()
    }, [])
    
    // If page is being redirected from Spotify Authentication, call handleRedirect()
    function onPageLoad() {
        if ( window.location.search.length > 0 ){
            handleRedirect();
        }
    }
    
    // Get the Spotify Code from the URL parameter
    // Call fetchAccessToken() with it
    function handleRedirect(){
        let code = getCode();
        fetchAccessToken( code );
        window.history.pushState("", "", redirect_uri); // remove param from url
    }
    
    // Get the Spotify Code from the URL parameter
    // returns: code
    function getCode(){
        let code = null;
        const queryString = window.location.search;
        if ( queryString.length > 0 ){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code')
        }
        return code;
    }
    
    // Using the code, create a request for access token
    function fetchAccessToken( code ){
        let body = "grant_type=authorization_code";
        body += "&code=" + code; 
        body += "&redirect_uri=" + encodeURI(redirect_uri);
        body += "&client_id=" + client_id;
        body += "&client_secret=" + client_secret;
        callAuthorizationApi(body);
    }
    
    // Ask for access token from Spotify
    // Call handleAuthorizationResponse() when ready
    function callAuthorizationApi(body){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", TOKEN, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
        xhr.send(body);
        xhr.onload = handleAuthorizationResponse;
    }

    // Send to authorization screen
    const requestAuthorization = () => {
        let url = AUTHORIZE;
        url += "?client_id=" + client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(redirect_uri);
        url += "&show_dialog=true";
        url += "&scope=" + SCOPE;
        window.location.href = url; // Show Spotify's authorization screen
    }
    
    // When the Authorization Response is received, set Access Token and Refresh Token, fetch the user info and playlists, set signedIn1 to true, and record sign-in time
    async function handleAuthorizationResponse(){
        if ( this.status == 200 ){
            let data = JSON.parse(this.responseText);
            if ( data.access_token != undefined ){
                if (whoAsked === "left") {
                    setAccess_token1(data.access_token);
                    sessionStorage.setItem("access_token1", data.access_token);
                    spotifyApi.setAccessToken(data.access_token);
                    getPlaylists1()
                    setAccountInfo("left")
                    setSignedIn1(true)
                    sessionStorage.setItem("signedIn1", true);
                    setLogInTime1(Date.now())
                    sessionStorage.setItem("logInTime1", Date.now());
                } else {
                    setAccess_token2(data.access_token);
                    sessionStorage.setItem("access_token2", data.access_token);
                    spotifyApi.setAccessToken(data.access_token);
                    getPlaylists2()
                    setAccountInfo("right")
                    setSignedIn2(true)
                    sessionStorage.setItem("signedIn2", true);
                    setLogInTime2(Date.now())
                    sessionStorage.setItem("logInTime2", Date.now());
                }
            }
            if ( data.refresh_token  != undefined ){
                if (whoAsked === "left") {
                    setRefresh_token1(data.refresh_token)
                    sessionStorage.setItem("refresh_token1", data.refresh_token);
                } else {
                    setRefresh_token2(data.refresh_token)
                    sessionStorage.setItem("refresh_token2", data.refresh_token);
                }
            }
            onPageLoad();
        }
        else {
            console.log(this.responseText);
        }

    }

    // When Access Token is expired, this function is called and refresh the Access Token.
    function refreshAccessToken(side, resolve){
        let body = "grant_type=refresh_token";
        body += "&refresh_token=" + (side === "left" ? refresh_token1 : refresh_token2);
        body += "&client_id=" + client_id;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", TOKEN, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
        xhr.send(body);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.response);
                if ( data.access_token != undefined ){
                    if (side === "left") {
                        setAccess_token1(data.access_token);
                        sessionStorage.setItem("access_token1", data.access_token);
                        spotifyApi.setAccessToken(data.access_token);
                    } else if (side === "right") {
                        setAccess_token2(data.access_token);
                        sessionStorage.setItem("access_token2", data.access_token);
                        spotifyApi.setAccessToken(data.access_token);
                    }
                }
                if ( data.refresh_token  != undefined ){
                    if (side === "left") {
                        setRefresh_token1(data.refresh_token)
                        sessionStorage.setItem("refresh_token1", data.refresh_token);
                    } else if (side === "right") {
                        setRefresh_token2(data.refresh_token)
                        sessionStorage.setItem("refresh_token2", data.refresh_token);
                    }
                }
                resolve()
            } else {
                console.log(xhr.status)
                error()
            }
        }
    }

    // Fetch and then set the user's name, profile picture, and user ID.
    function setAccountInfo(side) {
        if (side === "left") {
            // spotifyApi.setAccessToken(access_token1)
            spotifyApi.getMe()
            .then(
                function(data) {
                    if (data != null) {
                        if (data.display_name != null) {
                            setName1(data.display_name)
                            sessionStorage.setItem("name1", data.display_name);
                        }
                        if (data.images[0] != null) {
                            setProfilePicture1(data.images[0].url)
                            sessionStorage.setItem("profilePicture1", data.images[0].url);
                        } else {
                            setProfilePicture1("/img/DefaultProfilePicture.jpg")
                            sessionStorage.setItem("profilePicture1", "/img/DefaultProfilePicture.jpg");
                        }
                        setUserId1(data.id)
                        sessionStorage.setItem("userId1", data.id);
                    }
                }, function(err) {
                    console.error(err);
                    error()
                }
            )
        } else if (side === "right") {
            // spotifyApi.setAccessToken(access_token2)
            spotifyApi.getMe()
            .then(
                function(data) {
                    if (data != null) {
                        if (data.display_name != null) {
                            setName2(data.display_name)
                            sessionStorage.setItem("name2", data.display_name);
                        }
                        if (data.images[0] != null) {
                            setProfilePicture2(data.images[0].url)
                            sessionStorage.setItem("profilePicture2", data.images[0].url);
                        } else {
                            setProfilePicture2("/img/DefaultProfilePicture.jpg")
                            sessionStorage.setItem("profilePicture2", "/img/DefaultProfilePicture.jpg");
                        }
                        setUserId2(data.id)
                        sessionStorage.setItem("userId2", data.id);
                            
                    }
                }, function(err) {
                    console.error(err);
                    error()
                }
            )
        }

    }

    // Fetch current user's playlists.
    function getPlaylists1() {
        setPlaylistsStatus1("requested")
        let total;
        let tempPlaylists1 = [];
        // Ask for the first 50 playlists (the max limit is 50)
        spotifyApi.getUserPlaylists({ limit: 50 })
        .then(
            function (data) {
                if (data != null) {
                    for (var key in data.items) {
                        let albumCover;
                        if (data.items[key].images.length != 0) {
                            albumCover = data.items[key].images[0].url
                        } else {
                            albumCover = "/img/DefaultCover.jpg"
                        }
                        tempPlaylists1.push({"name": data.items[key].name, "id": data.items[key].id, "cover": albumCover})
                    }
                    total = data.total
                }
            },
            function (err) {
                console.error(err);
                error()
            }
        ).then(
            // Then, knowing the total number of playlists, make enough requests for 50 playlists with offsets to receive them all
            // send all functions at the same time async
            async function() {
                let offsets = [...Array(Math.ceil((total-50)/50)).keys()]
                let playlistPromises = Promise.all(offsets.map(async (offset) => {
                    await spotifyApi.getUserPlaylists({ limit: 50, offset: (offset+1)*50})
                    .then(
                        function (data) {
                            // For every playlist received:
                            for (var key in data.items) {
                                let albumCover;
                                if (data.items[key].images.length != 0) {
                                    albumCover = data.items[key].images[0].url
                                } else {
                                    albumCover = "/img/DefaultCover.jpg"
                                }
                                // Keep the name, album cover, and ID
                                tempPlaylists1.push({"name": data.items[key].name, "id": data.items[key].id, "cover": albumCover})
                            }
                            return new Promise((resolve, reject) => {
                                resolve()
                            })
                        },
                        function (err) {
                            console.error(err);
                            error()
                        }
                    )
                }))
                await playlistPromises; // Wait for all the promises to resolve
                setPlaylists1(tempPlaylists1); 
                sessionStorage.setItem("playlists1", JSON.stringify(tempPlaylists1));
                setPlaylistsStatus1("received")
            }
        )
    }

    // Fetch current user's playlists.
    function getPlaylists2() {
        setPlaylistsStatus2("requested")
        let total;
        let tempPlaylists2 = [];
        // Ask for the first 50 playlists (the max limit is 50)
        spotifyApi.getUserPlaylists({ limit: 50 })
        .then(
            function (data) {
                if (data != null) {
                    for (var key in data.items) {
                        let albumCover;
                        if (data.items[key].images.length != 0) {
                            albumCover = data.items[key].images[0].url
                        } else {
                            albumCover = "/img/DefaultCover.jpg"
                        }
                        tempPlaylists2.push({"name": data.items[key].name, "id": data.items[key].id, "cover": albumCover})
                    }
                    total = data.total
                }
            },
            function (err) {
                console.error(err);
                error()
            }
        ).then(
            // Then, knowing the total number of playlists, make enough requests for 50 playlists with offsets to receive them all
            // send all functions at the same time async
            async function() {
                let offsets = [...Array(Math.ceil((total-50)/50)).keys()]
                let playlistPromises = Promise.all(offsets.map(async (offset) => {
                    await spotifyApi.getUserPlaylists({ limit: 50, offset: (offset+1)*50})
                    .then(
                        function (data) {
                            for (var key in data.items) {
                                // For every playlist received:
                                let albumCover;
                                if (data.items[key].images.length != 0) {
                                    albumCover = data.items[key].images[0].url
                                } else {
                                    albumCover = "/img/DefaultCover.jpg"
                                }
                                // Keep the name, album cover, and ID
                                tempPlaylists2.push({"name": data.items[key].name, "id": data.items[key].id, "cover": albumCover})
                            }
                            return new Promise((resolve, reject) => {
                                resolve()
                            })
                        },
                        function (err) {
                            console.error(err);
                            error()
                        }
                    )
                }))
                await playlistPromises; // Wait for all the promises to resolve
                setPlaylists2(tempPlaylists2);
                sessionStorage.setItem("playlists2", JSON.stringify(tempPlaylists2));
                setPlaylistsStatus2("received")
            }
        )
    }

    // Create Intersection playlist
    async function generateIntersection() {
        // Use the user1's access token
        spotifyApi.setAccessToken(access_token1);

        // If it has been 58 minutes since the user logged in (almost expired access tokens), refresh access tokens
        let refreshAccessTokenPromise1
        let refreshAccessTokenPromise2
        if (Date.now() - logInTime1 > 3480000) {
            refreshAccessTokenPromise1 = new Promise((resolve, reject) => {
                refreshAccessToken("left", resolve)
            })
        }
        if (Date.now() - logInTime2 > 3480000) {
            refreshAccessTokenPromise2 = new Promise((resolve, reject) => {
                refreshAccessToken("right", resolve)
            })
        }
        // Wait for access tokens to be refreshed
        await refreshAccessTokenPromise1
        await refreshAccessTokenPromise2

        let leftSongs = [];
        let rightSongs = [];
        // Send all playlist track requests at the same time, then wait for all responses at the end
        // Get the songs in the playlists selected by user1 in 100 song chunks
        // For all playlists selected by user1:
        let leftPromises =  Promise.all(selectedPlaylists1.map(async (playlist) => {
            // Get the first 100 songs
            await spotifyApi.getPlaylistTracks(playlist)
            .then(
                async function (data) {
                    await (async function() {
                        // Push the song IDs into the leftSongs array
                        for (let song in data.items) {
                            if (data.items[song].track != null) {
                                leftSongs.push(data.items[song].track.id)
                            }
                        }
                        let total = data.total;
                        let songOffsets = [...Array(Math.ceil(total/100)-1).keys()]
                        // Knowing the total number of songs in the playlist, request for them all in 100 song chunks
                        await Promise.all(songOffsets.map(async (offset) => {
                            await spotifyApi.getPlaylistTracks(playlist, {offset: (offset+1)*100})
                            .then(
                                function (data2) {
                                    for (let song in data2.items) {
                                        if (data2.items[song].track != null) {
                                            // Push the song IDs into the leftSongs array
                                            leftSongs.push(data2.items[song].track.id)
                                        }
                                    }
                                    // Resolve the promise for this chunk
                                    return new Promise((resolve, reject) => {
                                        resolve()
                                    })
                                }, function (err) {
                                    console.error(err);
                                    error()
                                }
                            )
                        }))
                        // Resolve the promise for this playlist
                        return new Promise((resolve, reject) => {
                            resolve()
                        })
                    })()
                },
                function (err) {
                    console.error(err);
                    error()
                }
            )
        }));
        // Get the songs in the playlists selected by user2 in 100 song chunks
        // For all playlists selected by user2:
        let rightPromises = Promise.all(selectedPlaylists2.map(async (playlist) => {
            // Get the first 100 songs
            await spotifyApi.getPlaylistTracks(playlist)
            .then(
                async function (data) {
                    await (async function() {
                        // Push the song IDs into the leftSongs array
                        for (let song in data.items) {
                            if (data.items[song].track != null) {
                                rightSongs.push(data.items[song].track.id)
                            }
                        }
                        let total = data.total;
                        let songOffsets = [...Array(Math.ceil(total/100)-1).keys()]
                        // Knowing the total number of songs in the playlist, request for them all in 100 song chunks
                        await Promise.all(songOffsets.map(async (offset) => {
                            await spotifyApi.getPlaylistTracks(playlist, {offset: (offset+1)*100})
                            .then(
                                function (data2) {
                                    // Push the song IDs into the leftSongs array
                                    for (let song in data2.items) {
                                        if (data2.items[song].track != null) {
                                            rightSongs.push(data2.items[song].track.id)
                                        }
                                    }
                                    // Resolve the promise for this chunk
                                    return new Promise((resolve, reject) => {
                                        resolve()
                                    })
                                }, function (err) {
                                    console.error(err);
                                    error()
                                }
                            )
                        }))
                        // Resolve the promise for this playlist
                        return new Promise((resolve, reject) => {
                            resolve()
                        })
                    })()
                },
                function (err) {
                    console.error(err);
                    error()
                }
            )
        }));
        // Await all the promises
        await leftPromises;
        await rightPromises;

        // Find the intersection
        let intersection = leftSongs.filter(song => rightSongs.includes(song));
        let intersectionURI = intersection.map(songId => {return "spotify:track:" + songId})
        // If there are no songs in common, let the user know
        if (intersection.length === 0) {
            error("You have no songs in common :(")
        } else {
            setPage("success")
            let successPromise = new Promise((resolve, reject) => {
                // Wait at least 2 seconds on the success page before showing the results
                setTimeout(function(){
                    resolve()
                }, 2000);
            })
            // Create the playlist for user1
            await spotifyApi.createPlaylist(userId1, {name: (name1 + " and " + name2)})
            .then(
                async function(data) {
                    // Get the id of the playlist just created
                    let playlistId = data.id
                    setIntersectionId(playlistId)
                    // Add the songs in the intersection to the playlists
                    let intersectionOffsets = [...Array(Math.ceil(intersection.length/100)).keys()]
                    let addTracksPromises = Promise.all(intersectionOffsets.map(async (offset) => {
                        await spotifyApi.addTracksToPlaylist(playlistId, intersectionURI.slice(offset*100, (offset+1)*100))
                        return new Promise((resolve, reject) => {
                            resolve()
                        })
                    }))
                    await addTracksPromises // Wait until all songs are added to the playlist

                    // If user1 and user2 aren't the same account, make user2 follow the playlist created by user1
                    if (userId1 != userId2) {
                        spotifyApi.setAccessToken(access_token2)
                        spotifyApi.followPlaylist(playlistId)
                    }
                    // Get the intersection playlist cover image
                    await spotifyApi.getPlaylistCoverImage(playlistId)
                    .then(
                        async function(data2) {
                            await setIntersectionCover(data2[0].url)
                            await successPromise
                            // Set page to "result"
                            setPage("result")
                        },
                        function(err) {
                            console.error(err);
                            error()
                        }
                    )
                },
                function(err) {
                    console.error(err);
                    error()
                }
            )
        }
    }

    // Show error message to user
    // Default error message: "We ran into an error. Please Try again"
    function error(message = "We ran into an error. Please Try again") {
        setErrorMessage(message)
        setPage("error")
    }

    // Export requestAuthorization and generateIntersection to Interspot.js
    return [requestAuthorization, generateIntersection];

}
    