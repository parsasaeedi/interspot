import React, { useState } from 'react';

export default function SignIn(props) {

    let center = props.signedIn ? <img className="profilePicture" src={props.profilePicture}/> : <span className='guide'>Link your Spotify profile to select its playlists</span>

    let linkText = props.signedIn ? "RELINK" : "LINK"

    let button;

    // When a new user signs in, disable the link button on the other user until all the other users's playlists are recieved
    if (props.side === "left") {
        if (props.playlistsStatus2 === "notRequested") {
            button = <button onClick={props.handleLinkButton}>{linkText}</button>
        } else if (props.playlistsStatus2 === "requested") {
            button = <button onClick={props.handleLinkButton} disabled>{linkText}</button>
        } else if (props.playlistsStatus2 === "received") {
            button = <button onClick={props.handleLinkButton}>{linkText}</button>
        }
    } else if (props.side === "right") {
        if (props.playlistsStatus1 === "notRequested") {
            button = <button onClick={props.handleLinkButton}>{linkText}</button>
        } else if (props.playlistsStatus1 === "requested") {
            button = <button onClick={props.handleLinkButton} disabled>{linkText}</button>
        } else if (props.playlistsStatus1 === "received") {
            button = <button onClick={props.handleLinkButton}>{linkText}</button>
        }
    }

    return(
        <div className="signIn">
            <div className="name"><input type="text" className="name1" id="name1" spellCheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            {center}
            {button}
        </div>
    )
}