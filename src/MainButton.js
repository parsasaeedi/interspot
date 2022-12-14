import React from "react";

export default function MainButton(props) {

    // On click, do different things on different pages
    const handleClick = () => {
        if (props.page === "signIn") {
            props.setPage("playlistSelection")
            window.scrollTo(0,0); 
        } else if (props.page === "playlistSelection") {
            props.generateIntersection();
            props.setPage("waiting")
        } else if (props.page === "result") {
            props.restart()
        } else if (props.page === "error") {
            props.goToPlaylistSelection()
        }
    }

    // Set the button text for each page
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
    } else if (props.page === "error") {
        button = <button className='mainButton' onClick={handleClick}>Go back</button>
    }

    return button
}