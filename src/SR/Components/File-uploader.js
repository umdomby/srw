import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
import ohLittle from "./ohLittle.mp3"

export const FileUploader = observer(() => {
    //const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState(ohLittle);
    const audioTune = useRef(new Audio())
    const [audioVolume2, setAudioVolume2] = useState(1)

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setImageURL(fileReader.result);
        //store.setPlayMp3(fileReader.result)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioURL',
            message: fileReader.result,
            meSend: store.meSend
        }))
    };
    const handleOnChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            // setImage(file);
            fileReader.readAsDataURL(file);
        }
    };

    const [playInLoop, setPlayInLoop] = useState(false);

    // set the loop of audio tune
    useEffect(() => {
        if(store.audioURL !== '') {
            audioTune.current = playInLoop;
        }
    }, [playInLoop])

    useEffect(()=>{
        console.log(store.audioURL)
        try {
            if(store.audioURL !== '') {
                setImageURL(store.audioURL)
                audioTune.current.src = store.audioURL
                audioTune.current.play();
            }
        }catch (e) {
            console.log(e)
        }
    },[store.audioURL])

    useEffect(()=>{
        console.log('store.audioPlaying')
        if(store.audioURL !== '') {
            if (store.audioPlaying === 1) {
                audioTune.current.play();
            } else if (store.audioPlaying === 2) {
                audioTune.current.pause();
            } else if (store.audioPlaying === 3) {
                audioTune.current.pause();
                audioTune.current.currentTime = 0;
            }
        }
    },[store.audioPlaying])

    const playPauseStopAudio = (message) => {
        console.log('playPauseStopAudio  message: ' + message)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioURLto',
            message: message,
            meSend: store.meSend
        }))
    }
    useEffect(()=>{
        console.log('volume ' + store.audioVolume)
        audioTune.current.volume = store.audioVolume
    }, [store.audioVolume])

    return (
        <div>
            <label
                htmlFor="file-loader-button"
                className="file-uploader__custom-button"
            >
                {/*Загрузить файл*/}
            </label>
            <input
                id="file-loader-button"
                type="file"
                className="file-uploader__upload-button"
                onChange={handleOnChange}
            />
            <div>
                <button onClick={()=>{
                    audioTune.current.src = imageURL
                    audioTune.current.volume = store.audioVolume
                    audioTune.current.play()
                }}>miPlay</button>
                <button onClick={()=>{audioTune.current.pause()}}>miPause</button>
                <button onClick={()=>{
                    audioTune.current.pause();
                    audioTune.current.currentTime = 0;}}>miStop</button>
            </div>
            <div>
                <input
                    type="range"
                    value={audioVolume2}
                    min="0.1"
                    max="1"
                    step="0.1"
                    id="audioVolume2"
                    onChange={(event) => {
                        setAudioVolume2(event.target.value);
                        audioTune.current.volume = audioVolume2
                    }}
                />
                {audioVolume2}
            </div>

            <div>
                <button onClick={()=>playPauseStopAudio(1)}>Play</button>
                <button onClick={()=>playPauseStopAudio(2)}>Paused</button>
                <button onClick={()=>playPauseStopAudio(3)}>Stop</button>
            </div>
            <div>
                <input
                    type="range"
                    value={store.audioVolume}
                    min="0.1"
                    max="1"
                    step="0.1"
                    id="audioVolume"
                    onChange={(event) => {
                        store.setAudioVolume(event.target.value);
                        store.webSocket.send(JSON.stringify({
                            id: store.idSocket,
                            method: 'audioVolume',
                            message: event.target.value,
                            meSend: store.meSend
                        }))
                    }}
                />
                {store.audioVolume}
            </div>
        </div>
    );
});
