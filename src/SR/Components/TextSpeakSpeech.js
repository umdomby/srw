import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import store from "../Store";

const TextSpeakSpeech = observer((props) => {

    const intervalMess = useRef(0)
    const intervalArr = useRef([])
    const intervalArrSpeech = useRef([])
    const [timeSeconds, setTimeSeconds] = useState(3)

    const [textarea_1, setTextarea_1] = useState(localStorage.getItem('textarea_1') || '')
    const [textarea_2, setTextarea_2] = useState(localStorage.getItem('textarea_2') || '')
    const [textarea_3, setTextarea_3] = useState(localStorage.getItem('textarea_3') || '')
    const [textarea_4, setTextarea_4] = useState(localStorage.getItem('textarea_4') || '')
    const [textarea_5, setTextarea_5] = useState(localStorage.getItem('textarea_5') || '')
    const [textarea_6, setTextarea_6] = useState(localStorage.getItem('textarea_6') || '')

    useEffect(()=>{localStorage.setItem('textarea_1', textarea_1);},[textarea_1])
    useEffect(()=>{localStorage.setItem('textarea_2', textarea_2);},[textarea_2])
    useEffect(()=>{localStorage.setItem('textarea_3', textarea_3);},[textarea_3])
    useEffect(()=>{localStorage.setItem('textarea_4', textarea_4);},[textarea_4])
    useEffect(()=>{localStorage.setItem('textarea_5', textarea_5);},[textarea_5])
    useEffect(()=>{localStorage.setItem('textarea_6', textarea_6);},[textarea_6])

    const timer = useRef({})
    const [timerPaused, setTimerPaused] = useState(false)

    useEffect(()=>{
        addValue()
    }, [])

    const addValue = () => {
        intervalArr.current = [textarea_1,textarea_2,textarea_3,textarea_4,textarea_5,textarea_6]
        intervalArrSpeech.current = []
        for(let i = 0; i <= 5 ; i++){
            if(intervalArr.current[i] != '') {
                // console.log(intervalArr.current[i])
                intervalArrSpeech.current.push(intervalArr.current[i])
            }
        }
    }

    useEffect(()=>{
            // console.log('1123123 ' + timer.current)
            timer.current = setInterval(() => {
                if (timerPaused === true) {
                    if (intervalMess.current <= intervalArrSpeech.current.length -1) {
                        // console.log(intervalMess.current)
                        props.setValue(intervalArrSpeech.current[intervalMess.current])
                        intervalMess.current = intervalMess.current + 1
                    } else {
                        intervalMess.current = 0
                    }
                }
            }, timeSeconds * 1000)
        return () => clearInterval(timer.current);
    },[timerPaused])

    return (
        <div className="Dictaphone" style={{color:'white'}}>
            <button onClick={()=>setTimerPaused(!timerPaused)}>{timerPaused ? 'on' : 'off'}</button>
            <input
                value={timeSeconds}
                type="range"
                min="3"
                max="300"
                step="3"
                onChange={(event) => {
                    setTimeSeconds(event.target.value);
                }}
            />
            {timeSeconds + " seconds"}
            <div style={{width:'600px'}}>
                <div>
                    <textarea
                        value={textarea_1}
                        onChange={(event) => {setTextarea_1(event.target.value)}}
                    />
                    <button onClick={()=>props.setValue(textarea_1)}>send</button>
                </div>
                <div>
                    <textarea
                        value={textarea_2}
                        onChange={(event) => setTextarea_2(event.target.value)}
                    />
                    <button onClick={()=>props.setValue(textarea_2)}>send</button>
                </div>
                <div>
                    <textarea
                        value={textarea_3}
                        onChange={(event) => setTextarea_3(event.target.value)}
                    />
                    <button onClick={()=>props.setValue(textarea_3)}>send</button>
                </div>
                <div>
                    <textarea
                        value={textarea_4}
                        onChange={(event) => setTextarea_4(event.target.value)}
                    />
                    <button onClick={()=>props.setValue(textarea_4)}>send</button>
                </div>
                <div>
                    <textarea
                        value={textarea_5}
                        onChange={(event) => setTextarea_5(event.target.value)}
                    />
                    <button onClick={()=>props.setValue(textarea_5)}>send</button>
                </div>
                <div>
                    <textarea
                        value={textarea_6}
                        onChange={(event) => setTextarea_6(event.target.value)}
                    />
                    <button onClick={()=>props.setValue(textarea_6)}>send</button>
                </div>
                <div>
                    <button
                        onClick={()=>addValue()}
                    >reset</button>
                </div>
            </div>
        </div>
    )


});
export default TextSpeakSpeech;
