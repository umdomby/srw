import {observer} from "mobx-react-lite";
import React, {useEffect, useRef, useState} from "react";
import WebSocketProject from "./WebSocketProject";
import store from "../Store"
import shortId from "shortid";

const ConnectWebSocket = observer(() => {
    const persId = useRef(shortId.generate())
    const [idSocket, setIdSocket] = useState('')
    const [displayMessage, setDisplayMessage] = useState(localStorage.getItem('localIdSocket') || '');
    setInterval(() => socketTest(), 5000)
    const [hidden, setHidden] = useState(false)

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

    setInterval(() => connectByte(), 900)
    const connectByte = () => {
        try {
            store.webSocket.send(JSON.stringify({
                id: store.idSocket,
                method: 'messages',
                connectByte: true
            }))
        }catch (e) {
            console.log('err send connectByte')
        }

    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIdSocket(displayMessage)
            localStorage.setItem('localIdSocket', displayMessage)
            setIdSocket(displayMessage)
            store.setIdSocket(displayMessage)
        }, 1500);
        return () => clearTimeout(timeOutId);
    }, [displayMessage]);

    return (
        <div className="socketAdd">
            {hidden &&
                <input
                       type='text'
                       disabled={false}
                       style={{backgroundColor: '#D3D3D3', textAlign: 'center', borderWidth: 1, fontSize: 12, width:'15em', height:'1.5em'}}
                       value={displayMessage}
                       onChange={event => setDisplayMessage(event.target.value)}
                       // onChange={(event) => {
                       //     localStorage.setItem('localIdSocket', event.target.value)
                       //     setIdSocket(event.target.value)
                       //     store.setIdSocket(event.target.value)
                       // }}
                />}
            <button style={{backgroundColor: '#D3D3D3', textAlign: 'center', borderWidth: 1, fontSize: 11, width:'6em', height:'2em'}}
                onClick={()=>setHidden(!hidden)}
            >
                Connect
            </button>
            {/*<div>*/}
            {/*    <button onClick={connectID}>Connect</button>*/}
            {/*</div>*/}
        </div>
    );
});

export default ConnectWebSocket;

