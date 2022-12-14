import React, { useState } from 'react';

export default function Playlist(props) {

    // States
    // Whether or not the playlist is selected by the user
    const [selected, setSelected] = useState(false);

    // When the playlist is clicked, it becomes green, and the playlist id is added to the relative selectedPlaylists
    const handleClick = () => {
        if (selected) {
            props.setSelectedPlaylists((prev) => {
                return prev.filter(id => id !== props.id)
            })
        } else {
            props.setSelectedPlaylists([...props.selectedPlaylists, props.id])
        }
        setSelected(!selected)
    }

    let className = selected ? "playlistSelected" : "playlist"
    let playlistLink = "https://open.spotify.com/playlist/" + props.id
    let externalLinkIcon = <svg className="playlistLinkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" fill="currentcolor"/></svg>
    
    return (
        <div className={className} onClick={handleClick}>
            <img 
                src={props.cover} alt={props.name} className="playlistCover" 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/img/DefaultCover.jpg";
                }}
            />
            <span className="playlistName">
                {props.name} 
                <a className="playlistLink" href={playlistLink} alt="Playlist Link" target="_blank" rel="noopener noreferrer">{externalLinkIcon}</a>
            </span>
        </div>
    )
}