import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";

const Little = observer(() => {

    return(
        <div className='Page'>
            <Image src={require('../Little/little.png')} style={{ width: '50%', marginLeft:'25%', marginTop:'100px'}}/>
            <br/>
            <Image src={require('../Little/nodemcu.png')} style={{ width: '50%', marginLeft:'25%', marginTop:'100px'}}/>
            <br/>
            <Image src={require('../Little/L298N.png')} style={{ width: '50%', marginLeft:'25%', marginTop:'100px'}}/>
            <br/>
            <br/>
        </div>
    )

})

export default Little
