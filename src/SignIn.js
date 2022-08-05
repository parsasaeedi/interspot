import React, { useState } from 'react';

export default function SignIn(props) {
    return(
        <div className="signIn">
            <div className="name"><input type="text" name="name1" id="name1" spellcheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            <span className='guide'>Link your Spotify profile to select its playlists</span>
            <div className="linkProfile">
                <input type="text" name="playlistId" class="playlistId" spellcheck="false" placeholder="PROFILE LINK"/>
                <img src="/img/circle-question.png" alt="help" />
                <button>LINK</button>
            </div>
        </div>
    )
}