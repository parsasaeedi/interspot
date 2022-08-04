import React, { useState } from 'react';

export default function Interspot() {
    const [user1, setUser1] = useState("")
    const [user2, setUser2] = useState("")
    const [page, setPage] = useState("signIn")

    return(
        <div className="header">
            <img src="/img/InterspotLogo.png" alt="InterspotLogo" className="interspotLogo" />
            <div className="container">
                <div className="content">
                    <div className="name"><input type="text" name="name1" id="name1" spellcheck="false" placeholder="User1"/></div>
                    <div className="playlistsContainer">
                        <div className="playlistsWrapper">
                            <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                            <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                            <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                            <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                            <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                            <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                            <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                            <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                        </div>
                    </div>
                    <div className="addPlaylist">
                        <input type="text" name="playlistId1" id="playlistId1" class="playlistId" spellcheck="false" placeholder="PLAYLIST LINK"/>
                        <img src="/img/circle-question.png" alt="help" />
                        <button>ADD</button>
                    </div>
                </div>
                <div className="verticalLine"></div>
                <div className="content">
                    <div className="name"><input type="text" name="name2" id="name2" spellcheck="false" placeholder="User2"/></div>
                    <div className="playlistsContainer">
                        <div className="playlistsWrapper">
                            <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                            <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                            <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                            <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                            <div className="playlist"><img src="/img/playlist1.png" alt="playlist1" className="playlistCover" /><span className="playlistName">playlist1</span></div>
                            <div className="playlist"><img src="/img/playlist2.png" alt="playlist2" className="playlistCover" /><span className="playlistName">playlist2</span></div>
                            <div className="playlist"><img src="/img/playlist3.png" alt="playlist3" className="playlistCover" /><span className="playlistName">playlist3</span></div>
                            <div className="playlist"><img src="/img/playlist4.png" alt="playlist4" className="playlistCover" /><span className="playlistName">playlist4</span></div>
                        </div>
                    </div>
                    <div className="addPlaylist">
                        <input type="text" name="playlistId1" id="playlistId1" class="playlistId" spellcheck="false" placeholder="PLAYLIST LINK"/>
                        <img src="/img/circle-question.png" alt="help" />
                        <button>ADD</button>
                    </div>
                </div>
            </div>
            <button className='generateButton'>GENERATE</button>
        </div>
    )
}