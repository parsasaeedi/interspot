import React from "react";
import SignIn from "./SignIn";
import PlaylistSelection from "./PlaylistSelection";

export default function Content(props) {
    let content
    if (props.page === "signIn") {
        content = <SignIn signedIn={props.signedIn} name={props.name} handleChangeName={props.handleChangeName} placeholder={props.placeholder} handleLinkButton={props.handleLinkButton} profilePicture={props.profilePicture}/>;
    } else if (props.page === "playlistSelection") {
        content = <PlaylistSelection name={props.name} handleChangeName={props.handleChangeName} placeholder="user1"/>
    }

    return content
}