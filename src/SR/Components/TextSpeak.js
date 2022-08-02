import React, {useCallback, useEffect, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
const axios = require('axios').default;

const TextSpeak = observer(() => {

    //translate
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    // useEffect(()=>{
    //     translate()
    // }, [output])

    const translate = () => {
        // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

        const params = new URLSearchParams();
        params.append('q', store.textSpeak);
        params.append('source', from);
        params.append('target', to);
        params.append('api_key', 'AIzaSyBvBuyaUdGGyDiT90vGvdWvUebwfztZ1Jg');

        axios.post('https://libretranslate.de/translate',params, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res=>{
            console.log(res.data)
            //setOutput(res.data.translatedText)
            setOutput(res.data.translatedText)

        })
    };

    useEffect(() => {
        axios
            .get('https://libretranslate.de/languages', {
                headers: { accept: 'application/json' },
            })
            .then((res) => {
                console.log(res.data);
                setOptions(res.data);
            });
    }, []);
    //End translate


    const { speak } = useSpeechSynthesis();
    const [value, setValue] = useState('');
    //const [replyValue, setReplyValue] = useState('');
    const [lang, setLang] = useState('ru-RU'); //распозование
    //const [lang, setLang] = useState('en-AU');

    const { listen, listening, stop} = useSpeechRecognition({
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

    // useEffect(()=> {
    //     //speak({ text: store.textSpeak })
    //     console.log('from react server', store.textSpeak)
    //     setReplyValue(store.textSpeak)
    // },[store.textSpeak])

    useEffect(()=>{
        if(store.textSpeak != '') {
            translate()
        }
    },[store.textSpeak])

    useEffect(()=> {
        speak({ text: output, lang:'en-AU' })
    }, [output])

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
                {store.textSpeak}
            </div>


            {/*<textarea*/}
            {/*    value={value}*/}
            {/*    onChange={(event) => setValue(event.target.value)}*/}
            {/*/>*/}
            {/*<button onMouseDown={listen} onMouseUp={stop}>*/}
            {/*    🎤*/}
            {/*</button>*/}

            {/*translate*/}
            <div>
                From ({from}) :
                <select onChange={(e) => setFrom(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                To ({to}) :
                <select onChange={(e) => setTo(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>
            {/*<div>*/}
            {/*    <textarea*/}
            {/*        cols="50"*/}
            {/*        rows="8"*/}
            {/*        onInput={(e) => setInput(e.target.value)}*/}
            {/*    ></textarea>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <textarea cols="50" rows="8" value={output}></textarea>*/}
            {/*</div>*/}
            <div style={{color: 'white'}}>
                {output}
            </div>

            <div>
                <button onClick={e=>translate()}>Translate</button>
            </div>

        </div>
    );
});
export default TextSpeak;
