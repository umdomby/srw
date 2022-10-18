import React, {useEffect, useState} from 'react'
//import shortId from 'shortid'


const goToRoom = (history, roomId) => {
  history.push(`/r/${roomId}`)
}
const goToRoomVR = (history, roomId) => {
    history.push(`/vr/${roomId}`)
}
const goToRoomNoMic = (history, roomId) => {
    history.push(`/mr/${roomId}`)
}

export function goToRoomInput({history}) {
    //let [roomId, setRoomId] = useState(shortId.generate());
    let [roomId, setRoomId] = useState((localStorage.getItem('localIdRoom') || ''));

    useEffect(()=>{
        if( localStorage.getItem('localIdRoom') === null || localStorage.getItem('localIdRoom') === undefined) {
            //localStorage.setItem('localIdSocket', pass_gen())
            localStorage.setItem('localIdRoom', '')
        }
        setRoomId(localStorage.getItem('localIdRoom') || '')
    },[roomId])

  return (
      <div className="enter-room-container-my">
              <input
                    style={{width:'90px'}}
                    type="text"
                    value={roomId} placeholder="Room id"
                    onChange={(event) => {
                        localStorage.setItem('localIdRoom', event.target.value)
                        setRoomId(event.target.value)
                    }}
              />
            <button onClick={() => {
            goToRoom(history, roomId)
            }}>Enter</button>
            <button onClick={() => {
                goToRoomVR(history, roomId)
            }}>VR</button>
            <button onClick={() => {
                goToRoomNoMic(history, roomId)
            }}>No Mic</button>

      </div>)
}
