import React, { useState } from 'react';
import Playlist from './Playlist';

export default function PlaylistSelection(props) {

    // console.log(props.playlists)

    return(
        <div className="playlistSelection">
            <div className="name"><input type="text" name="name1" id="name1" spellCheck="false" value={props.name} onChange={props.handleChangeName} placeholder={props.placeholder}/></div>
            <div className="playlistsContainer">
                <div className="playlistsWrapper">
                    {/* <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                    <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                    <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                    <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                    <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                    <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                    <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                    <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div> */}
                    {props.playlists.length > 0 && props.playlists.map(({name, id, cover}, index) => (
                        <Playlist key={index} name={name} id={id} cover={cover} selectedPlaylists={props.selectedPlaylists} setSelectedPlaylists={props.setSelectedPlaylists}/>
                    ))}
                </div>
            </div>
            {/* <div className="addPlaylist">
                <input type="text" name="playlistId1" id="playlistId1" className="playlistId" spellCheck="false" placeholder="PLAYLIST LINK"/>
                <img src="/img/circle-question.png" alt="help" />
                <button>ADD</button>
            </div> */}
        </div>
    )
}