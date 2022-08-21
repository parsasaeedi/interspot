import React, { useState, useEffect } from 'react';
import PlaylistSelection from './PlaylistSelection'
import SignIn from './SignIn'
import useSpotifyAPI from './useSpotifyAPI';
import MainButton from './MainButton';
import Content from './Content';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Welcome from './Welcome';

export default function Interspot() {

    // states
    const [page, setPage] = useState(sessionStorage.getItem('page') ?? "welcome")
    const [name1, setName1] = useState(sessionStorage.getItem('name1') ?? "")
    const [name2, setName2] = useState(sessionStorage.getItem('name2') ?? "")
    const [signedIn1, setSignedIn1] = useState(sessionStorage.getItem('signedIn1') ?? "")
    const [signedIn2, setSignedIn2] = useState(sessionStorage.getItem('signedIn2') ?? "")
    const [profilePicture1, setProfilePicture1] = useState(sessionStorage.getItem('profilePicture1') ?? "")
    const [profilePicture2, setProfilePicture2] = useState(sessionStorage.getItem('profilePicture2') ?? "")
    const [userId1, setUserId1] = useState(sessionStorage.getItem('userId1') ?? "")
    const [userId2, setUserId2] = useState(sessionStorage.getItem('userId2') ?? "")
    const [playlists1, setPlaylists1] = useState(JSON.parse(sessionStorage.getItem('playlists1')) ?? [])
    const [playlists2, setPlaylists2] = useState(JSON.parse(sessionStorage.getItem('playlists2')) ?? [])
    const [selectedPlaylists1, setSelectedPlaylists1] = useState([])
    const [selectedPlaylists2, setSelectedPlaylists2] = useState([])
    const [access_token1, setAccess_token1] = useState(sessionStorage.getItem('access_token1') ?? "")
    const [access_token2, setAccess_token2] = useState(sessionStorage.getItem('access_token2') ?? "")
    const [refresh_token1, setRefresh_token1] = useState(sessionStorage.getItem('refresh_token1') ?? "")
    const [refresh_token2, setRefresh_token2] = useState(sessionStorage.getItem('refresh_token2') ?? "")
    const [whoAsked, setWhoAsked] = useState(sessionStorage.getItem('whoAsked') ?? "")
    const [intersectionId, setIntersectionId] = useState("")
    const [intersectionCover, setIntersectionCover] = useState("")
    const [playlistsStatus1, setPlaylistsStatus1] = useState("notRequested")
    const [playlistsStatus2, setPlaylistsStatus2] = useState("notRequested")
    const [errorMessage, setErrorMessage] = useState("")
    const [logInTime1, setLogInTime1] = useState(sessionStorage.getItem('logInTime1') ?? "")
    const [logInTime2, setLogInTime2] = useState(sessionStorage.getItem('logInTime2') ?? "")

    useEffect(() => {
        storeStates()
    }, [name1, name2, access_token1, access_token2, signedIn1, signedIn2, profilePicture1, profilePicture2, playlists1, playlists2, logInTime1, logInTime2, refresh_token1, refresh_token2])


    // Spotify API
    let SpotifyWebApi = require('spotify-web-api-js');
    let spotifyApi = new SpotifyWebApi();


    function storeStates() {
        sessionStorage.setItem('name1', name1);
        sessionStorage.setItem('name2', name2);
        sessionStorage.setItem('access_token1', access_token1);
        sessionStorage.setItem('access_token2', access_token2);
        sessionStorage.setItem('signedIn1', signedIn1);
        sessionStorage.setItem('signedIn2', signedIn2);
        sessionStorage.setItem('profilePicture1', profilePicture1);
        sessionStorage.setItem('profilePicture2', profilePicture2);
        sessionStorage.setItem('userId1', userId1);
        sessionStorage.setItem('userId2', userId2);
        sessionStorage.setItem('playlists1', JSON.stringify(playlists1));
        sessionStorage.setItem('playlists2', JSON.stringify(playlists2));
        sessionStorage.setItem('logInTime1', logInTime1);
        sessionStorage.setItem('logInTime2', logInTime2);
        sessionStorage.setItem('refresh_token1', refresh_token1);
        sessionStorage.setItem('refresh_token2', refresh_token2);
    }

    function restart() {
        setPage("signIn")
        setSelectedPlaylists1([])
        setSelectedPlaylists2([])
    }

    function goToPlaylistSelection() {
        setPage("playlistSelection")
        setSelectedPlaylists1([])
        setSelectedPlaylists2([])
    }

    const [requestAuthorization, generateIntersection] = useSpotifyAPI(name1, setName1, name2, setName2, setPage, playlists1, setPlaylists1, playlists2, setPlaylists2, access_token1, setAccess_token1, access_token2, setAccess_token2, whoAsked, setWhoAsked, spotifyApi, setSignedIn1, setSignedIn2, setProfilePicture1, setProfilePicture2, storeStates, selectedPlaylists1, selectedPlaylists2, userId1, userId2, setUserId1, setUserId2, intersectionId, setIntersectionId, setIntersectionCover, setPlaylistsStatus1, setPlaylistsStatus2, errorMessage, setErrorMessage, refresh_token1, refresh_token2, setRefresh_token1, setRefresh_token2, logInTime1, logInTime2, setLogInTime1, setLogInTime2);

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

    function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
        navigator.clipboard.writeText(text);
        } else {
        document.execCommand('copy', true, text);
        }
    }


    let device;
    if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        device = "mobile"
    } else {
        device = "desktop"
    }

    let containerContent;
    let headerClass;
    if (page === "signIn" || page === "playlistSelection") {
        headerClass = "header headerLong"
        if (device === "desktop") {
            containerContent = <div className="container containerHorizontal">
                <Content side="left" page={page} signedIn={signedIn1} name={name1} handleChangeName={handleChangeName1} placeholder="user1" handleLinkButton={handleLinkButton1} profilePicture={profilePicture1} playlists={playlists1} selectedPlaylists={selectedPlaylists1} setSelectedPlaylists={setSelectedPlaylists1} playlistsStatus1={playlistsStatus1} playlistsStatus2={playlistsStatus2}/>
                <div className="verticalLine"></div>
                <Content side="right" page={page} signedIn={signedIn2} name={name2} handleChangeName={handleChangeName2} placeholder="user2" handleLinkButton={handleLinkButton2} profilePicture={profilePicture2} playlists={playlists2} selectedPlaylists={selectedPlaylists2} setSelectedPlaylists={setSelectedPlaylists2} playlistsStatus1={playlistsStatus1} playlistsStatus2={playlistsStatus2}/>
                <a className="openSource" href="https://github.com/parsasaeedi/interspot">Open Source</a>
            </div>
        } else {
            containerContent = <div className="containerWrapper">
                <div className="container">
                    <Content side="left" page={page} signedIn={signedIn1} name={name1} handleChangeName={handleChangeName1} placeholder="user1" handleLinkButton={handleLinkButton1} profilePicture={profilePicture1} playlists={playlists1} selectedPlaylists={selectedPlaylists1} setSelectedPlaylists={setSelectedPlaylists1} playlistsStatus1={playlistsStatus1} playlistsStatus2={playlistsStatus2}/>
                </div>
                <div className="container">
                    <Content side="right" page={page} signedIn={signedIn2} name={name2} handleChangeName={handleChangeName2} placeholder="user2" handleLinkButton={handleLinkButton2} profilePicture={profilePicture2} playlists={playlists2} selectedPlaylists={selectedPlaylists2} setSelectedPlaylists={setSelectedPlaylists2} playlistsStatus1={playlistsStatus1} playlistsStatus2={playlistsStatus2}/>
                </div>
                <a className="openSource" href="https://github.com/parsasaeedi/interspot">Open Source</a>
            </div>
        }
    } else if (page === "waiting") {
        headerClass = "header headerShort"
        containerContent = 
        <div className="container containerVertical">
            <div className="loading">
                <span>Generating Playlist...</span>
                <div className="loadingAnimation">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
            <a className="openSource" href="https://github.com/parsasaeedi/interspot">Open Source</a>
        </div>
    } else if (page === "success") {
        headerClass = "header headerShort"
        containerContent = 
        <div className="container containerVertical">
            <div className="loading">
                <span>Playlist Generated!</span>
                <img className="loadingAnimation" src="/img/success.gif" alt="success"/>
            </div>
            <a className="openSource" href="https://github.com/parsasaeedi/interspot">Open Source</a>
        </div>
    } else if (page === "result") {
        headerClass = "header headerShort headerBlack"
        let intersectionLink = "https://open.spotify.com/playlist/" + intersectionId
        containerContent = 
        <div className="container containerVertical">
            <div className="intersectionCard">
                <span className="intersectionName">{name1 + " and " + name2}</span>
                <img src={intersectionCover} className="intersectionCover" alt="Intersection Cover" />
                <div className="intersectionLink">
                    <a href={intersectionLink}>{intersectionLink}</a>
                    <button onClick={copyTextToClipboard(intersectionLink)}><img className="copyIcon" src="/img/CopyIcon.png" alt="Copy" /></button>
                </div>
                <a className="openInSpotify" href={intersectionLink}>OPEN IN SPOTIFY</a>
                <span className="playListIsInYourLibrary">You can find this playlist in both of your libraries!</span>
            </div>
            <a className="startOnGitHub" href="https://github.com/parsasaeedi/interspot" rel="noopener" target="_blank" aria-label="Star adamgiebl/neumorphism on GitHub">
                <svg viewBox="0 0 16 16" class="octicon octicon-star" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                <span>Star on GitHub</span>
            </a>
        </div>
    } else if (page === "error") {
        headerClass = "header headerShort"
        containerContent = 
        <div className="container containerVertical">
            <span className="error">{errorMessage}</span>
            <a className="openSource" href="https://github.com/parsasaeedi/interspot">Open Source</a>
        </div>
    }

    if (page === "welcome") {
        return (
            <Welcome setPage={setPage}  />
        )
    } else {
        return(
            <div className={headerClass}>
                <a href="./"><img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" /></a>
                {containerContent}
                <MainButton page={page} handleLinkButton={handleLinkButton2} setPage={setPage} signedIn1={signedIn1} signedIn2={signedIn2} selectedPlaylists1={selectedPlaylists1} selectedPlaylists2={selectedPlaylists2} generateIntersection={generateIntersection} restart={restart} goToPlaylistSelection={goToPlaylistSelection}/>
            </div>
        )
    }

}