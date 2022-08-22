import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
import file from '../mp3/oh.mp3'

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
            me: store.me
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

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files.length) {
            setImage(event.dataTransfer.files[0]);
            fileReader.readAsDataURL(event.dataTransfer.files[0]);
        }
    };

    const handleDragEmpty = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };


    //const audioTune = new Audio(imageURL)
    // if(store.audioURL !== ''){
    //     audioTune.current = new Audio(store.audioURL)
    // }
    const [playInLoop, setPlayInLoop] = useState(false);

    // load audio file on component load
    // useEffect(() => {
    //     console.log(imageURL)
    //     if(store.audioURL !== '') {
    //         audioTune.current.load();
    //     }
    // }, [])

    // set the loop of audio tune
    useEffect(() => {
        if(store.audioURL !== '') {
            audioTune.current = playInLoop;
        }
    }, [playInLoop])

    // play audio sound
    // const playSound = () => {
    //     //console.log('11123 '  + imageURL)
    //     audioTune.current = new Audio(imageURL)
    //     audioTune.current.play();
    // }
    //
    // // pause audio sound
    // const pauseSound = () => {
    //     audioTune.current.pause();
    // }
    //
    // // stop audio sound
    // const stopSound = () => {
    //     audioTune.current.pause();
    //     audioTune.current.currentTime = 0;
    // }

    useEffect(()=>{
        console.log('store.audioURL')
        try {
            if(store.audioURL !== '') {
                // audioTune.current = null
                //audioTune.current = store.audioURL
                // audioTune.current.load();
                audioTune.current.src = store.audioURL
                audioTune.current.play();
            }
        }catch (e) {
            console.log(e)
        }


        // return ()=> {
        //     audioTune.current.pause();
        //     audioTune.current.src = {}
        // }

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
            me: store.me
        }))
    }
    const playOhYea = () =>{
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioOhYea',
            message: file,
            me: store.me
        }))
    }
    useEffect(()=>{
        if(store.audioOhYea != null) {
            audioTune.current.src = store.audioOhYea
            audioTune.current.play();
        }
        store.setAudioOhYea(null)
    }, [store.audioOhYea])

    return (
        <div>
            {/*<input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>*/}
            {/*<input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>*/}
            {/*<input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>*/}
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
            <img
                //src={imageURL ? imageURL : "img.png"}
                src={"img.png"}
                className="file-uploader__preview"
                alt="preview"
                onDrop={handleDrop}
                onDragEnter={handleDragEmpty}
                onDragOver={handleDragEmpty}
            />
            <div className="file-uploader__file-name">{image ? image.name : ""}</div>
            </div>
            {/*<button*/}
            {/*    onClick={()=> {*/}
            {/*        store.webSocket.send(JSON.stringify({*/}
            {/*            id: store.idSocket,*/}
            {/*            method: 'audioURL',*/}
            {/*            message: imageURL,*/}
            {/*            me: store.me*/}
            {/*        }))*/}
            {/*    }}*/}
            {/*>*/}
            {/*    send*/}
            {/*</button>*/}
            <div>
                <button onClick={()=>{if(store.audioURL !== ''){audioTune.current.play()}}}>miPlay</button>
                <button onClick={()=>{if(store.audioURL !== ''){audioTune.current.pause()}}}>miPause</button>
                <button onClick={()=>{ if(store.audioURL !== ''){audioTune.current.pause();
                    audioTune.current.currentTime = 0;}}}>miStop</button>
            </div>
            <div>
                <button onClick={()=>playPauseStopAudio(1)}>Play</button>
                <button onClick={()=>playPauseStopAudio(2)}>Paused</button>
                <button onClick={()=>playPauseStopAudio(3)}>Stop</button>
            </div>
            <div>
                <button onClick={()=>playOhYea()}>oh-Yea</button>
            </div>
        </div>
    );
});
