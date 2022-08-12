import React from "react";

export default function MainButton(props) {
    let buttonText = props.page==="signIn" ? "CONTINUE" : "GENERATE";

    const handleClick = () => {
        if (props.page === "signIn") {
            // Add stuff
            props.setPage("playlistSelection")
        }
    }

    let button
    if (!(props.signedIn1 && props.signedIn2)) {
        button = <button className='mainButton' onClick={handleClick} disabled>{buttonText}</button>
    } else {
        button = <button className='mainButton' onClick={handleClick}>{buttonText}</button>
    }

    return button
}