import React, { useState } from 'react';

export default function Playlist(props) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected)
        props.setSelectedPlaylists([...props.selectedPlaylists, props.id])
    }

    let className = selected ? "playlistSelected" : "playlist"
    
    return (
        <div className={className} onClick={handleClick}><img src={props.cover} alt={props.name} className="playlistCover" /><span className="playlistName">{props.name}</span></div>
    )
}