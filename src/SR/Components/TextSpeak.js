import React, {useCallback, useEffect, useRef, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import {messageL} from "../Control/messageL";
import {messageR} from "../Control/messageR";
import useEventListener from "@use-it/event-listener";
import TextSpeakSpeech from "./TextSpeakSpeech";
import TextSpeakYouTube from "./TextSpeakYouTube";
import {FileUploader} from "./File-uploader";
const axios = require('axios').default;


const TextSpeak = observer(() => {

    const refSaddleUP = useRef(true)
    const refSaddleDOWN = useRef(true)

    //Speak
    //const [text, setText] = useState('');
    const [pitch, setPitch] = useState(0.6);
    const [rate, setRate] = useState(1);
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [noVoiceSpeak, setNoVoiceSpeak] = useState(false)
    const onEnd = () => {
        //setText('')
        // You could do something here after speaking has finished
    };
    // const { speak } = useSpeechSynthesis({
    // });
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
        onEnd,
    });
    const voice = voices[voiceIndex] || null;
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
            me: store.me
        }))
        setValueTxt('')
    }

    useEffect(()=> {
        if(store.textSpeak != '' && store.textSpeak != null && store.textSpeak != undefined) {
            console.log('store.textSpeak ' + store.textSpeak)
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
                me: store.me
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
            <TextSpeakSpeech setValue={setValue}/>
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
                checked={store.me}
                onChange={()=>store.setMe(!store.me)}
            />
                {store.me ? 'true' : 'false'}
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
            <label htmlFor="voice">Voice</label>
            <select
                id="voice"
                name="voice"
                value={voiceIndex || ''}
                onChange={(event) => {
                    setVoiceIndex(event.target.value);
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
                <div>{rate}</div>
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
            </div>
            <div style={{styleContainerRatePitch, styleFlexRow, color: 'white'}}>
                <div>{pitch}</div>
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
            </div>
            <br/>
            {listening && <div>Go ahead I'm listening</div>}
            {/*<button type="button" onClick={() => speak({ text, voice, rate, pitch })}>Speak</button>*/}
            {/*    <TextSpeakYouTube/>*/}
                <FileUploader/>
            </div>
        {/*</div>}*/}
        </div>
    )


});
export default TextSpeak;
