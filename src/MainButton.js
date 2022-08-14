import React from "react";

export default function MainButton(props) {
    let buttonText = props.page==="signIn" ? "CONTINUE" : "GENERATE";

    const handleClick = () => {
        if (props.page === "signIn") {
            props.setPage("playlistSelection")
        } else if (props.page === "playlistSelection") {
            props.generateIntersection();
        }
    }

    let button
    if (props.page === "signIn") {
        if (!(props.signedIn1 && props.signedIn2)) {
            button = <button className='mainButton' onClick={handleClick} disabled>{buttonText}</button>
        } else {
            button = <button className='mainButton' onClick={handleClick}>{buttonText}</button>
        }
    } else if (props.page === "playlistSelection") {
        if (!(props.selectedPlaylists1.length > 0 && props.selectedPlaylists2.length > 0)) {
            button = <button className='mainButton' onClick={handleClick} disabled>{buttonText}</button>
        } else {
            button = <button className='mainButton' onClick={handleClick}>{buttonText}</button>
        }
    }

    return button
}