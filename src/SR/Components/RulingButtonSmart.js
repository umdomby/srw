import {observer} from "mobx-react-lite";
import React, {useEffect, useRef, useState} from "react";
import '../sr.css'
import store from "../Store"
import {messageL} from "../Control/messageL";
import {messageR} from "../Control/messageR";
import useEventListener from '@use-it/event-listener'
import 'bootstrap/dist/css/bootstrap.min.css';

const RulingButtonSmart = observer(() => {

    const LEFT = useRef(0)
    const LEFTBool = useRef(false)
    const RIGHT = useRef(0)
    const RIGHTBool = useRef(false)
    const [REV, setREV ]= useState(false)

    const interval = useRef()
    const [intervalBool, setIntervalBool ]= useState(false)

    const speed = useRef(25)
    const [line, setLine] = useState('UP')

    const FBLR = (FBL, FBR) => {
        store.setMessageFBL(FBL)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBLR',
            messageFBL: FBL,
            messageFBR: FBR
        }))
    }


    // const FBL = (FBL, FBR) => {
    //     store.setMessageFBL(FBL)
    //     store.webSocket.send(JSON.stringify({
    //         id: store.idSocket,
    //         method: 'messagesFBLR',
    //         messageFBL: FBL
    //     }))
    // }
    //
    // const FBR = (FBR) => {
    //     store.setMessageFBL(FBR)
    //     store.webSocket.send(JSON.stringify({
    //         id: store.idSocket,
    //         method: 'messagesFBLR',
    //         messageFBR: FBR
    //     }))
    // }

    function Stop(){
        messageL(0)
        messageR(0)
        LEFT.current = 0
        RIGHT.current = 0
        LEFTBool.current = false
        RIGHTBool.current = false
        clearInterval(interval.current)
        setIntervalBool(false)
    }

    // const mouseDOWN = () =>{
    //     console.log('11111')
    // }

    const sendDataTime = () => {
        console.log('231231313')
        if(intervalBool === false){
            setIntervalBool(true)
            interval.current = setInterval(()=>{
                messageL(LEFT.current)
                messageR(RIGHT.current)
                console.log('interval')
                if(LEFT.current === 0 && RIGHT.current === 0){
                    clearInterval(interval.current)
                    setIntervalBool(false)
                }
            }, 1000)
        }
    }

    return (
        <div>
            <div className="RulingBottomUp">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(intervalBool === false) {
                            sendDataTime()
                        }
                        if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                        if(LEFT.current === 0){
                            LEFTBool.current = false
                        }
                        if(LEFT.current < 226 && RIGHTBool.current === false) {
                            LEFTBool.current = true
                            if(line === 'DOWN'){
                                FBLR(true, true)
                                setLine('UP')
                                console.log('UP')
                            }else{
                                FBLR(true, true)
                                setLine('UP')
                                LEFT.current = LEFT.current + speed.current
                                messageL(LEFT.current)
                                console.log(LEFT.current)
                            }
                        }else if(LEFT.current >= speed.current && RIGHTBool.current === true){
                            LEFT.current = LEFT.current - speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }
                        if(RIGHT.current < 226 && RIGHTBool.current === false) {
                            if(line === 'DOWN'){
                                FBLR(true, true)
                                setLine('UP')
                                console.log('UP')
                            }else{
                            LEFTBool.current = true
                            FBLR(true, true)
                            setLine('UP')
                            RIGHT.current = RIGHT.current + speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)}
                        }else if(RIGHT.current >= speed.current && RIGHTBool.current === true){
                            RIGHT.current = RIGHT.current - speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }
                    }}
                >UP</button>
            </div>
            <div className="RulingBottomDown">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(intervalBool === false) {
                            sendDataTime()
                        }
                        if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                        if(LEFT.current === 0){
                            LEFTBool.current = false
                        }
                        if(RIGHT.current < 226 && LEFTBool.current === false) {
                            if(line === 'UP'){
                                FBLR(false, false)
                                setLine('DOWN')
                                console.log('DOWN')
                            }else{
                            FBLR(false, false)
                            setLine('DOWN')
                            RIGHTBool.current = true
                            RIGHT.current = RIGHT.current + speed.current
                            messageR(RIGHT.current)
                            console.log(LEFT.current)}
                        }else if(RIGHT.current >= speed.current && LEFTBool.current === true){
                            RIGHT.current = RIGHT.current - speed.current
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }
                        if(LEFT.current < 226 && LEFTBool.current === false) {
                            if(line === 'UP'){
                                FBLR(false, false)
                                setLine('DOWN')
                                console.log('DOWN')
                            }else{
                            FBLR(false, false)
                            setLine('DOWN')
                            RIGHTBool.current = true
                            LEFT.current = LEFT.current + speed.current
                            messageL(LEFT.current)
                            console.log(LEFT.current)}
                        }else if(LEFT.current >= speed.current && LEFTBool.current === true){
                            LEFT.current = LEFT.current - speed.current
                            messageL(LEFT.current)
                            console.log(LEFT.current)
                        }
                    }}
                >DOWN</button>
            </div>
            <div className="RulingBottomRev">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        setREV(!REV)
                    }}
                >{REV ? 'NO REV' : 'REV'}</button>
            {REV &&
                <div>
                    {line}
                    <div className="RulingBottomLeft-">
                        <button
                            type="button"
                            className="btnTransparent"
                            onClick={()=>{
                                if (LEFT.current >= speed.current ) {
                                    LEFT.current = LEFT.current - speed.current
                                    messageL(LEFT.current)
                                    console.log(LEFT.current)
                                }
                            }}
                        >LEFT-</button>
                    </div>
                    <div className="RulingBottomRight-">
                        <button
                            type="button"
                            className="btnTransparent"
                            onClick={()=>{
                                if (RIGHT.current >= speed.current) {
                                    RIGHT.current = RIGHT.current - speed.current
                                    messageL(LEFT.current)
                                    console.log(LEFT.current)
                                }
                            }}
                        >RIGHT-</button>
                    </div>
                </div>
            }
            </div>
            <div className="RulingBottomLeft">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(intervalBool === false) {
                            sendDataTime()
                        }
                        if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                        if(LEFT.current === 0){
                            LEFTBool.current = false
                        }
                        if(REV === false) {
                            if (LEFT.current < 226 && RIGHTBool.current === false) {
                                LEFTBool.current = true
                                FBLR(false, true)
                                LEFT.current = LEFT.current + speed.current
                                RIGHT.current = RIGHT.current + speed.current
                                messageL(LEFT.current)
                                messageR(RIGHT.current)
                                console.log(LEFT.current)
                            } else if (LEFT.current >= speed.current && RIGHTBool.current === true) {
                                LEFT.current = LEFT.current - speed.current
                                RIGHT.current = RIGHT.current - speed.current
                                messageL(LEFT.current)
                                messageR(RIGHT.current)
                                console.log(LEFT.current)
                            }
                        }else{
                            if (LEFT.current < 226 ) {
                                LEFT.current = LEFT.current + speed.current
                                messageL(LEFT.current)
                                console.log(LEFT.current)
                            }
                        }
                    }}
                >LEFT+</button>
            </div>
            <div className="RulingBottomRight">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(intervalBool === false) {
                            sendDataTime()
                        }
                        if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                        if(LEFT.current === 0){
                            LEFTBool.current = false
                        }
                        if(REV === false) {
                            if (RIGHT.current < 226 && LEFTBool.current === false) {
                                FBLR(true, false)
                                RIGHTBool.current = true
                                LEFT.current = LEFT.current + speed.current
                                RIGHT.current = RIGHT.current + speed.current
                                messageL(LEFT.current)
                                messageR(RIGHT.current)
                                console.log(LEFT.current)
                            } else if (RIGHT.current >= speed.current && LEFTBool.current === true) {
                                LEFT.current = LEFT.current - speed.current
                                RIGHT.current = RIGHT.current - speed.current
                                messageL(LEFT.current)
                                messageR(RIGHT.current)
                                console.log(LEFT.current)
                            }
                        }else{
                            if (RIGHT.current < 226) {
                                RIGHT.current = RIGHT.current + speed.current
                                messageL(LEFT.current)
                                console.log(LEFT.current)
                            }
                        }
                    }}
                >RIGHT+</button>
            </div>
            <div className="RulingBottomStop">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        Stop()
                    }}
                >STOP</button>
            </div>
        </div>
    );
});

export default RulingButtonSmart;
