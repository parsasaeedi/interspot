import React, { useState, useEffect } from 'react';
import PlaylistSelection from './PlaylistSelection'
import SignIn from './SignIn'
import useSpotifyAPI from './useSpotifyAPI';
import MainButton from './MainButton';
import Content from './Content';

export default function Interspot() {
    let redirect_uri = "http://10.0.0.17:3000/";
    let client_id = "0efc3677a80a4cf7b6057c244d948f0f";
    let client_secret = "636fe3d7e2ee4e7087c2e1f7579a3e06"
    const AUTHORIZE = "https://accounts.spotify.com/authorize"

    // states
    const [page, setPage] = useState("signIn")
    const [name1, setName1] = useState(sessionStorage.getItem('name1') ?? "")
    const [name2, setName2] = useState(sessionStorage.getItem('name2') ?? "")
    const [selectedPlaylists1, setSelectedPlaylists1] = useState([])
    const [selectedPlaylists2, setSelectedPlaylists2] = useState([])
    const [signedIn1, setSignedIn1] = useState(sessionStorage.getItem('signedIn1') ?? "")
    const [signedIn2, setSignedIn2] = useState(sessionStorage.getItem('signedIn2') ?? "")
    const [profilePicture1, setProfilePicture1] = useState(sessionStorage.getItem('profilePicture1') ?? "")
    const [profilePicture2, setProfilePicture2] = useState(sessionStorage.getItem('profilePicture2') ?? "")
    const [playlists1, setPlaylists1] = useState([])
    const [playlists2, setPlaylists2] = useState([])
    const [access_token1, setAccess_token1] = useState(sessionStorage.getItem('access_token1') ?? "")
    const [access_token2, setAccess_token2] = useState(sessionStorage.getItem('access_token2') ?? "")
    const [whoAsked, setWhoAsked] = useState(sessionStorage.getItem('whoAsked') ?? "")

    useEffect(() => {
        storeStates()
    }, [name1, name2, access_token1, access_token2, signedIn1, signedIn2, profilePicture1, profilePicture2])


    // Spotify API
    let SpotifyWebApi = require('spotify-web-api-js');
    let spotifyApi1 = new SpotifyWebApi();
    let spotifyApi2 = new SpotifyWebApi();

    function storeStates() {
        sessionStorage.setItem('name1', name1);
        sessionStorage.setItem('name2', name2);
        sessionStorage.setItem('access_token1', access_token1);
        sessionStorage.setItem('access_token2', access_token2);
        sessionStorage.setItem('signedIn1', signedIn1);
        sessionStorage.setItem('signedIn2', signedIn2);
        sessionStorage.setItem('profilePicture1', profilePicture1);
        sessionStorage.setItem('profilePicture2', profilePicture2);
    }

    const requestAuthorization = useSpotifyAPI(name1, setName1, name2, setName2, playlists1, setPlaylists1, playlists2, setPlaylists2, access_token1, setAccess_token1, access_token2, setAccess_token2, whoAsked, setWhoAsked, spotifyApi1, spotifyApi2, setSignedIn1, setSignedIn2, setProfilePicture1, setProfilePicture2, storeStates);

    // event handlers
    const handleChangeName1 = ({target}) => setName1(target.value)
    const handleChangeName2 = ({target}) => setName2(target.value)
    const handleLinkButton1 = ({target}) => {
        storeStates()
        sessionStorage.setItem('whoAsked', "left");
        requestAuthorization();
        // Do stuff
    }
    const handleLinkButton2 = ({target}) => {
        storeStates()
        sessionStorage.setItem('whoAsked', "right");
        requestAuthorization();
        // Do stuff
    }

    return(
        <div className="header">
            <a href="./"><img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" /></a>
            <div className="container">
                <Content page={page} signedIn={signedIn1} name={name1} handleChangeName={handleChangeName1} placeholder="user1" handleLinkButton={handleLinkButton1} profilePicture={profilePicture1} playlists={playlists1} selectedPlaylists={selectedPlaylists1} setSelectedPlaylists={setSelectedPlaylists1}/>
                <div className="verticalLine"></div>
                <Content page={page} signedIn={signedIn2} name={name2} handleChangeName={handleChangeName2} placeholder="user2" handleLinkButton={handleLinkButton2} profilePicture={profilePicture2} playlists={playlists2} selectedPlaylists={selectedPlaylists2} setSelectedPlaylists={setSelectedPlaylists2}/>
            </div>
            <MainButton page={page} handleLinkButton={handleLinkButton2} setPage={setPage} signedIn1={signedIn1} signedIn2={signedIn2}/>
        </div>
    )
}