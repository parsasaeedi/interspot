import React, { useState } from 'react';

export default function SignIn(props) {
    return(
        <div className="signIn">
            <div className="name"><input type="text" className="name1" id="name1" spellCheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            <span className='guide'>Link your Spotify profile to select its playlists</span>
            <button onClick={props.handleLinkButton}>LINK</button>
        </div>
    )
}