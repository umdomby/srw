import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
// import file from '../mp3/oh.mp3'

export const FileUploader = observer(() => {
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState('');
    const audioTune = useRef(new Audio())

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setImageURL(fileReader.result);
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
            setImage(file);
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
        console.log('store.audioURL')
        try {
            if(store.audioURL !== '') {
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
                <button onClick={()=>{if(store.audioURL !== ''){
                    audioTune.current.src = imageURL
                    audioTune.current.play()}}}>miPlay</button>
                <button onClick={()=>{if(store.audioURL !== ''){audioTune.current.pause()}}}>miPause</button>
                <button onClick={()=>{ if(store.audioURL !== ''){audioTune.current.pause();
                    audioTune.current.currentTime = 0;}}}>miStop</button>
            </div>
            <div>
                <button onClick={()=>playPauseStopAudio(1)}>Play</button>
                <button onClick={()=>playPauseStopAudio(2)}>Paused</button>
                <button onClick={()=>playPauseStopAudio(3)}>Stop</button>
            </div>
        </div>
    );
});
