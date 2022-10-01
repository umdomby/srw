import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
import ReactPlayer from 'react-player'

export const MongoMusic = observer(() => {

    const sendMusicMongo = (link) => {
        //console.log(link)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioURL',
            message: link,
            meSend: store.meSend
        }))
    }

    return(
        <div className="music-container">
            <div>
                {/*{console.log(store.mongoMusic)}*/}
                {store.mongoMusic.map((mongoMusic, index) =>
                <div
                    style={{color:'red', width:'250px'}}
                    key={index}
                >
                    <button onClick={()=>sendMusicMongo(mongoMusic.link)}>{mongoMusic.name}</button>
                </div>
                )}
            </div>
        </div>
    )

})