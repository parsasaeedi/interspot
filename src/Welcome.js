import React from "react";
import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="header">
            <a href="./"><img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" /></a>
            <div className="welcomeContainer">
                <div className="about">
                    <span>No more fighting for the AUX.</span>
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
            <Link to="/create" className="mainButton">CONTINUE</Link>
        </div>
    )
}