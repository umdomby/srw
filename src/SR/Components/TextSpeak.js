import React, {useEffect, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis } from 'react-speech-kit';

const TextSpeak = observer(() => {
    const { speak } = useSpeechSynthesis();
    const [value, setValue] = useState('');
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
        console.log('22222', store.textSpeak)
        speak({ text: store.textSpeak })
    },[store.textSpeak])

    return (
        <div className="Dictaphone">
          <textarea
              style={{height:'50px'}}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyPress={(event) => event.key === "Enter" && handleSubmit(event)}
          />
        </div>
    );
});
export default TextSpeak;
