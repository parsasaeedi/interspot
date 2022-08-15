import React from "react";
import SignIn from "./SignIn";
import PlaylistSelection from "./PlaylistSelection";

export default function Content(props) {
    let content
    if (props.page === "signIn") {
        content = <SignIn side={props.side} signedIn={props.signedIn} name={props.name} handleChangeName={props.handleChangeName} placeholder={props.placeholder} handleLinkButton={props.handleLinkButton} profilePicture={props.profilePicture} playlistsStatus1={props.playlistsStatus1} playlistsStatus2={props.playlistsStatus2}/>;
    } else if (props.page === "playlistSelection") {
        content = <PlaylistSelection name={props.name} handleChangeName={props.handleChangeName} placeholder="user1" playlists={props.playlists} selectedPlaylists={props.selectedPlaylists} setSelectedPlaylists={props.setSelectedPlaylists}/>
    }

    return content
}