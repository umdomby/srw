import React, {useCallback, useEffect, useRef, useState} from 'react';
import store from "../Store";
import {observer} from "mobx-react-lite";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
const axios = require('axios').default;


const TextSpeak = observer(() => {

    const [showResults, setShowResults] = useState(true)
    const onClick = () => setShowResults(!showResults)

    //translate
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [writeText, setWriteText] = useState('');
    const translate = () => {
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
            setText(res.data.translatedText)
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

    //Speak
    const [text, setText] = useState('');
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [voiceIndex, setVoiceIndex] = useState(null);
    const onEnd = () => {
        setText('')
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
            text: valueTxt,
        }))
        setValueTxt('')
    }

    // useEffect(()=> {
    //     //speak({ text: store.textSpeak })
    //     console.log('from react server', store.textSpeak)
    //     setReplyValue(store.textSpeak)
    // },[store.textSpeak])

    useEffect(()=>{
        if(store.textSpeak != '' ) {
            translate()
            //setText(store.textSpeak) //no translate
        }
    },[store.textSpeak])

    useEffect(()=> {
        //speak({ text: output, lang:'en-AU' })
        ///setText(output)
        if(text != '' && text != null && text != undefined) {
            //setText(output)
            speak({ text, voice, rate, pitch })
        }
    }, [text])

    useEffect(()=>{
        if(speaking === true){
            stop()
        }else{
            listen({ lang, interimResults: false})
        }
    },[speaking])

    console.log('render')

    useEffect(()=>{
        setTimeout(()=> listen({ lang, interimResults: false}), 1000)
        return ()=> stop()
    }, [lang])


    useEffect(()=> {
        if(value != '') {
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'textSpeak',
                text: value,
            }))
        }
    },[value])


    const Results = () => (
        <div>
            <div>
                {value}
            </div>
            <textarea
                style={{height:'50px'}}
                value={valueTxt}
                onChange={(event) => setValueTxt(event.target.value)}
                onKeyPress={(event) => event.key === "Enter" && handleSubmit(event)}
            />
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
            <button onClick={listen}>
                🎤
            </button>
            <button onClick={stop}>
                stop
            </button>
            <div style={{color: 'white'}}>
                {store.textSpeak}
            </div>
            <div>
                From ({from}) :
                <select onChange={(e) => setFrom(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                            {/*{console.log( '222222 ' + opt.code + ' ' + opt.name)}*/}
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
            <div style={{color: 'white'}}>
                {text}
            </div>
            {/*    <button onClick={e=>translate()}>Translate</button>*/}
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
            {listening && <div>Go ahead I'm listening</div>}
            {/*<button type="button" onClick={() => speak({ text, voice, rate, pitch })}>Speak</button>*/}

        </div>
    )
    return (
        <div className="Dictaphone" style={{color:'white'}}>
            <input type="submit" value="HIDE" onClick={onClick} />
            { showResults ? <Results /> : null }
        </div>
    )


});
export default TextSpeak;
