import React, {useRef} from "react";
import store from "../../Store"
import {messageL} from "../../Control/messageL";
import {messageR} from "../../Control/messageR";

function GamepadInfo({ buttons, axes }) {

  const refLT = useRef(false);
  const refRT = useRef(false);
  const refLB = useRef(true);
  const refA = useRef(true);
  const refX = useRef(true);
  const refB = useRef(true);
  const refY = useRef(true);
  const refRB = useRef(true);
  const refSpeed = useRef(50);
  const refInterval = useRef(2000);
  const refRTLTNull = useRef(true);
  const refRjVert = useRef(0);
  const refLjHoriz = useRef(0);
  const refTimeout = useRef(1000);
  const refBoolLL = useRef(false);
  const refBoolRR = useRef(false);
  const refTimeoutBool2 = useRef(true);


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

  //const refLjVert = useRef(axes[1]);
  //refLjVert.current = ljVert
  //console.log("6666 " + ljVert)
  //console.log("7777 " + refLjVert.current)


  if(ljHoriz > 0.11 || ljHoriz < -0.11) {
    refBoolLL.current = true
    const map = (x, in_min, in_max,out_min, out_max)=> {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    //refRjVert.current = map(rjVert, 0, 1, 50, 100);
    refLjHoriz.current = map(ljHoriz, 0, 1, 90, 180);
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBLL',
      messageLL: Math.round(refLjHoriz.current),
      //messageRR: Math.round(refRjVert.current)
    }))
    //console.log('refRjHoriz.current ' + refRjVert.current)
    console.log('refRjVert.current ' + refLjHoriz.current )
  }else if(refBoolLL.current === true){
    refBoolLL.current = false
    //refRjVert.current = 40
    refLjHoriz.current = 90
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBLL',
      messageLL: 90,
      //messageRR: 40
    }))
  }


  if(rjVert > 0.11 || rjVert < -0.11) {
    refBoolRR.current = true
    const map = (x, in_min, in_max,out_min, out_max)=> {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    refRjVert.current = map(rjVert, 0, 1, 50, 100);
    //refLjHoriz.current = map(ljHoriz, 0, 1, 90, 180);
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBRR',
      //messageLL: Math.round(refLjHoriz.current),
      messageRR: Math.round(refRjVert.current)
    }))
    console.log('refRjHoriz.current ' + refRjVert.current)
    //console.log('refRjVert.current ' + refLjHoriz.current )
  }else if(refBoolRR.current === true){
    refBoolRR.current = false
    refRjVert.current = 40
    //refLjHoriz.current = 90
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBRR',
      //messageLL: 90,
      messageRR: 40
    }))
  }

  if(ls.pressed === true){
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBLLRR',
      messageLL: 90,
      messageRR: 20
    }))
  }

  if(rs.pressed === true){
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBLLRR',
      messageLL: 90,
      messageRR: 30
    }))
  }

  if(lt.pressed === true){refLT.current = true}
  if(rt.pressed === true){refRT.current = true}
  if(refLT.current === true || refRT.current === true) {
    console.log(rt.value)
    console.log(lt.value)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesLTRT',
      messageL: rt.value * refSpeed.current,
      messageR: lt.value * refSpeed.current,
    }))
  }

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


  // if(b.pressed === true){
  //   messageL(0)
  //   messageR(0)
  // }

  if(dUp.pressed === true) {
    store.setMessageFBL(true)
    store.setMessageFBR(true)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: true,
      messageFBR: true
    }))
  }

  if(dDown.pressed === true) {
    store.setMessageFBL(false)
    store.setMessageFBR(false)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: false,
      messageFBR: false
    }))
  }

  if(dLeft.pressed === true) {
    store.setMessageFBL(true)
    store.setMessageFBR(false)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: false,
      messageFBR: true
    }))
  }

  if(dRight.pressed === true) {
    store.setMessageFBL(false)
    store.setMessageFBR(true)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: true,
      messageFBR: false
    }))
  }

  if(lb.pressed === true && refLB.current === true) {
    refLB.current = false
    if(refSpeed.current === 255) {
      refSpeed.current = refSpeed.current - 55
    }else if(refSpeed.current > 51){
      refSpeed.current = refSpeed.current - 50
    }
    console.log(refSpeed.current)
  }
  if(lb.pressed === false){
    refLB.current = true
  }

  if(a.pressed === true && refA.current === true) {
    refA.current = false
    //refRjVert.current = 30
    if(refRjVert.current > 4){
      refRjVert.current = refRjVert.current - 5
    }
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBRR',
      messageRR: refRjVert.current
    }))
  }
  if(a.pressed === false){
    refA.current = true
  }

  if(x.pressed === true && refX.current === true) {
    refX.current = false
    if(refLjHoriz.current < 176) {
      refLjHoriz.current = refLjHoriz.current + 5
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messageFBLL',
        messageLL: refLjHoriz.current
      }))
    }
  }

  if(x.pressed === false){
    refX.current = true
  }



  if(b.pressed === true && refB.current === true) {
    refB.current = false
    if(refLjHoriz.current > 4) {
      refLjHoriz.current = refLjHoriz.current - 5
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messageFBLL',
        messageLL: refLjHoriz.current
      }))
    }
  }
  if(b.pressed === false){
    refB.current = true
  }

  if(y.pressed === true && refY.current === true) {
    refY.current = false
    if(refRjVert.current < 96) {
      refRjVert.current = refRjVert.current + 5
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messageFBRR',
        messageRR: refRjVert.current
      }))
    }
  }

  if(y.pressed === false){
    refY.current = true
  }



  if(rb.pressed === true && refRB.current === true) {
    refRB.current = false
    if(refSpeed.current < 151) {
      refSpeed.current = refSpeed.current + 50
    } else if(refSpeed.current === 200){
      refSpeed.current = refSpeed.current + 55
    }
    console.log(refSpeed.current)
  }

  if(rb.pressed === false){
    refRB.current = true
  }

  if(menu.pressed === true) {
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesOnOff',
      messageOnOff: true
    }))
  }
  if(pause.pressed === true) {
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesOnOff',
      messageOnOff: false
    }))
  }


  return (
    <div style={{color:'white'}}>
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
