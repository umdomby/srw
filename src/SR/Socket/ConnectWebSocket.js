import {observer} from "mobx-react-lite";
import React, {useEffect, useRef, useState} from "react";
import WebSocketProject from "./WebSocketProject";
import store from "../Store"
import shortId from "shortid";

const ConnectWebSocket = observer(() => {
    const persId = useRef(shortId.generate())
    const [idSocket, setIdSocket] = useState(localStorage.getItem('localIdSocket') || '')
    setInterval(() => socketTest(), 5000)

    useEffect(()=>{
        if( localStorage.getItem('localIdSocket') === null || localStorage.getItem('localIdSocket') === undefined) {
            //localStorage.setItem('localIdSocket', pass_gen())
            localStorage.setItem('localIdSocket', '')
        }
        setIdSocket(localStorage.getItem('localIdSocket') || '')
        store.setIdSocket(idSocket)
        connectID(idSocket)

    },[idSocket])

    const connectID = (idSocket) => {
        WebSocketProject(idSocket, persId.current)
        //console.log('persId ' + persId.current)
    }

    const socketTest = () => {
        if (store.webSocket.readyState === store.webSocket.CLOSED || store.webSocket.readyState === store.webSocket.CLOSING) {
            connectID(idSocket)
            console.log('WebSocket reconnected ' + idSocket)
        } else {
            //console.log('WebSocket connected')
        }
    }

    setInterval(() => connectByte(), 1000)
    const connectByte = () => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'messages',
            connectByte: true
        }))
    }

    return (
        <div className="socketAdd">
                <input
                       type='text'
                       disabled={false}
                       style={{backgroundColor: '#D3D3D3', textAlign: 'center', borderWidth: 1, fontSize: 10, width:'15em', height:'1.1em'}}
                       value={idSocket}
                       onChange={(event) => {
                           localStorage.setItem('localIdSocket', event.target.value)
                           setIdSocket(event.target.value)
                           store.setIdSocket(event.target.value)
                       }}
                />
            {/*<div>*/}
            {/*    <button onClick={connectID}>Connect</button>*/}
            {/*</div>*/}
        </div>
    );
});

export default ConnectWebSocket;

