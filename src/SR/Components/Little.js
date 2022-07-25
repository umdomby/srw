import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";

const Little = observer(() => {

    return(

        <div className='Page'>
            <div>
                Scheme
            </div>
            <Image src={require('../Little/little.png')} style={{ width: '100%'}}/>
            <Row>
                <Col>
                </Col>
                <Col>

                </Col>
            </Row>
        </div>
    )

})

export default Little
