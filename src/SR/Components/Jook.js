import {observer} from "mobx-react-lite";
import React, {useRef, useState} from "react";
import Modal from 'react-modal'

export const Jook = observer(() => {

    const [showModal, setShowModal] = useState(false)

    const customStyles = {
        // content : {
        //     ...
        // },
        overlay: {
            zIndex: 999999999,
            backgroundColor: 'transparent'
        }
    };

    return(
        <div className='jook-container'>
            <button onClick={()=>{
                // delMusicRef.current = mongoMusic._id
                setShowModal(true)
            }}>jook</button>

            <Modal
                className="modal-jook"
                style={customStyles}
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={()=>setShowModal(false)}
            >

            <button onClick={()=>setShowModal(false)} style={{marginLeft: '5px'}}>Закрыть</button>

            </Modal>
        </div>
    )
})