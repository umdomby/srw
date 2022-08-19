import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import store from "../Store";
import ReactPlayer from 'react-player/youtube'

const TextSpeakSpeechYoutube = observer((props) => {

    const [linkVideo, setLinkVideo] = useState('')
    const [url, setUrl] = useState('')
    const [playing, setPlaying] = useState(false)

    useEffect(()=>{
        setUrl(store.youTubeLink)
        setPlaying(store.youTubePlaying)
    },[store.youTubeLink, store.youTubePlaying])

    return (
        <div style={{color:'white'}}>
            <div className='player-wrapper'>
            <ReactPlayer
                 url={url}
                 height={'150px'}
                 width={'300px'}
                 playing={playing}
            />
                <input
                    value={linkVideo}
                    type="text"
                    onChange={(event)=>{setLinkVideo(event.target.value)
                        setPlaying(false)
                    }}
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            setUrl(linkVideo)
                            setPlaying(true)
                        }
                    }}
                />
                <button onClick={()=>{
                    setUrl(linkVideo)
                    console.log(linkVideo)
                    setPlaying(!playing) }}
                >{playing ? 'stop' : 'start'}</button>

                <button  onClick={()=>{
                    store.webSocket.send(JSON.stringify({
                        id: store.idSocket,
                        method: 'youTubeLink',
                        message: linkVideo,
                        playing: true,
                        me: false
                    }))
                }}>send</button>

                <button  onClick={()=>{
                    store.webSocket.send(JSON.stringify({
                        id: store.idSocket,
                        method: 'youTubeLink',
                        message: linkVideo,
                        playing: false,
                        me: false
                    }))
                }}>stop</button>
            </div>
        </div>
    )


});
export default TextSpeakSpeechYoutube;
