import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {russian} from "./russian";



const Dictaphone33 = () => {

    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const [voice, setVoice] = useState(true)
    const [languages, setLanguages] = useState('ru-RU')

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    useEffect(() => {
         loadSpeechRecognition();
    }, []);

    const loadSpeechRecognition = () => {
        setLoadingSpeechRecognition(false);
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }

    useEffect(() => {
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }, [languages]);


    useEffect(() => {
        speech(transcript.toString().toLowerCase())
        if (transcript.toString().length > 100) {
            resetTranscript()
        }
    }, [transcript]);


    const controlUp = () => {
        console.log('controlUp')
    }
    const controlDown = () => {
        console.log('controlUp')
    }
    const controlLeft = () => {
        console.log('controlUp')
    }
    const controlRight = () => {
        console.log('controlUp')
    }
    const controlStop = () => {

    }

    const speech = (text) => {
        let action = russian(text, voice, languages)
        if (action != '') {
            if (action === 'голос включен') {
                setVoice(true)
            }
            if (action === 'голос выключен') {
                setVoice(false)
            }
            if (action === 'мимика включена') {
                if (action === 'мимика выключена') {
                }
                if (action === 'вперёд' || action === 'go') {
                    controlUp()
                }
                if (action === 'назад' || action === 'back') {
                    controlDown()
                }
                if (action === 'влево' || action === 'left') {
                    controlLeft()
                }
                if (action === 'вправа' || action === 'right') {
                    controlRight()
                }
                if (action === 'стоп' || action === 'stop') {
                    controlStop()
                }
                if (action === 'мимика и голос включены') {
                }
                if (action === 'мимика и голос выключены') {
                }
                resetTranscript()
            }
        }
    }

    if (loadingSpeechRecognition || !browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <div>
            <div style={{margin: 3}}>Microphone: {listening ? 'on' : 'off'} {languages}</div>
            <div>
                <button onClick={startListening}>Start</button>
                <button onClick={stopListening}>Stop</button>
            </div>
        </div>
    );
};
export default Dictaphone33;
