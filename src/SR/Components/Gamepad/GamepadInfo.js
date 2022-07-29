import React from "react";

function GamepadInfo({ buttons, axes }) {
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

  return (
    <div style={{ fontFamily: "monospace", color:'white', paddingTop:'100px' ,width:'30%', margin: '0 auto'}}>
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
      <p>LT: {lt && lt.pressed && `pressed, value: ${lt.value}`}</p>
      <p>RT: {rt && rt.pressed && `pressed, value: ${rt.value}`}</p>
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
