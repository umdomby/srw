import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";

const Little = observer(() => {

    return(
        <div className='Page'>
            <Image src={require('../Little/little.png')} style={{ width: '70%', marginLeft:'15%', marginTop:'100px'}}/>
            <br/>
            <br/>
            <br/>
        </div>
    )

})

export default Little
