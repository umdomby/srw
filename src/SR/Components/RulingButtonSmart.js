import {observer} from "mobx-react-lite";
import React from "react";
import '../sr.css'
import store from "../Store"
import {messageL} from "../Control/messageL";
import {messageR} from "../Control/messageR";
import useEventListener from '@use-it/event-listener'
import 'bootstrap/dist/css/bootstrap.min.css';

const RulingButtonSmart = observer(() => {

    const speed = 3
    const FBL = (FBL) => {
        store.setMessageFBL(FBL)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBL',
            messageFBL: FBL
        }))
    }
    const FBR = (FBR) => {
        store.setMessageFBR(FBR)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messagesFBR',
            messageFBR: FBR
        }))
    }

    function Stop(){
        messageL(0)
        messageR(0)
    }

    return (
        <div>
            <div className="RulingBottomUp">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if (store.messageL < speed) {
                            store.setMessageL(store.messageL + 1)
                            messageL(store.messageL)
                        }
                        if (store.messageR < speed) {
                            store.setMessageR(store.messageR + 1)
                            messageR(store.messageR)
                        }
                        if (store.messageL > 0) {
                            FBL(true)
                        }
                        if (store.messageR > 0) {
                            FBR(true)
                        }
                    }}
                >UP</button>
            </div>
            <div className="RulingBottomDown">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if (store.messageL > -speed) {
                            store.setMessageL(store.messageL - 1)
                            store.setMessageR(store.messageR - 1)
                            messageL(store.messageL)
                            messageR(store.messageR)
                        }
                        if (store.messageL < 0) {
                            FBL(false)
                        }
                        if (store.messageR < 0) {
                            FBR(false)
                        }
                    }}
                >DOWN</button>
            </div>
            <div className="RulingBottomStop">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        messageL(0)
                        messageR(0)
                    }}
                >STOP</button>
            </div>
            <div className="RulingBottomLeft">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(store.messageL < 0){
                            FBL(true)
                            FBR(true)
                            messageL(1)
                            messageR(0)
                        }
                        else if((store.messageL === 3 && store.messageR === 3)
                            || (store.messageL === 3 && store.messageR === 2)
                            || (store.messageL === 3 && store.messageR === 1)){
                            FBR(true)
                            store.setMessageR(store.messageR - 1)
                            messageR(store.messageR)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                        else if (   store.messageL < 3 && store.messageR < 3
                            && store.messageL >= 0 && store.messageR >= 0) {
                            FBL(true)
                            store.setMessageL(store.messageL + 1)
                            messageL(store.messageL)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                        else if(store.messageR === 3 && store.messageL < 3){
                            FBL(true)
                            store.setMessageL(store.messageL + 1)
                            messageL(store.messageL)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }

                        //reverce
                        else if (store.messageR === 0 && store.messageL === 3){
                            messageR(- 1)
                            FBL(true)
                            FBR(false)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                        else if (store.messageR === -1 && store.messageL === 3){
                            messageR(-2)
                            FBL(true)
                            FBR(false)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                        else if (store.messageR === -2 && store.messageL === 3){
                            messageR(-3)
                            FBL(true)
                            FBR(false)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                    }}
                >LEFT</button>
            </div>
            <div className="RulingBottomRight">
                <button
                    type="button"
                    className="btnTransparent"
                    onClick={()=>{
                        if(store.messageR < 0){
                            FBL(true)
                            FBR(true)
                            messageL(0)
                            messageR(1)
                        }
                        else if(    (store.messageL === 3 && store.messageR === 3)
                            || (store.messageL === 2 && store.messageR === 3)
                            || (store.messageL === 1 && store.messageR === 3)){
                            FBL(true)
                            store.setMessageL(store.messageL - 1)
                            messageL(store.messageL)
                        }
                        else if (   store.messageL < 3 && store.messageR < 3
                            && store.messageL >= 0 && store.messageR >= 0){
                            FBR(true)
                            store.setMessageR(store.messageR + 1)
                            messageR(store.messageR)
                        }
                        else if(store.messageL === 3 && store.messageR < 3){
                            FBR(true)
                            store.setMessageR(store.messageR + 1)
                            messageR(store.messageR)
                        }

                        //reverce
                        else if (store.messageR === 3 && store.messageL === 0){
                            messageL(- 1)
                            FBL(false)
                            FBR(true)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                        else if (store.messageR === 3 && store.messageL === -1){
                            messageL(-2)
                            FBL(false)
                            FBR(true)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                        else if (store.messageR === 3 && store.messageL === -2){
                            messageL(-3)
                            FBL(false)
                            FBR(true)
                            console.log('--------------L ' + store.messageL)
                            console.log('--------------R ' + store.messageR)
                        }
                    }}
                >RIGHT</button>
            </div>
        </div>
    );
});

export default RulingButtonSmart;
