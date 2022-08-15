import React, { useState, useEffect } from 'react';

export default function useSpotifyAPI(name1, setName1, name2, setName2, setPage, playlists1, setPlaylists1, playlists2, setPlaylists2, access_token1, setAccess_token1, access_token2, setAccess_token2, whoAsked, setWhoAsked, spotifyApi1, spotifyApi2, setSignedIn1, setSignedIn2, setProfilePicture1, setProfilePicture2, storeStates, selectedPlaylists1, selectedPlaylists2, userId1, userId2, setUserId1, setUserId2, intersectionId, setIntersectionId, setIntersectionCover) {

    let redirect_uri = "http://10.0.0.17:3000/";
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
            var data = JSON.parse(this.responseText);
            // console.log(data);
            var data = JSON.parse(this.responseText);
            if ( data.access_token != undefined ){
                if (whoAsked === "left") {
                    setAccess_token1(data.access_token);
                    spotifyApi1.setAccessToken(data.access_token);
                    getPlaylists1()
                    setAccountInfo("left")
                    setSignedIn1(true)
                } else {
                    setAccess_token2(data.access_token);
                    spotifyApi2.setAccessToken(data.access_token);
                    getPlaylists2()
                    setAccountInfo("right")
                    setSignedIn2(true)
                }
            }
            onPageLoad();
        }
        else {
            console.log(this.responseText);
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
                        console.log("Here")
                    }
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
                }
            )
        }

    }

    function getPlaylists1() {
        // spotifyApi1.setAccessToken(access_token1);
        let total;
        let tempPlaylists1 = [];
        spotifyApi1.getUserPlaylists({ limit: 50 })
        .then(
            function (data) {
                if (data != null) {
                    for (var key in data.items) {
                        // console.log(data.items[key].name);
                        tempPlaylists1.push({"name": data.items[key].name, "id": data.items[key].id, "cover": data.items[key].images[0].url})
                    }
                    total = data.total
                }
            },
            function (err) {
                console.error(err);
            }
        ).then(
            function() {
                for (let i=0; i<Math.ceil((total-50)/50); i++) {
                    spotifyApi1.getUserPlaylists({ limit: 50, offset: (i+1)*50})
                    .then(
                        function (data) {
                            if (data != null) {
                                for (var key in data.items) {
                                    // console.log(data.items[key].name);
                                    tempPlaylists1.push({"name": data.items[key].name, "id": data.items[key].id, "cover": data.items[key].images[0].url})
                                }
                            }
                        },
                        function (err) {
                            console.error(err);
                        }
                    )
                }
            }
        ).then(
            function() {
                setPlaylists1(tempPlaylists1)
            }
        )
    }

    function getPlaylists2() {
        // spotifyApi2.setAccessToken(access_token2);
        let total;
        let tempPlaylists2 = [];
        spotifyApi2.getUserPlaylists({ limit: 50 })
        .then(
            function (data) {
                if (data != null) {
                    for (var key in data.items) {
                        // console.log(data.items[key].name);
                        tempPlaylists2.push({"name": data.items[key].name, "id": data.items[key].id, "cover": data.items[key].images[0].url})
                    }
                    total = data.total
                }
            },
            function (err) {
                console.error(err);
            }
        ).then(
            function() {
                for (let i=0; i<Math.ceil((total-50)/50); i++) {
                    spotifyApi2.getUserPlaylists({ limit: 50, offset: (i+1)*50})
                    .then(
                        function (data) {
                            if (data != null) {
                                for (var key in data.items) {
                                    // console.log(data.items[key].name);
                                    tempPlaylists2.push({"name": data.items[key].name, "id": data.items[key].id, "cover": data.items[key].images[0].url})
                                }
                            }
                        },
                        function (err) {
                            console.error(err);
                        }
                    )
                }
            }
        ).then(
            function() {
                setPlaylists2(tempPlaylists2)
            }
        )
    }

    const getNextPlaylist = async (next, songs) => {
        await spotifyApi1.getGeneric(next)
        .then(
            async function (data) {
                if (data != null) {
                    console.log(data)
                    for (var song in data.items) {
                        songs.push(data.items[song].track.id)
                    }
                    next = data.next
                    if (next != null) {
                        await getNextPlaylist(next, songs)
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
            }
        )
    }

    async function generateIntersection() {
        spotifyApi1.setAccessToken(access_token1);
        spotifyApi2.setAccessToken(access_token2);
        let leftSongs = [];
        let rightSongs = [];
        let leftPromises =  Promise.all(selectedPlaylists1.map(async (playlist) => {
            await spotifyApi1.getPlaylist(playlist)
            .then(
                async function (data) {
                    await (async function() {
                        for (var song in data.tracks.items) {
                            leftSongs.push(data.tracks.items[song].track.id)
                        }
                        let next = data.tracks.next
                        if (next != null) {
                            await getNextPlaylist(next, leftSongs)
                        } else {
                            // console.log(leftSongs.length)
                        }
                        return new Promise((resolve, reject) => {
                            resolve()
                        })
                    })()
                },
                function (err) {
                    console.error(err);
                }
            )
        }));
        let rightPromises = Promise.all(selectedPlaylists2.map(async (playlist) => {
            await spotifyApi2.getPlaylist(playlist)
            .then(
                async function (data) {
                    await (async function() {
                        for (let song in data.tracks.items) {
                            rightSongs.push(data.tracks.items[song].track.id)
                        }
                        let next = data.tracks.next
                        if (next != null) {
                            await getNextPlaylist(next, rightSongs)
                        }
                        return new Promise((resolve, reject) => {
                            resolve()
                        })
                    })()
                },
                function (err) {
                    console.error(err);
                }
            )
        }));
        await leftPromises;
        await rightPromises;
        let intersection = leftSongs.filter(song => rightSongs.includes(song));
        setPage("success")
        await spotifyApi1.createPlaylist(userId1, {name: (name1 + " and " + name2)})
        .then(
            async function(data) {
                let playlistId = data.id
                setIntersectionId(playlistId)
                await spotifyApi1.addTracksToPlaylist(playlistId, intersection.map(songId => {return "spotify:track:" + songId}))
                if (userId1 != userId2) {
                    spotifyApi2.followPlaylist(playlistId)
                }
                await spotifyApi1.getPlaylistCoverImage(playlistId)
                .then(
                    async function(data2) {
                        console.log(data2[0].url)
                        await setIntersectionCover(data2[0].url)
                        setPage("result")
                    },
                    function(err) {
                        console.error(err);
                    }
                )
            },
            function(err) {
                console.error(err);
            }
        )
    }

    return [requestAuthorization, generateIntersection];

}
    