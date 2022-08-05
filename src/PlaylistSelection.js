import React, { useState } from 'react';

export default function PlaylistSelection(props) {
    return(
        <div className="playlistSelection">
            <div className="name"><input type="text" name="name1" id="name1" spellcheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            <div className="playlistsContainer">
                <div className="playlistsWrapper">
                    <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                    <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                    <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                    <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                    <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                    <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                    <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                    <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                </div>
            </div>
            <div className="addPlaylist">
                <input type="text" name="playlistId1" id="playlistId1" class="playlistId" spellcheck="false" placeholder="PLAYLIST LINK"/>
                <img src="/img/circle-question.png" alt="help" />
                <button>ADD</button>
            </div>
        </div>
    )
}