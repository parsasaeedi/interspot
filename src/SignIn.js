import React, { useState } from 'react';

export default function SignIn(props) {

    let center = props.signedIn ? <img className="profilePicture" src={props.profilePicture}/> : <span className='guide'>Link your Spotify profile to select its playlists</span>

    let linkText = props.signedIn ? "RELINK" : "LINK"


    return(
        <div className="signIn">
            <div className="name"><input type="text" className="name1" id="name1" spellCheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            {center}
            <button onClick={props.handleLinkButton}>{linkText}</button>
        </div>
    )
}