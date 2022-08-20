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

    const interval = useRef()
    const [intervalBool, setIntervalBool ]= useState(false)

    const speed = useRef(25)


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
                        if(LEFT.current < 226 && RIGHTBool.current === false) {
                            LEFTBool.current = true
                            FBLR(true, true)
                            LEFT.current = LEFT.current + speed.current
                            RIGHT.current = RIGHT.current + speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }else if(LEFT.current >= speed.current && RIGHTBool.current === true){
                            LEFT.current = LEFT.current - speed.current
                            RIGHT.current = RIGHT.current - speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }else if(LEFT.current === 0){
                            LEFTBool.current = false
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
                        if(RIGHT.current < 226 && LEFTBool.current === false) {
                            FBLR(false, false)
                            RIGHTBool.current = true
                            LEFT.current = LEFT.current + speed.current
                            RIGHT.current = RIGHT.current + speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }else if(RIGHT.current >= speed.current && LEFTBool.current === true){
                            LEFT.current = LEFT.current - speed.current
                            RIGHT.current = RIGHT.current - speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }
                        if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                        if(LEFT.current === 0){
                            LEFTBool.current = false
                        }}
                    }
                >DOWN</button>
            </div>
            <div className="RulingBottomLeft">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(intervalBool === false) {
                            sendDataTime()
                        }
                        if(LEFT.current < 226 && RIGHTBool.current === false) {
                            LEFTBool.current = true
                            FBLR(false, true)
                            LEFT.current = LEFT.current + speed.current
                            RIGHT.current = RIGHT.current + speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }else if(LEFT.current >= speed.current && RIGHTBool.current === true){
                            LEFT.current = LEFT.current - speed.current
                            RIGHT.current = RIGHT.current - speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }
                        if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                        if(LEFT.current === 0){
                            LEFTBool.current = false
                        }}
                    }
                >LEFT</button>
            </div>
            <div className="RulingBottomRight">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(intervalBool === false) {
                            sendDataTime()
                        }
                        if(RIGHT.current < 226 && LEFTBool.current === false) {
                            FBLR(true, false)
                            RIGHTBool.current = true
                            LEFT.current = LEFT.current + speed.current
                            RIGHT.current = RIGHT.current + speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }else if(RIGHT.current >= speed.current && LEFTBool.current === true){
                            LEFT.current = LEFT.current - speed.current
                            RIGHT.current = RIGHT.current - speed.current
                            messageL(LEFT.current)
                            messageR(RIGHT.current)
                            console.log(LEFT.current)
                        }else if(RIGHT.current === 0){
                            RIGHTBool.current = false
                        }
                    }}
                >RIGHT</button>
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
