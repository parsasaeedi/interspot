import React, { useState, useEffect } from 'react';
import PlaylistSelection from './PlaylistSelection'
import SignIn from './SignIn'

export default function Interspot() {
    // states
    const [name1, setName1] = useState(sessionStorage.getItem('name1') ?? "")
    const [name2, setName2] = useState(sessionStorage.getItem('name2') ?? "")
    const [page, setPage] = useState("signIn")
    const [playlists1, setplaylists1] = useState([])
    const [playlists2, setplaylists2] = useState([])
    const [selectedPlaylists1, setSelectedPlaylists1] = useState([])
    const [selectedPlaylists2, setSelectedPlaylists2] = useState([])
    const [access_token1, setAccess_token1] = useState(sessionStorage.getItem('access_token1') ?? "")
    const [access_token2, setAccess_token2] = useState(sessionStorage.getItem('access_token2') ?? "")
    const [whoAsked, setWhoAsked] = useState(sessionStorage.getItem('whoAsked') ?? "")



    let redirect_uri = "http://10.0.0.17:3000/";
    let client_id = "0efc3677a80a4cf7b6057c244d948f0f";
    let client_secret = "636fe3d7e2ee4e7087c2e1f7579a3e06"
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
    const TOKEN = "https://accounts.spotify.com/api/token";
    const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";

    function requestAuthorization() {
        let url = AUTHORIZE;
        url += "?client_id=" + client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(redirect_uri);
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
        window.location.href = url; // Show Spotify's authorization screen
    }

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

    function handleAuthorizationResponse(){
        if ( this.status == 200 ){
            var data = JSON.parse(this.responseText);
            console.log(data);
            var data = JSON.parse(this.responseText);
            if ( data.access_token != undefined ){
                if (whoAsked === "left") {
                    setAccess_token1(data.access_token);
                    spotifyApi1.setAccessToken(data.access_token);
                } else {
                    setAccess_token2(data.access_token);
                    spotifyApi2.setAccessToken(data.access_token);
                }
            }
            onPageLoad();
        }
        else {
            console.log(this.responseText);
        }
    }
    

    // Spotify API
    let SpotifyWebApi = require('spotify-web-api-js');
    let spotifyApi1 = new SpotifyWebApi();
    let spotifyApi2 = new SpotifyWebApi();

    // event handlers
    const handleChangeName1 = ({target}) => setName1(target.value)
    const handleChangeName2 = ({target}) => setName2(target.value)
    const handleLinkButton1 = ({target}) => {
        // Do stuff
        sessionStorage.setItem('name1', name1);
        sessionStorage.setItem('name2', name2);
        sessionStorage.setItem('access_token1', access_token1);
        sessionStorage.setItem('access_token2', access_token2);
        sessionStorage.setItem('whoAsked', "left");
        requestAuthorization();
    }
    const handleLinkButton2 = ({target}) => {
        sessionStorage.setItem('name1', name1);
        sessionStorage.setItem('name2', name2);
        sessionStorage.setItem('access_token1', access_token1);
        sessionStorage.setItem('access_token2', access_token2);
        sessionStorage.setItem('whoAsked', "right");
        requestAuthorization();
        // Do stuff
    }
    const handleMainButton = () => {
        if (page === "signIn") {
            // Add stuff
            setPage("playlistSelection")
        }
    }

    let profilePicture1;
    if (access_token1 != "") {
        spotifyApi1.setAccessToken(access_token1);
        // spotifyApi1.getMe()
        let total;
        let playlist1 = [];
        spotifyApi1.getUserPlaylists({ limit: 50 })
        .then(
            function (data) {
                if (data != null) {
                    for (var key in data.items) {
                        // console.log(data.items[key].name);
                        playlist1.push({"name": data.items[key].name, "id": data.items[key].id, "cover": data.items[key].images[0].url})
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
                                    playlist1.push({"name": data.items[key].name, "id": data.items[key].id, "cover": data.items[key].images[0].url})
                                }
                            }
                        },
                        function (err) {
                            console.error(err);
                        }
                    ).then(
                        function() {
                            console.log(playlist1.length)
                        }
                    )
                }
            }
        )
    } 
    useEffect(() => {
        onPageLoad();
    })

    // UI
    let button = page==="signIn" ? "CONTINUE" : "GENERATE";
    let leftContent, rightContent;
    if (page === "signIn") {
        leftContent = <SignIn name={name1} handleChangeName={handleChangeName1} placeholder="user1" handleLinkButton={handleLinkButton1}/>;
        rightContent = <SignIn name={name2} handleChangeName={handleChangeName2} placeholder="user2" handleLinkButton={handleLinkButton2}/>
    } else if (page === "playlistSelection") {
        leftContent = <PlaylistSelection name={name1} handleChangeName={handleChangeName1} placeholder="user1"/>
        rightContent = <PlaylistSelection name={name2} handleChangeName={handleChangeName2} placeholder="user2"/>
    }

    return(
        <div className="header">
            <img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" />
            <div className="container">
                {leftContent}
                <div className="verticalLine"></div>
                {rightContent}
                {profilePicture1}
            </div>
            <button className='mainButton' onClick={handleMainButton}>{button}</button>
        </div>
    )
}