import {observer} from "mobx-react-lite";
import React from "react";
import './sr.css'
import {Col, Row} from "react-bootstrap";
import store from "./Store"
import {messageL} from "./Control/messageL";
import {messageR} from "./Control/messageR";
import useEventListener from '@use-it/event-listener'
import ConnectWebSocket from "./Socket/ConnectWebSocket";
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = observer(() => {

    // const [state, setState] = useState(0);
    // const inputEl = useRef(0);
    // const handler = (event) => {
    //     // changing the state to the name of the key
    //     // which is pressed
    //     // setState(event.key);
    //     // console.log(event.key);
    // };
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
        store.setMessageL(0)
        store.setMessageR(0)
        messageL(0)
        messageR(0)
    }

    function handlerUP({ key }) {

        if(String(key) === 'Shift') {
            // Stop()
            // store.setReversal(!store.reversal)
            // FBL(!store.messageFBL)
            // FBR(!store.messageFBR)
            // console.log('messageFBL ' + store.messageFBL)
            // console.log('messageFBR ' + store.messageFBR)
        }

        if(String(key) === ' ') {
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

        if(String(key) === ' ') {
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messagesStop',
                messageStop: false
            }))
        }

        if(String(key) === 'a' || String(key) === 'A' || String(key) === 'ф' || String(key) === 'Ф'){
            if((store.messageL === 3 && store.messageR === 3)
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

        }

        if(String(key) === 'd' || String(key) === 'D' || String(key) === 'в' || String(key) === 'В'){

            if(    (store.messageL === 3 && store.messageR === 3)
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
    useEventListener('keydown', handlerDOWN);
    useEventListener('keyup', handlerUP);

    // window.addEventListener('keydown', function(event) {
    // document.body.addEventListener('keypress', function(event) {
    //     console.log('CMD DOWN: ' + event.key);
    // });

    //ButtonSliderUpDown(movement.x, movement.y)

    const handleChangeMessageL = (value) => {
        //setState(value)
        store.setMessageL(Number(value))
        console.log('SliderUPDown ' + store.messageL)
        messageL(Number(value))
    }
    const handleChangeMessageR = (value) => {
        //setState(value)
        store.setMessageR(Number(value))
        console.log('SliderUPDown ' + store.messageR)
        messageR(Number(value))
    }

    return (
         // <div className="App Panel PanelButton">
            <div>
            {/*<Container>*/}
                <div>
                    <ConnectWebSocket/>
                </div>
                <div className="RSControl">
                    <Row>
                        {/*<Col className="col-sm-1">*/}

                        {/*    /!*<div>ON: "Enter" </div>*!/*/}
                        {/*    /!*<div>OFF: "Escape" </div>*!/*/}
                        {/*    /!*<div>Тормоз: "Space"</div>*!/*/}
                        {/*    /!*<div>Разворот или прямая: "Shift"</div>*!/*/}
                        {/*    /!*<div>Управление: "w  s  a  d"</div>*!/*/}
                        {/*</Col>*/}
                        <Col className="col-3">
                            <div style={{transform: 'rotate(-90deg)'}}>
                                <div>
                                    <input
                                        type="range"
                                        min={-speed}
                                        max={speed}
                                        value={store.messageR}
                                        className="form-range"
                                        onChange={(event) => {
                                            //localStorage.setItem('localSpeedStateUD', event.target.value)
                                            handleChangeMessageR(event.target.value)
                                        }}
                                        id="customRange1">
                                    </ input>
                                </div>
                            </div>
                        </Col>

                        <Col className="col-1">
                            <div>{ store.arduinoFBR !== null ?
                                store.arduinoFBR ? 'UP ' : 'DOWN '
                                :
                                '...'
                            }{store.messageR}{store.reversal ? ' reverse' : ''}</div>
                        </Col>
                        <Col className="col-4">
                            <div>
                                <div>{ store.arduinoOnOff !== null ?
                                    store.arduinoOnOff ? 'OFF ' : 'ON '
                                    :
                                    '...'}</div>
                            </div>
                        </Col>
                        <Col className="col-1">
                            <div>
                                { store.arduinoFBL !== null ?
                                    store.arduinoFBL ? 'UP ' : 'DOWN '
                                    :
                                    '...'
                                }{store.messageL} {store.reversal ? ' reverse' : ''}</div>

                            {/*<div className="Joy">*/}
                            {/*    <Demonstration/>*/}
                            {/*<input type="text" value="" onKeyPress={(e) => handler(e)} />*/}
                            {/*</div>*/}
                        </Col>
                        <Col className="col-3">
                            <div style={{transform: 'rotate(-90deg)'}}>
                                <div>
                                    <input
                                        type="range"
                                        min={-speed}
                                        max={speed}
                                        value={store.messageL}
                                        className="form-range"
                                        onChange={(event) => {
                                            //localStorage.setItem('localSpeedStateUD', event.target.value)
                                            handleChangeMessageL(event.target.value)
                                        }}
                                        id="customRange1">
                                    </ input>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            {/*</Container>*/}
        </div>
    );
});

export default Index;
