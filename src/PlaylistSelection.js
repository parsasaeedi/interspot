import React, { useState } from 'react';
import Playlist from './Playlist';

export default function PlaylistSelection(props) {

    return(
        <div className="playlistSelection">
            <div className="name"><input type="text" name="name1" id="name1" spellCheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            <div className="playlistsContainer">
                <div className="playlistsWrapper">
                    {props.playlists.length > 0 && props.playlists.map(({name, id, cover}, index) => (
                        <Playlist key={index} name={name} id={id} cover={cover} selectedPlaylists={props.selectedPlaylists} setSelectedPlaylists={props.setSelectedPlaylists}/>
                    ))}
                </div>
            </div>
            <img className="spotifyLogo" src="/img/Spotify_Logo_RGB_White.png" alt="Spotify Logo" />
            {/* <div className="addPlaylist">
                <input type="text" name="playlistId1" id="playlistId1" className="playlistId" spellCheck="false" placeholder="PLAYLIST LINK"/>
                <img src="/img/circle-question.png" alt="help" />
                <button>ADD</button>
            </div> */}
        </div>
    )
}