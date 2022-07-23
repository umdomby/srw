import {observer} from "mobx-react-lite";
import React from "react";
import '../sr.css'
import {Col, Row} from "react-bootstrap";
import store from "../Store"
import {messageL} from "../Control/messageL";
import {messageR} from "../Control/messageR";
import 'bootstrap/dist/css/bootstrap.min.css';

const RulingRange = observer(() => {

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

    const handleChangeMessageL = (value) => {
        if(value < 0){
            FBL(false)
        }else if (value > 0){
            FBL(true)
        }
        store.setMessageL(Number(value))
        console.log('SliderUPDown ' + store.messageL)
        messageL(Number(value))
    }
    const handleChangeMessageR = (value) => {
        if(value < 0){
            FBR(false)
        }else if (value > 0){
            FBR(true)
        }
        store.setMessageR(Number(value))
        console.log('SliderUPDown ' + store.messageR)
        messageR(Number(value))
    }

    return (
        <div>
            <div className="RSControl">
                <Row>
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
                                        handleChangeMessageL(event.target.value)
                                    }}
                                    id="customRange1">
                                </ input>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
});

export default RulingRange;
