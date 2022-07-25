import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";

const Start = observer(() => {

    return(
        <div className='Page'>
            <Image src={require('../Start/nodemcu.png')} style={{ width: '19%', margin:'1%', marginLeft:'15%'}}/>
            <div style={{float:'right', width: '60%', margin:'1%'}}>
                #INSTRUCTION FIRMWARE<br />
                https://nodemcu.readthedocs.io/en/release/flash/ <br />
                <br />
                #SEARCH PORT NODEMCUv3<br />
                'sudo dmesg | grep tty' <br />
                OR <br />
                'sudo ls -l /dev/ttyUSB* && ls -l /dev/ttyS*' <br />
                <br />
                'sudo apt install python3-pip' <br />
                'sudo pip install pyserial' <br />
                'sudo pip install esptool' <br />
                'sudo esptool.py --port /dev/ttyUSB1 write_flash -fm dio 0x00000 firmware.bin' <br />
                <br />
                ttyUSB"0-1-2-3..." your port<br />
            </div>
            {/*<Row>*/}
            {/*    <Col style={{width:'29%', marginLeft:'1%'}}>*/}
            {/*        */}
            {/*    </Col>*/}
            {/*    <Col style={{width:'65%', marginRight:'5%'}}>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

        </div>
    )

})

export default Start
