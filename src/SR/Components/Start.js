import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";

const Start = observer(() => {

    return(
        <div className='Page'>
            <Image src={require('../Start/nodemcu.png')} style={{ width: '50%'}}/>
        </div>
    )

})

export default Start
