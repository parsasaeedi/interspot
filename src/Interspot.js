import React, { useState } from 'react';
import PlaylistSelection from './PlaylistSelection'
import SignIn from './SignIn'

export default function Interspot() {
    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const [spotifyId1, setSpotifyId1] = useState("")
    const [spotifyId2, setSpotifyId2] = useState("")
    const [linkedSpotifyId1, setLinkedSpotifyId1] = useState("")
    const [linkedSpotifyId2, setLinkedSpotifyId2] = useState("")
    const [page, setPage] = useState("signIn")
    const [selectedPlaylists1, setSelectedPlaylists1] = useState([])
    const [selectedPlaylists2, setSelectedPlaylists2] = useState([])

    let button = page=="signIn" ? "CONTINUE" : "GENERATE";

    const handleChangeName1 = ({target}) => setName1(target.value)
    const handleChangeName2 = ({target}) => setName2(target.value)

    const handleChangeSpotifyId1 = ({target}) => setSpotifyId1(target.value)
    const handleChangeSpotifyId2 = ({target}) => setSpotifyId2(target.value)

    const handleLinkButton1 = ({target}) => {
        // Do stuff
        setLinkedSpotifyId1(target.value)
    }
    const handleLinkButton2 = ({target}) => {
        // Do stuff
        setLinkedSpotifyId2(target.value)
    }

    let leftContent, rightContent;

    if (page == "signIn") {
        leftContent = <SignIn name={name1} handleChangeName={handleChangeName1} placeholder="user1" spotifyId={spotifyId1} handleChangeSpotifyId={handleChangeSpotifyId1} handleLinkButton={handleLinkButton1}/>;
        rightContent = <SignIn name={name2} handleChangeName={handleChangeName2} placeholder="user2" spotifyId={spotifyId2} handleChangeSpotifyId={handleChangeSpotifyId2} handleLinkButton={handleLinkButton2}/>
    } else if (page == "playlistSelection") {
        leftContent = <PlaylistSelection spotifyId={spotifyId1} name={name1} handleChangeName={handleChangeName1} placeholder="user1"/>
        rightContent = <PlaylistSelection spotifyId={spotifyId2} name={name2} handleChangeName={handleChangeName2} placeholder="user2"/>
    }

    const handleMainButton = () => {
        if (page == "signIn") {
            setPage("playlistSelection")
        }
    }

    return(
        <div className="header">
            <img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" />
            <div className="container">
                {leftContent}
                <div className="verticalLine"></div>
                {rightContent}
            </div>
            <button className='mainButton' onClick={handleMainButton}>{button}</button>
        </div>
    )
}