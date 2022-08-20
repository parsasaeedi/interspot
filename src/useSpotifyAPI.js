import React, { useState, useEffect } from 'react';

export default function useSpotifyAPI(name1, setName1, name2, setName2, setPage, playlists1, setPlaylists1, playlists2, setPlaylists2, access_token1, setAccess_token1, access_token2, setAccess_token2, whoAsked, setWhoAsked, spotifyApi1, spotifyApi2, setSignedIn1, setSignedIn2, setProfilePicture1, setProfilePicture2, storeStates, selectedPlaylists1, selectedPlaylists2, userId1, userId2, setUserId1, setUserId2, intersectionId, setIntersectionId, setIntersectionCover, setPlaylistsStatus1, setPlaylistsStatus2, errorMessage, setErrorMessage, refresh_token1, refresh_token2, setRefresh_token1, setRefresh_token2, logInTime1, logInTime2, setLogInTime1, setLogInTime2) {

    let redirect_uri = "http://10.0.0.17:3000/create";
    let client_id = "0efc3677a80a4cf7b6057c244d948f0f";
    let client_secret = "636fe3d7e2ee4e7087c2e1f7579a3e06"
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
    const TOKEN = "https://accounts.spotify.com/api/token";
    const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";

    useEffect(() => {
        onPageLoad()
    }, [])
    
    function onPageLoad() {
        if ( window.location.search.length > 0 ){
            handleRedirect();
        }
    }
    
    function handleRedirect(){
        let code = getCode();
        fetchAccessToken( code );
        window.history.pushState("", "", redirect_uri); // remove param from url
    }
    
    function getCode(){
        let code = null;
        const queryString = window.location.search;
        if ( queryString.length > 0 ){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code')
        }
        return code;
    }
    
    function fetchAccessToken( code ){
        let body = "grant_type=authorization_code";
        body += "&code=" + code; 
        body += "&redirect_uri=" + encodeURI(redirect_uri);
        body += "&client_id=" + client_id;
        body += "&client_secret=" + client_secret;
        callAuthorizationApi(body);
    }
    
    function callAuthorizationApi(body){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", TOKEN, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
        xhr.send(body);
        xhr.onload = handleAuthorizationResponse;
    }

    const requestAuthorization = () => {
        let url = AUTHORIZE;
        url += "?client_id=" + client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(redirect_uri);
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-library-read playlist-read-private playlist-modify-public";
        window.location.href = url; // Show Spotify's authorization screen
    }
    
    function handleAuthorizationResponse(){
        if ( this.status == 200 ){
            let data = JSON.parse(this.responseText);
            if ( data.access_token != undefined ){
                if (whoAsked === "left") {
                    setAccess_token1(data.access_token);
                    spotifyApi1.setAccessToken(data.access_token);
                    getPlaylists1()
                    setAccountInfo("left")
                    setSignedIn1(true)
                    setLogInTime1(Date.now())
                } else {
                    setAccess_token2(data.access_token);
                    spotifyApi2.setAccessToken(data.access_token);
                    getPlaylists2()
                    setAccountInfo("right")
                    setSignedIn2(true)
                    setLogInTime2(Date.now())
                }
            }
            if ( data.refresh_token  != undefined ){
                if (whoAsked === "left") {
                    setRefresh_token1(data.refresh_token)
                    localStorage.setItem("refresh_token1", data.refresh_token);
                } else {
                    setRefresh_token2(data.refresh_token)
                    localStorage.setItem("refresh_token2", data.refresh_token);
                }
            }
            onPageLoad();
        }
        else {
            console.log(this.responseText);
        }

    }

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
                        spotifyApi1.setAccessToken(data.access_token);
                    } else {
                        setAccess_token2(data.access_token);
                        spotifyApi2.setAccessToken(data.access_token);
                    }
                }
                if ( data.refresh_token  != undefined ){
                    if (side === "left") {
                        setRefresh_token1(data.refresh_token)
                        localStorage.setItem("refresh_token1", data.refresh_token);
                    } else {
                        setRefresh_token2(data.refresh_token)
                        localStorage.setItem("refresh_token2", data.refresh_token);
                    }
                }
                resolve()
            } else {
                console.log(xhr.status)
                error()
            }
        }
    }

    function setAccountInfo(side) {
        if (side === "left") {
            spotifyApi1.getMe()
            .then(
                function(data) {
                    if (data != null) {
                        if (data.display_name != null) {
                            setName1(data.display_name)
                        }
                        if (data.images[0] != null) {
                            setProfilePicture1(data.images[0].url)
                        } else {
                            setProfilePicture1("/img/DefaultProfilePicture.jpg")
                        }
                        setUserId1(data.id)
                    }
                }, function(err) {
                    console.error(err);
                    error()
                }
            )
        } else if (side === "right") {
            spotifyApi2.getMe()
            .then(
                function(data) {
                    if (data != null) {
                        if (data.display_name != null) {
                            setName2(data.display_name)
                        }
                        if (data.images[0] != null) {
                            setProfilePicture2(data.images[0].url)
                        } else {
                            setProfilePicture2("/img/DefaultProfilePicture.jpg")
                        }
                        setUserId2(data.id)
                            
                    }
                }, function(err) {
                    console.error(err);
                    error()
                }
            )
        }

    }

    function getPlaylists1() {
        // spotifyApi1.setAccessToken(access_token1);
        setPlaylistsStatus1("requested")
        let total;
        let tempPlaylists1 = [];
        spotifyApi1.getUserPlaylists({ limit: 50 })
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
            async function() {
                let offsets = [...Array(Math.ceil((total-50)/50)).keys()]
                let playlistPromises = Promise.all(offsets.map(async (offset) => {
                    await spotifyApi1.getUserPlaylists({ limit: 50, offset: (offset+1)*50})
                    .then(
                        function (data) {
                            for (var key in data.items) {
                                let albumCover;
                                if (data.items[key].images.length != 0) {
                                    albumCover = data.items[key].images[0].url
                                } else {
                                    albumCover = "/img/DefaultCover.jpg"
                                }
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
                await playlistPromises;
                setPlaylists1(tempPlaylists1);
                setPlaylistsStatus1("received")
            }
        )
    }

    function getPlaylists2() {
        // spotifyApi2.setAccessToken(access_token2);
        setPlaylistsStatus2("requested")
        let total;
        let tempPlaylists2 = [];
        spotifyApi2.getUserPlaylists({ limit: 50 })
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
            async function() {
                let offsets = [...Array(Math.ceil((total-50)/50)).keys()]
                let playlistPromises = Promise.all(offsets.map(async (offset) => {
                    await spotifyApi2.getUserPlaylists({ limit: 50, offset: (offset+1)*50})
                    .then(
                        function (data) {
                            for (var key in data.items) {
                                let albumCover;
                                if (data.items[key].images.length != 0) {
                                    albumCover = data.items[key].images[0].url
                                } else {
                                    albumCover = "/img/DefaultCover.jpg"
                                }
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
                await playlistPromises;
                setPlaylists2(tempPlaylists2);
                setPlaylistsStatus2("received")
            }
        )
    }

    const getNextSongs = async (next, songs) => {
        await spotifyApi1.getGeneric(next)
        .then(
            async function (data) {
                if (data != null) {
                    for (let song in data.items) {
                        songs.push(data.items[song].track.id)
                    }
                    next = data.next
                    if (next != null) {
                        await getNextSongs(next, songs)
                    } else {
                        // console.log(songs.length)
                    }
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
    }

    async function generateIntersection() {
        spotifyApi1.setAccessToken(access_token1);
        spotifyApi2.setAccessToken(access_token2);
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
        await refreshAccessTokenPromise1
        await refreshAccessTokenPromise2
        let leftSongs = [];
        let rightSongs = [];
        let leftPromises =  Promise.all(selectedPlaylists1.map(async (playlist) => {
            await spotifyApi1.getPlaylistTracks(playlist)
            .then(
                async function (data) {
                    await (async function() {
                        for (let song in data.items) {
                            leftSongs.push(data.items[song].track.id)
                        }
                        let total = data.total;
                        let songOffsets = [...Array(Math.ceil(total/100)-1).keys()]
                        await Promise.all(songOffsets.map(async (offset) => {
                            await spotifyApi1.getPlaylistTracks(playlist, {offset: (offset+1)*100})
                            .then(
                                function (data2) {
                                    // console.log(data2);
                                    for (let song in data2.items) {
                                        if (data2.items[song].track != null) {
                                            leftSongs.push(data2.items[song].track.id)
                                        }
                                    }
                                    return new Promise((resolve, reject) => {
                                        resolve()
                                    })
                                }, function (err) {
                                    console.error(err);
                                    error()
                                }
                            )
                        }))
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
        let rightPromises = Promise.all(selectedPlaylists2.map(async (playlist) => {
            await spotifyApi1.getPlaylistTracks(playlist)
            .then(
                async function (data) {
                    await (async function() {
                        // console.log(data);
                        for (let song in data.items) {
                            rightSongs.push(data.items[song].track.id)
                        }
                        let total = data.total;
                        let songOffsets = [...Array(Math.ceil(total/100)-1).keys()]
                        await Promise.all(songOffsets.map(async (offset) => {
                            await spotifyApi2.getPlaylistTracks(playlist, {offset: (offset+1)*100})
                            .then(
                                function (data2) {
                                    // console.log(data2);
                                    for (let song in data2.items) {
                                        if (data2.items[song].track != null) {
                                            rightSongs.push(data2.items[song].track.id)
                                        }
                                    }
                                    return new Promise((resolve, reject) => {
                                        resolve()
                                    })
                                }, function (err) {
                                    console.error(err);
                                    error()
                                }
                            )
                        }))
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
        await leftPromises;
        await rightPromises;
        let intersection = leftSongs.filter(song => rightSongs.includes(song));
        let intersectionURI = intersection.map(songId => {return "spotify:track:" + songId})
        if (intersection.length === 0) {
            error("You have no songs in common :(")
        } else {
            setPage("success")
            let successPromise = new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve()
                }, 2000);
            })
            await spotifyApi1.createPlaylist(userId1, {name: (name1 + " and " + name2)})
            .then(
                async function(data) {
                    let playlistId = data.id
                    setIntersectionId(playlistId)
                    let intersectionOffsets = [...Array(Math.ceil(intersection.length/100)).keys()]
                    let addTracksPromises = Promise.all(intersectionOffsets.map(async (offset) => {
                        await spotifyApi1.addTracksToPlaylist(playlistId, intersectionURI.slice(offset*100, (offset+1)*100))
                        return new Promise((resolve, reject) => {
                            resolve()
                        })
                    }))
                    await addTracksPromises
                    if (userId1 != userId2) {
                        spotifyApi2.followPlaylist(playlistId)
                    }
                    await spotifyApi1.getPlaylistCoverImage(playlistId)
                    .then(
                        async function(data2) {
                            await setIntersectionCover(data2[0].url)
                            await successPromise
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

    function error(message = "We ran into an error. Please Try again") {
        setErrorMessage(message)
        setPage("error")
    }

    return [requestAuthorization, generateIntersection];

}
    