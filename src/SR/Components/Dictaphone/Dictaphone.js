import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {russian} from "./russian";
import store from "../../Store";
import {messageL} from "../../Control/messageL";
import {messageR} from "../../Control/messageR";


const Dictaphone = () => {

    const [languages, setLanguages] = useState('ru-RU')

    useEffect(() => {
        SpeechRecognition.startListening({continuous: true, language: languages});
        //setTimeout(()=> SpeechRecognition.startListening({continuous: true, language: languages}), 2000)
        return ()=> SpeechRecognition.stopListening();
    }, []);

    // useEffect(() => {
    //     SpeechRecognition.startListening({continuous: true, language: languages});
    // }, [languages]);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({continuous: true, language: languages});
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }
    if (transcript.toString().length > 100) {
        resetTranscript()
    }

    // if(transcript.toString().toLowerCase().includes('привет')){
    //     resetTranscript()
    // }

    const FBL = (FBL) => {
        store.setMessageFBL(FBL)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBL',
            messageFBL: FBL
        }))
    }
    const FBR = (FBR) => {
        store.setMessageFBR(FBR)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBR',
            messageFBR: FBR
        }))
    }


    let action = russian(transcript.toString().toLowerCase(), languages)
    console.log(action)
    if (action != '') {
        if (action === 'вперёд' || action === 'go') {
            messageL(3)
            messageR(3)
            FBL(true)
            FBR(true)
            console.log('вперёд1')
        }
        if (action === 'назад' || action === 'back') {
            messageL(-3)
            messageR(-3)
            FBL(false)
            FBR(false)
            console.log('назад2')
        }
        if (action === 'влево' || action === 'left') {
            messageL(3)
            messageR(-3)
            FBL(true)
            FBR(false)
            console.log('влево3')
        }
        if (action === 'вправа' || action === 'right') {
            messageL(-3)
            messageR(3)
            FBL(false)
            FBR(true)
            console.log('вправа4')
        }
        if (action === 'стоп' || action === 'stop') {
            messageL(0)
            messageR(0)
            console.log('стоп5')
        }
        resetTranscript()
    }

    console.log(transcript)

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className="Dictaphone">
            <div style={{margin: 3, color:'white'}}>Microphone: {listening ? 'on' : 'off'} {languages}</div>
            <div>
                <button onClick={startListening}>Start</button>
                <button onClick={stopListening}>Stop</button>
                <br/>
                <div style={{color:'white'}}>
                    {transcript}
                </div>
            </div>
        </div>
    );
};
export default Dictaphone;
