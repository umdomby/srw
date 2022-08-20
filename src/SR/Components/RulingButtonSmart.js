import {observer} from "mobx-react-lite";
import React, {useEffect, useRef} from "react";
import '../sr.css'
import store from "../Store"
import {messageL} from "../Control/messageL";
import {messageR} from "../Control/messageR";
import useEventListener from '@use-it/event-listener'
import 'bootstrap/dist/css/bootstrap.min.css';

const RulingButtonSmart = observer(() => {

    const UP = useRef(0)
    const UPBool = useRef(false)
    const DOWN = useRef(0)
    const DOWNBool = useRef(false)

    const interval = useRef()
    const intervalBool = useRef(false)


    const FBLR = (FBL, FBR) => {
        store.setMessageFBL(FBL)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBLR',
            messageFBL: FBL,
            messageFBR: FBR
        }))
    }

    function Stop(){
        messageL(0)
        messageR(0)
        UP.current = 0
        DOWN.current = 0
        UPBool.current = false
        DOWNBool.current = false
        clearInterval(interval.current)
        intervalBool.current = false
    }

    // const mouseDOWN = () =>{
    //     console.log('11111')
    // }

    const sendDataTime = () => {
        console.log('231231313')
        if(intervalBool.current === false){
            interval.current = setInterval(()=>{
                messageL(UP.current)
                messageR(DOWN.current)
                intervalBool.current = true
                console.log('interval')
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
                        sendDataTime()
                        if(UP.current < 201 && DOWNBool.current === false) {
                            UPBool.current = true
                            FBLR(true, true)
                            UP.current = UP.current + 50
                            DOWN.current = DOWN.current + 50
                            messageL(UP.current)
                            messageR(DOWN.current)
                            console.log(UP.current)
                        }else if(UP.current >= 50 && DOWNBool.current === true){
                            UP.current = UP.current - 50
                            DOWN.current = DOWN.current - 50
                            messageL(UP.current)
                            messageR(DOWN.current)
                            console.log(UP.current)
                        }else if(UP.current === 0){
                            UPBool.current = false
                        }
                    }}
                >UP</button>
            </div>
            <div className="RulingBottomDown">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        sendDataTime()
                        if(DOWN.current < 201 && UPBool.current === false) {
                            FBLR(false, false)
                            DOWNBool.current = true
                            UP.current = UP.current + 50
                            DOWN.current = DOWN.current + 50
                            messageL(UP.current)
                            messageR(DOWN.current)
                            console.log(UP.current)
                        }else if(DOWN.current >= 50 && UPBool.current === true){
                            UP.current = UP.current - 50
                            DOWN.current = DOWN.current - 50
                            messageL(UP.current)
                            messageR(DOWN.current)
                            console.log(UP.current)
                        }else if(DOWN.current === 0){
                            DOWNBool.current = false
                        }
                    }}
                >DOWN</button>
            </div>
            <div className="RulingBottomLeft">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        FBLR(false, true)
                        messageL(100)
                        messageR(100)
                    }}
                >LEFT</button>
            </div>
            <div className="RulingBottomRight">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        FBLR(true, false)
                        messageL(100)
                        messageR(100)
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
