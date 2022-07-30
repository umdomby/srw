import React, {useRef} from "react";
import store from "../../Store"
import {messageL} from "../../Control/messageL";
import {messageR} from "../../Control/messageR";

function GamepadInfo({ buttons, axes }) {

  const refLT = useRef(false);
  const refRT = useRef(false);

  const {
    x,
    y,
    a,
    b,
    dUp,
    dDown,
    dLeft,
    dRight,
    lb,
    rb,
    ls,
    rs,
    lt,
    rt,
    menu,
    pwr,
    pause,
  } = buttons;
  const ljHoriz = axes[0];
  const ljVert = axes[1];
  const rjHoriz = axes[2];
  const rjVert = axes[3];


  if(lt.pressed === false && refLT.current === true){
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesLTRT',
      messageLT: 0,
      messageRT: rt.value,
    }))
    refLT.current = false
  }

  if(rt.pressed === false && refRT.current === true){
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesLTRT',
      messageLT: lt.value,
      messageRT: 0,
    }))
    refRT.current = false
  }

  if(lt.pressed === true || rt.pressed === true) {
    if (store.messageFBL === true && store.messageFBL === true) {
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesLTRT',
        messageLT: lt.value,
        messageRT: rt.value,
      }))
    }
    if (store.messageFBL === false && store.messageFBL === false) {
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesLTRT',
        messageLT: rt.value,
        messageRT: lt.value,
      }))
    }
  }
  if(lt.pressed === true){
    refLT.current = true
  }

  if(rt.pressed === true){
    refRT.current = true
  }


  if(b.pressed === true){
    messageL(0)
    messageR(0)
  }

  if(dUp.pressed === true) {
    store.setMessageFBL(true)
    store.setMessageFBR(true)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBL',
      messageFBL: true
    }))
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBR',
      messageFBR: true
    }))
  }

  if(dDown.pressed === true) {
    store.setMessageFBL(false)
    store.setMessageFBR(false)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBL',
      messageFBL: false
    }))
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBR',
      messageFBR: false
    }))
  }

  if(dLeft.pressed === true) {
    store.setMessageFBL(true)
    store.setMessageFBR(false)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBL',
      messageFBL: true
    }))
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBR',
      messageFBR: false
    }))
  }

  if(dRight.pressed === true) {
    store.setMessageFBL(false)
    store.setMessageFBR(true)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBL',
      messageFBL: false
    }))
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBR',
      messageFBR: true
    }))
  }


  return (
    <div>
      {/*<div style={{ fontFamily: "monospace", color:'white', paddingTop:'100px' ,width:'30%', margin: '0 auto'}}>*/}
      {/*<p>X: {x && x.pressed && `pressed`}</p>*/}
      {/*<p>Y: {y && y.pressed && `pressed`}</p>*/}
      {/*<p>A: {a && a.pressed && `pressed`}</p>*/}
      {/*<p>B: {b && b.pressed && `pressed`}</p>*/}
      {/*<p>DPad Up: {dUp && dUp.pressed && `pressed`}</p>*/}
      {/*<p>DPad Down: {dDown && dDown.pressed && `pressed`}</p>*/}
      {/*<p>DPad Left: {dLeft && dLeft.pressed && `pressed`}</p>*/}
      {/*<p>DPad Right: {dRight && dRight.pressed && `pressed`}</p>*/}
      {/*<p>LB: {lb && lb.pressed && `pressed`}</p>*/}
      {/*<p>RB: {rb && rb.pressed && `pressed`}</p>*/}
      {/*<p>LS: {ls && ls.pressed && `pressed`}</p>*/}
      {/*<p>RS: {rs && rs.pressed && `pressed`}</p>*/}
      {/*<p>LT: {lt && lt.pressed && `pressed, value: ${lt.value}`}</p>*/}
      {/*<p>RT: {rt && rt.pressed && `pressed, value: ${rt.value}`}</p>*/}
      {/*<p>menu: {menu && menu.pressed && `pressed`}</p>*/}
      {/*<p>pause: {pause && pause.pressed && `pressed`}</p>*/}
      {/*<p>pwr: {pwr && pwr.pressed && `pressed`}</p>*/}
      {/*<p>LJ horiz: {ljHoriz}</p>*/}
      {/*<p>LJ vert: {ljVert}</p>*/}
      {/*<p>RJ horiz: {rjHoriz}</p>*/}
      {/*<p>RJ vert: {rjVert}</p>*/}
    </div>
  );
}

export default GamepadInfo;
