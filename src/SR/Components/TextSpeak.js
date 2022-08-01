import React, {useEffect, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

const TextSpeak = observer(() => {
    const { speak } = useSpeechSynthesis();
    const [value, setValue] = useState('');

    const { listen, listening, stop } = useSpeechRecognition({
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
        setValue('')
    }

    useEffect(()=> {
        console.log('from react server', store.textSpeak)
        speak({ text: store.textSpeak })
    },[store.textSpeak])

    // useEffect(()=> {
    //     speak({ text: value })
    //     store.webSocket.send(JSON.stringify({
    //         id: store.idSocket,
    //         method: 'textSpeak',
    //         text: value,
    //     }))
    //     //setValue('')
    // },[value])

    return (
        <div className="Dictaphone">
          <textarea
              style={{height:'50px'}}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyPress={(event) => event.key === "Enter" && handleSubmit(event)}
          />
            {/*<textarea*/}
            {/*    value={value}*/}
            {/*    onChange={(event) => setValue(event.target.value)}*/}
            {/*/>*/}
            {/*<button onMouseDown={listen} onMouseUp={stop}>*/}
            {/*    🎤*/}
            {/*</button>*/}
            <button onClick={listen}>
                🎤
            </button>
            <button onClick={stop}>
                stop
            </button>
            {listening && <div>Go ahead I'm listening</div>}


        </div>
    );
});
export default TextSpeak;
