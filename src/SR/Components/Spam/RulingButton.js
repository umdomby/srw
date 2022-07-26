import {observer} from "mobx-react-lite";
import React from "react";
import '../sr.css'
import store from "../Store"
import {messageL} from "../Control/messageL";
import {messageR} from "../Control/messageR";
import useEventListener from '@use-it/event-listener'
import 'bootstrap/dist/css/bootstrap.min.css';

const RulingButton = observer(() => {

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

    function handlerUP({ key }) {
        // if(String(key) === 'Shift') {
        //     // Stop()
        //     // store.setReversal(!store.reversal)
        //     // FBL(!store.messageFBL)
        //     // FBR(!store.messageFBR)
        //     // console.log('messageFBL ' + store.messageFBL)
        //     // console.log('messageFBR ' + store.messageFBR)
        // }

        if(String(key) === 'Shift') {
            Stop()
            console.log('Space UP')
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesStop',
                messageStop: true
            }))
        }

        if(String(key) === 'Escape') {
            Stop()
            store.setMessageOnOff(true)
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesOnOff',
                messageOnOff: store.messageOnOff
            }))
            console.log('messageOnOff ' + store.messageOnOff)
        }

        if(String(key) === 'Enter') {
            Stop()
            store.setMessageOnOff(false)
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesOnOff',
                messageOnOff: store.messageOnOff
            }))
            console.log('messageOnOff ' + store.messageOnOff)
        }
    }

    function handlerDOWN({ key }) {
        console.log(String(key));

        if(String(key) === 'a' || String(key) === 'A' || String(key) === 'ф' || String(key) === 'Ф'){
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
            }
            else if (   store.messageL < 3 && store.messageR < 3
                && store.messageL >= 0 && store.messageR >= 0) {
                FBL(true)
                store.setMessageL(store.messageL + 1)
                messageL(store.messageL)
            }
            else if(store.messageR === 3 && store.messageL < 3){
                FBL(true)
                store.setMessageL(store.messageL + 1)
                messageL(store.messageL)
            }
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
        }

        if(String(key) === 'd' || String(key) === 'D' || String(key) === 'в' || String(key) === 'В'){
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
        }

        if(String(key) === 'w' || String(key) === 'W' || String(key) === 'ц' || String(key) === 'Ц') {
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
        }

        if(String(key) === 's' || String(key) === 'S' || String(key) === 'ы' || String(key) === 'Ы'){
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
        }

        if(String(key) === 'q' || String(key) === 'Q' || String(key) === 'й' || String(key) === 'Й') {
            if (store.messageL > -speed) {
                store.setMessageR(store.messageR + 1)
                messageR(store.messageR)
                store.setMessageL(store.messageL - 1)
                messageL(store.messageL)
            }
            if (store.messageL < 0 && store.messageR > 0) {
                FBL(true)
                FBR(false)
            }
        }

        if(String(key) === 'e' || String(key) === 'E' || String(key) === 'у' || String(key) === 'У') {
            if (store.messageR > -speed) {
                store.setMessageR(store.messageR - 1)
                messageR(store.messageR)
                store.setMessageL(store.messageL + 1)
                messageL(store.messageL)
            }
            if(store.messageL > 0 && store.messageR < 0) {
                FBL(false)
                FBR(true)
            }
        }
    }
    //keypress
    useEventListener('keydown', handlerDOWN);
    useEventListener('keyup', handlerUP);

    return (
        <div>
            {/*<div className="RulingInfo">*/}
            {/*    W S A D {' '}  {'<--'} Q  R{'-->'}*/}
            {/*</div>*/}
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

export default RulingButton;
