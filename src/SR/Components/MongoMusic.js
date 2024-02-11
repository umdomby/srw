import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
import Modal from 'react-modal'

export const MongoMusic = observer(() => {

    const [pll, setPll] = useState([])
    const [musicLink, setMusicLink] = useState('');
    const [musicPl, setMusicPl] = useState('');
    const [musicName, setMusicName] = useState('');

    const sendMusicMongo = (link) => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioURL',
            message: link,
            meSend: store.meSend
        }))
    }

    const sendMusicMongoDel = (_id) => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoMusicDel',
            message: _id,
        }))
    }

    const sendMusicMongoPl = (pl) => {
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoMusicPl',
            message: pl
        }))
    }

    useEffect(() => {
        setTimeout(() => {
            if (store.mongoMusic) {
                setPll(store.mongoMusic.filter((v, i, a) => a.findIndex(v2 => (v2.pl === v.pl)) === i))
            }
        }, 1000)
    }, [])

    useEffect(() => {
        store.setMongoMusic(store.mongoMusic)
    }, [store.mongoMusic])

    const [showModal, setShowModal] = useState(false)
    const [showModalDel, setShowModalDel] = useState(false)
    const delMusicRef = useRef()

    const customStyles = {
        overlay: {
            zIndex: 99999,
            backgroundColor: 'transparent'
        }
    };

    const customStyles2 = {
        overlay: {
            zIndex: 99999,
            backgroundColor: 'transparent'
        }
    };

    return (

        <div className="music-container">
            <button onClick={() => {
                // delMusicRef.current = mongoMusic._id
                setShowModal(true)
            }}>Music
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
                        {pll.map((mongoMusic, index) =>
                            <div
                                style={{color: 'red', width: '250px', display: 'inline', fontSize: '10px'}}
                                key={index}
                            >
                                <button onClick={() => sendMusicMongoPl(mongoMusic.pl)}>{mongoMusic.pl}</button>
                            </div>
                        )}
                    </div>
                    {store.mongoMusic.map((mongoMusic, index) =>
                        <div
                            style={{color: 'red', width: '250px', fontSize: '10px', display: 'inline-block'}}
                            key={index}
                        >
                            <button
                                onClick={() => sendMusicMongo(mongoMusic.link)}>{mongoMusic.name}, {mongoMusic.pl} </button>
                            <button onClick={() => {
                                delMusicRef.current = mongoMusic._id
                                setShowModalDel(true)
                            }}>Dell
                            </button>
                        </div>
                    )}
                    <div>
                        <div>
                            <input
                                type='text'
                                value={musicLink}
                                style={{width: '140px'}}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMusicLink(e.target.value)
                                }}
                            /> link music
                        </div>
                        <div>
                            <input
                                type='text'
                                value={musicName}
                                style={{width: '140px'}}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMusicName(e.target.value)
                                }}
                            /> name
                        </div>
                        <div>
                            <input
                                type='text'
                                value={musicPl}
                                style={{width: '140px'}}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMusicPl(e.target.value)
                                }}
                            /> pl
                        </div>
                        <div>
                            <button
                                style={{width: '140px'}}
                                onClick={() => {
                                    if (musicLink !== '' && musicName !== '' && musicPl !== '') {
                                        store.webSocket.send(JSON.stringify({
                                            id: store.idSocket,
                                            method: 'mongoMusic',
                                            link: musicLink,
                                            name: musicName,
                                            pl: musicPl
                                        }))
                                        setMusicLink('')
                                        setMusicName('')
                                        setMusicPl('')
                                    }
                                }}
                            >Send
                            </button>
                        </div>
                        <button onClick={() => setShowModal(false)} style={{marginLeft: '5px'}}>Закрыть</button>
                    </div>
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
                        sendMusicMongoDel(delMusicRef.current)
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