import {observer} from "mobx-react-lite";
import React from "react";
import store from '../Store'
import {Col, Row} from "react-bootstrap";

const InfoRuling = observer(() => {


    return (
        <Row>
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
        </Row>
    );
});

export default InfoRuling;
