import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
import ReactPlayer from 'react-player'

export const MongoMusic = observer(() => {

    const [pll, setPll] = useState([])

    const sendMusicMongo = (link) => {
        //console.log(link)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioURL',
            message: link,
            meSend: store.meSend
        }))
    }

    const sendMusicMongoPl = (pl) => {
        //console.log(link)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoMusicPl',
            message: pl
        }))
    }
    useEffect(()=> {
        setTimeout(()=> {
            if(store.mongoMusic) {
                setPll(store.mongoMusic.filter((v,i,a)=>a.findIndex(v2=>(v2.pl===v.pl))===i))
            }
        }, 1000)
    }, [])

    return(
        <div className="music-container">
            <div>
                {/*{console.log(store.mongoMusic)}*/}
                {pll.map((mongoMusic, index) =>
                    <div
                        style={{color:'red', width:'250px', display: 'inline'}}
                        key={index}
                    >
                        <button onClick={()=>sendMusicMongoPl(mongoMusic.pl)}>{mongoMusic.pl}</button>
                    </div>
                )}
                {store.mongoMusic.map((mongoMusic, index) =>
                <div
                    style={{color:'red', width:'250px'}}
                    key={index}
                >
                    <button onClick={()=>sendMusicMongo(mongoMusic.link)}>{mongoMusic.name}, {mongoMusic.pl} </button>
                </div>
                )}
            </div>
        </div>
    )

})