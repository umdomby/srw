import React, {useCallback, useEffect, useRef, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import useEventListener from "@use-it/event-listener";
import {FileUploader} from "./File-uploader";
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';


const TextSpeak = observer(() => {

    const refSaddleUP = useRef(true)
    const refSaddleDOWN = useRef(true)

    //Speak
    const [pitch, setPitch] = useState(0.6);
    const [rate, setRate] = useState(1);
    const [noVoiceSpeak, setNoVoiceSpeak] = useState(false)
    //speed
    const [speedControl, setSpeedControl] = useState(null);
    // const onEnd = () => {
    // };
    const { speak, cancel, speaking, supported, voices} = useSpeechSynthesis({
        // onEnd,
    });
    const [voiceIndex, setVoiceIndex] = useState(localStorage.getItem('voicesId') || '');

    const voice = voices[localStorage.getItem('voicesId') || null];
    const styleFlexRow = { display: 'flex', flexDirection: 'row' };

    const styleContainerRatePitch = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12,
    };
    //END SPEAK

    const [value, setValue] = useState('');
    const [valueTxt, setValueTxt] = useState('');
    const [lang, setLang] = useState('ru-RU'); //распозование

    const languageOptions = [
        { label: 'Russian', value: 'ru-RU' },
        { label: 'Cambodian', value: 'km-KH' },
        { label: 'Deutsch', value: 'de-DE' },
        { label: 'English', value: 'en-AU' },
        { label: 'Farsi', value: 'fa-IR' },
        { label: 'Français', value: 'fr-FR' },
        { label: 'Italiano', value: 'it-IT' },
        { label: '普通话 (中国大陆) - Mandarin', value: 'zh' },
        { label: 'Portuguese', value: 'pt-BR' },
        { label: 'Español', value: 'es-MX' },
        { label: 'Svenska - Swedish', value: 'sv-SE' },
    ];

    const changeLang = (event) => {
        setLang(event.target.value);
    };

    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'textSpeak',
            text: valueTxt,
            meSend: store.meSend
        }))
        setValueTxt('')
    }

    useEffect(()=> {
        if(store.textSpeak != '' && store.textSpeak != null && store.textSpeak != undefined) {
            speak({text: store.textSpeak, voice, rate, pitch})
        }
    }, [store.textSpeak])

    useEffect(()=>{
        if(speaking === true){
            stop()
        }
        else if(speaking === false && noVoiceSpeak === true){
            listen({ lang, interimResults: false})
        }
    },[speaking])
    console.log('render')

    useEffect(()=>{
        cancel()
    },[store.noSpeech])

    useEffect(()=> {
        console.log('value ' + value)
        if(value != '') {
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'textSpeak',
                text: value,
                meSend: store.meSend
            }))
        }
    },[value])

    const noSpeak = () => {
        stop()
        setNoVoiceSpeak(false)
    }

    const socketSend = (method, value) => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: method,
            message: value
        }))
    }

    function handlerUP({ key }) {
        if(String(key) === 'ArrowUp'){
            refSaddleUP.current = true
            socketSend('saddleUP', true)
        } else if(String(key) === 'ArrowDown'){
            refSaddleDOWN.current = true
            socketSend('saddleDOWN', true)
        }
    }

    function handlerDOWN({ key }) {
        // console.log(String(key));
        if(String(key) === 'ArrowUp' && refSaddleDOWN.current === true){
            socketSend('saddleUP', false)
            refSaddleUP.current = false
            console.log('refSaddleUP ' + refSaddleUP.current);
        }else if(String(key) === 'ArrowDown' && refSaddleUP.current === true){
            socketSend('saddleDOWN', false)
            refSaddleDOWN.current = false
            console.log('refSaddleDOWN ' + refSaddleDOWN.current);
        }else if(String(key) === 'ArrowLeft'){
            socketSend('light', true)
        }else if(String(key) === 'ArrowRight'){
            socketSend('light', false)
        }
    }
    useEventListener('keydown', handlerDOWN);
    useEventListener('keyup', handlerUP);

    return (
        <div style={{color:'white'}}>
            {/*{hiddenSpeech && <TextSpeakSpeech setValue={setValue}/>}*/}
            {/*{hidden && <div>*/}
            {/*<TextSpeakSpeech setValue={setValue}/>*/}
            <div className="Dictaphone10">
                <button
                    onClick={()=> cancel()}
                >
                    Stop speech me
                </button>
                <button
                    onClick={()=> {
                        store.webSocket.send(JSON.stringify({
                            id: store.idSocket,
                            method: 'noSpeech',
                            message: true,
                        }))
                    }}
                >
                    Stop speech to
                </button>
            <div>
                {value}
            </div>
            <textarea
                style={{height:'50px'}}
                value={valueTxt}
                onChange={(event) => setValueTxt(event.target.value)}
                onKeyPress={(event) => event.key === "Enter" && handleSubmit(event)}
            />
                <div>
            <select
                form="speech-recognition-form"
                id="language"
                value={lang}
                onChange={changeLang}
            >
                {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
                <div>
                    <button
                        onClick={()=>{
                            listen({ lang, interimResults: false})
                            setNoVoiceSpeak(true)
                        }}
                    >
                        🎤
                    </button>
                    <button
                        onClick={()=>noSpeak()}
                    >
                        stop
                    </button>
                    <input
                        type="checkbox"
                        checked={store.meSend}
                        onChange={()=>store.setMeSend(!store.meSend)}
                    />
                    {store.meSend ? 'true' : 'false'}
                </div>
                <div style={{color: 'white'}}>
                    {store.textSpeak}
                </div>
                {!supported && (
                    <p>
                        Oh no, it looks like your browser doesn&#39;t support Speech
                        Synthesis.
                    </p>
                )}
                </div>

            <label htmlFor="voice">Voice</label>
                <select
                    id="voice"
                    name="voice"
                    style={{width:'100px'}}
                    value={voiceIndex || ''}
                    onChange={(event) => {
                        localStorage.setItem('voicesId', event.target.value)
                        setVoiceIndex(event.target.value);
                        console.log(event.target.value)
                    }}
                >

                    <option value="">Default</option>
                    {voices.map((option, index) => (
                        <option key={option.voiceURI} value={index}>
                            {`${option.lang} - ${option.name}`}
                        </option>
                    ))}
                </select>
            <div style={{styleContainerRatePitch, styleFlexRow, color: 'white'}}>
                <input
                    type="range"
                    value={rate}
                    min="0"
                    max="2"
                    step="0.1"
                    id="rate"
                    onChange={(event) => {
                        setRate(event.target.value);
                    }}
                />
                {rate}
            </div>
            <div style={{styleContainerRatePitch, styleFlexRow, color: 'white'}}>
                <input
                    value={pitch}
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    id="pitch"
                    onChange={(event) => {
                        setPitch(event.target.value);
                    }}
                />
                {pitch}
            </div>
            <br/>
            {listening && <div>Go ahead I'm listening</div>}
            {/*<button type="button" onClick={() => speak({ text, voice, rate, pitch })}>Speak</button>*/}
            {/*    <TextSpeakYouTube/>*/}
                <FileUploader/>
            </div>
        {/*</div>}*/}

            {/*<button onClick={()=>{*/}
            {/*    store.webSocket.send(JSON.stringify({*/}
            {/*        id: store.idSocket,*/}
            {/*        method: 'data',*/}
            {/*        message: voices[1].lang*/}
            {/*    }))*/}
            {/*}}>2222</button>*/}

            {/*<ReactPlayer url='https://drive.google.com/u/0/uc?id=1GpeRbUuHWgURaGWt6QoIJEFcDRUn91OI&export=download' />*/}
            {/*<ReactAudioPlayer*/}
            {/*    //src="https://drive.google.com/file/d/1GpeRbUuHWgURaGWt6QoIJEFcDRUn91OI/view?usp=sharing"*/}
            {/*    src="https://drive.google.com/u/0/uc?id=1GpeRbUuHWgURaGWt6QoIJEFcDRUn91OI&export=download"*/}
            {/*    //src="https://servicerobot.pro:4433/1.mp3"*/}
            {/*    autoPlay={true}*/}
            {/*    controls*/}
            {/*/>*/}

        </div>
    )


});
export default TextSpeak;
