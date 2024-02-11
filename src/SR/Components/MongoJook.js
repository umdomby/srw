import {observer} from "mobx-react-lite";
import React, {useState, useEffect, useRef} from "react";
import Modal from 'react-modal'
import store from "../Store";

export const MongoJook = observer(() => {

    const [showModal, setShowModal] = useState(false)

    const [pll, setPll] = useState([])
    const [txtJook, setTxtJook] = useState('');
    const [jookPl, setJookPl] = useState('');
    const [jookName,setJookName] = useState('');

    const [showModalDel, setShowModalDel] = useState(false)
    const delJookIdRef = useRef()


    useEffect(() => {
        setTimeout(() => {
            if (store.mongoJook) {
                setPll(store.mongoJook.filter((v, i, a) => a.findIndex(v2 => (v2.pl === v.pl)) === i))
            }
        }, 1000)
    }, [])

    useEffect(() => {
        store.setMongoJook(store.mongoJook)
    }, [store.mongoJook])

    const sendJookMongoDel = (_id) => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoJookDel',
            message: _id,
        }))
    }

    const sendJookMongoPl = (pl) => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoJookPl',
            message: pl
        }))
    }

    const customStyles = {
        overlay: {
            zIndex: 999999,
            backgroundColor: 'transparent'
        }
    };
    const customStyles2 = {
        overlay: {
            zIndex: 999999999,
            backgroundColor: 'transparent'
        }
    };

    // const valueTxtRef = useRef();
    // const sendJookMongo = (jook) => {
    //     store.webSocket.send(JSON.stringify({
    //         id: store.idSocket,
    //         method: 'jookTxt',
    //         message: jook,
    //         meSend: store.meSend
    //     }))
    // }

    const sendJookMongo = (jook) => {
        //e.preventDefault()
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'textSpeak',
            text: jook,
            meSend: store.meSend
        }))
    }

    return (
        <div className='jook-container'>
            <button onClick={() => {
                // delJookIdRef.current = mongoJook._id
                setShowModal(true)
            }}>jook
            </button>

            <Modal
                className="modal-jook"
                style={customStyles}
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <div>
                    <div>
                        {pll.map((mongoJook, index) =>
                            <div
                                style={{color: 'red', width: '250px', display: 'inline', fontSize: '10px'}}
                                key={index}
                            >
                                <button onClick={() => sendJookMongoPl(mongoJook.pl)}>{mongoJook.pl}</button>
                            </div>
                        )}
                    </div>
                    {store.mongoJook.map((mongoJook, index) =>
                        <div
                            style={{color: 'red', width: '220px', fontSize: '10px', display: 'inline-block'}}
                            key={index}
                        >
                            <button onClick={() => sendJookMongo(mongoJook.txtJook)}>{mongoJook.name}, {mongoJook.pl} </button>
                            <button onClick={() => {
                                    delJookIdRef.current = mongoJook._id
                                    setShowModalDel(true)
                                }}>Dell
                            </button>
                        </div>
                    )}


                    <div>
                        <input
                            type='text'
                            value={txtJook}
                            style={{width: '140px'}}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setTxtJook(e.target.value)
                            }}
                        /> jook
                    </div>
                    <div>
                        <input
                            type='text'
                            value={jookName}
                            style={{width: '140px'}}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               setJookName(e.target.value)
                            }}
                        /> name
                    </div>
                    <div>
                        <input
                            type='text'
                            value={jookPl}
                            style={{width: '140px'}}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setJookPl(e.target.value)
                            }}
                        /> pl
                    </div>
                    <div>
                        <button
                            style={{width: '140px'}}
                            onClick={() => {
                                if (txtJook !== '' && jookName !== '' && jookPl !== '') {
                                    store.webSocket.send(JSON.stringify({
                                        id: store.idSocket,
                                        method: 'mongoJook',
                                        txtJook: txtJook,
                                        name: jookName,
                                        pl: jookPl
                                    }))
                                    setTxtJook('')
                                    setJookName('')
                                    setJookPl('')
                                }
                            }}
                        >Send
                        </button>
                    </div>
                    <button onClick={() => setShowModal(false)} style={{marginLeft: '5px'}}>Закрыть</button>
                </div>
            </Modal>

            <div>
                <Modal
                    className="modal-mongo-music"
                    style={customStyles2}
                    ariaHideApp={false}
                    isOpen={showModalDel}
                    onRequestClose={() => setShowModalDel(false)}
                >
                    <button onClick={() => {
                        sendJookMongoDel(delJookIdRef.current)
                        setShowModalDel(false)
                    }
                    }>Да
                    </button>
                    <button onClick={() => setShowModalDel(false)} style={{marginLeft: '5px'}}>Нет</button>
                    <span style={{marginLeft: '15px'}}>Удалить?</span>
                </Modal>
            </div>
        </div>
)

})