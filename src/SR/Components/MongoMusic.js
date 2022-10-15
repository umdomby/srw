import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "../Store";
import Modal from 'react-modal'

export const MongoMusic = observer(() => {

    const [pll, setPll] = useState([])

    const sendMusicMongo = (link) => {
        //console.log(link)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'audioURL',
            message: link,
            meSend: store.meSend
        }))
    }

    const sendMusicMongoDel = (_id) => {
        //console.log(_id)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoMusicDel',
            message: _id,
            //meSend: store.meSend
        }))
    }

    const sendMusicMongoPl = (pl) => {
        //console.log(link)
        store.webSocket.send(JSON.stringify({
            id: store.idSocket,
            method: 'mongoMusicPl',
            message: pl
        }))
    }
    useEffect(()=> {
        setTimeout(()=> {
            if(store.mongoMusic) {
                setPll(store.mongoMusic.filter((v,i,a)=>a.findIndex(v2=>(v2.pl===v.pl))===i))
            }
        }, 1000)
    }, [])

    const [showModal, setShowModal] = useState(false)
    const delMusicRef = useRef()

    return(

        <div className="music-container">
            <div>
            {/*<button onClick={()=>setShowModal(true)}>Modal</button>*/}
            <Modal
                className="modal-my"
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={()=>setShowModal(false)}
            >
                <button onClick={()=> {
                    sendMusicMongoDel(delMusicRef.current)
                    setShowModal(false)
                }
                }>Да</button>
                <button onClick={()=>setShowModal(false)} style={{marginLeft: '5px'}}>Нет</button>
                <span style={{marginLeft: '15px'}}>Удалить?</span>
            </Modal>
            </div>
            <div>
                {/*{console.log(store.mongoMusic)}*/}
                {pll.map((mongoMusic, index) =>
                    <div
                        style={{color:'red', width:'250px', display: 'inline', fontSize:'10px'}}
                        key={index}
                    >
                        <button onClick={()=>sendMusicMongoPl(mongoMusic.pl)}>{mongoMusic.pl}</button>
                    </div>
                )}
                {store.mongoMusic.map((mongoMusic, index) =>
                <div
                    style={{color:'red', width:'250px', fontSize:'10px'}}
                    key={index}
                >
                    <button onClick={()=>sendMusicMongo(mongoMusic.link)}>{mongoMusic.name}, {mongoMusic.pl} </button>
                    <button onClick={()=>{
                        delMusicRef.current = mongoMusic._id
                        setShowModal(true)
                    }}>Dell</button>
                </div>
                )}
            </div>
        </div>
    )

})