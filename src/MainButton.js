import React from "react";

export default function MainButton(props) {

    const handleClick = () => {
        if (props.page === "signIn") {
            props.setPage("playlistSelection")
        } else if (props.page === "playlistSelection") {
            props.generateIntersection();
            props.setPage("waiting")
        } else if (props.page === "result") {
            // Reset
        }
    }

    let button
    if (props.page === "signIn") {
        if (!(props.signedIn1 && props.signedIn2)) {
            button = <button className='mainButton' onClick={handleClick} disabled>CONTINUE</button>
        } else {
            button = <button className='mainButton' onClick={handleClick}>CONTINUE</button>
        }
    } else if (props.page === "playlistSelection") {
        if (!(props.selectedPlaylists1.length > 0 && props.selectedPlaylists2.length > 0)) {
            button = <button className='mainButton' onClick={handleClick} disabled>GENERATE</button>
        } else {
            button = <button className='mainButton' onClick={handleClick}>GENERATE</button>
        }
    } else if (props.page === "waiting" ||props.page === "success" ) {
        button = <button className='mainButton' onClick={handleClick} disabled>WAITING...</button>
    } else if (props.page === "result") {
        button = <button className='mainButton' onClick={handleClick}>Restart</button>
    }

    return button
}