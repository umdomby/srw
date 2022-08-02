import React, {useCallback, useEffect, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import SpeechRecognition from "react-speech-recognition";

const TextSpeak = observer(() => {
    const { speak } = useSpeechSynthesis();
    const [value, setValue] = useState('');
    const [replyValue, setReplyValue] = useState('');
    const [lang, setLang] = useState('ru-RU');

    const { listen, listening, stop, interimResults } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'textSpeak',
            text: value,
        }))
        //setValue('')
    }

    useEffect(()=> {
        speak({ text: store.textSpeak })
        console.log('from react server', store.textSpeak)
        setReplyValue(store.textSpeak)
    },[store.textSpeak])

    console.log('render')

    useEffect(()=>{
        setTimeout(()=> listen({ lang, interimResults: false}), 2000)
        return ()=> stop()
    }, [])


    // const ListenF = () => {
    //     listen({ lang });
    // };

    useEffect(()=> {
        if(value != '') {
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'textSpeak',
                text: value,
            }))
        }
    },[value])

    return (
        <div className="Dictaphone">
            <div>
                <textarea
                    style={{height:'50px'}}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyPress={(event) => event.key === "Enter" && handleSubmit(event)}
                />
                <button onClick={listen}>
                    🎤
                </button>
                <button onClick={stop}>
                    stop
                </button>
                {listening && <div style={{color:'white'}}>Go ahead I'm listening</div>}
            </div>
            <div style={{color: 'white'}}>
                {replyValue}
            </div>


            {/*<textarea*/}
            {/*    value={value}*/}
            {/*    onChange={(event) => setValue(event.target.value)}*/}
            {/*/>*/}
            {/*<button onMouseDown={listen} onMouseUp={stop}>*/}
            {/*    🎤*/}
            {/*</button>*/}


        </div>
    );
});
export default TextSpeak;
