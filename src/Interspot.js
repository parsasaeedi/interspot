import React, { useState, useEffect } from 'react';
import PlaylistSelection from './PlaylistSelection'
import SignIn from './SignIn'
import useSpotifyAPI from './useSpotifyAPI';
import MainButton from './MainButton';
import Content from './Content';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Welcome from './Welcome';
import PrivacyPolicy from './PrivacyPolicy';
import { Link } from "react-router-dom";

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
    const [whoAsked, setWhoAsked] = useState(sessionStorage.getItem('whoAsked') ?? "")
    const [intersectionId, setIntersectionId] = useState("")
    const [intersectionCover, setIntersectionCover] = useState("")
    const [playlistsStatus1, setPlaylistsStatus1] = useState("notRequested")
    const [playlistsStatus2, setPlaylistsStatus2] = useState("notRequested")
    const [errorMessage, setErrorMessage] = useState("")
    const [logInTime1, setLogInTime1] = useState(sessionStorage.getItem('logInTime1') ?? "")
    const [logInTime2, setLogInTime2] = useState(sessionStorage.getItem('logInTime2') ?? "")

    // Restart the app
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

    // Use Custom Hook useSpotifyAPI for cleaner code
    const [requestAuthorization, generateIntersection] = useSpotifyAPI(name1, setName1, name2, setName2, setPage, playlists1, setPlaylists1, playlists2, setPlaylists2, whoAsked, setWhoAsked, setSignedIn1, setSignedIn2, setProfilePicture1, setProfilePicture2, selectedPlaylists1, selectedPlaylists2, userId1, userId2, setUserId1, setUserId2, intersectionId, setIntersectionId, setIntersectionCover, setPlaylistsStatus1, setPlaylistsStatus2, errorMessage, setErrorMessage, logInTime1, logInTime2, setLogInTime1, setLogInTime2);

    // event handlers
    const handleChangeName1 = ({target}) => {
        setName1(target.value)
        sessionStorage.setItem('name1', target.value);
    }
    const handleChangeName2 = ({target}) => {
        setName2(target.value)
        sessionStorage.setItem('name2', target.value);
    }
    const handleLinkButton1 = ({target}) => {
        sessionStorage.setItem('whoAsked', "left");
        requestAuthorization();
    }
    const handleLinkButton2 = ({target}) => {
        sessionStorage.setItem('whoAsked', "right");
        requestAuthorization();
    }

    function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
        navigator.clipboard.writeText(text);
        } else {
        document.execCommand('copy', true, text);
        }
    }

    // Set user device type
    let device;
    if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        device = "mobile"
    } else {
        device = "desktop"
    }

    // Set the content displayed
    let containerContent;
    let headerClass;
    // signIn and playlistSelection
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
    // waiting
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
    // success
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
    // result
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
    // error
    } else if (page === "error") {
        headerClass = "header headerShort"
        containerContent = 
        <div className="container containerVertical">
            <span className="error">{errorMessage}</span>
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
                <Link className="privacyPolicyLink" to="/privacy-policy">Privacy Policy</Link>
            </div>
        )
    }

}