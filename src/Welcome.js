import React from "react";

export default function Welcome(props) {

    function handleButton() {
        props.setPage("signIn")
        sessionStorage.setItem('page', "signIn");
        window.scrollTo(0,0); 
    }

    return (
        <div className="header headerMedium">
            <a href="./"><img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" /></a>
            <div className="welcomeContainer">
                <div className="about">
                    <span>No more fighting over the music.</span>
                    <span>Easily create a playlist with songs that you both like.</span>
                </div>
                <div className="steps">
                    <div className="step">
                        <img src="img/one.png" className="number" alt="step one" />
                        <div className="screenshotWrapper">
                            <img className="screenshot" src="/img/Screenshots/SignIn.png" alt="Sign In Screenshot" />
                        </div>
                        <div className="stepInfo">
                            <span>Securely link your Spotify accounts</span>
                        </div>
                    </div>
                    <div className="step">
                        <img src="img/two.png" className="number" alt="step one" />
                        <div className="screenshotWrapper">
                            <img className="screenshot" src="/img/Screenshots/PlaylistSelection.png" alt="Playlist Selection Screenshot" />
                        </div>
                        <div className="stepInfo">
                            <span>Select from your Playlists</span>
                        </div>
                    </div>
                    <div className="step result">
                        <img src="img/three.png" className="number" alt="step one" />
                        <div className="screenshotWrapper">
                            <img className="screenshot" src="/img/Screenshots/Result.png" alt="Playlist Selection Screenshot" />
                        </div>
                        <div className="stepInfo">
                            <span>Get a playlist with intersecting songs</span>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleButton} className="mainButton">CONTINUE</button>
        </div>
    )
}