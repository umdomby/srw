import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Start = observer(() => {

    return(
        <div className='Page'>
            <Row style={{margin:'0', paddingTop:'70px'}}>
                <Col style={{ width: '40%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <Image style={{ width: '30%', float:'right'}} src={require('../Start/firmware.png')}/>
                </Col>
                <Col style={{ width: '60%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <Link to="../Little/firmware.bin" target="_blank" download>Download firmware .bin</Link><br/>
                    <Link to="../Little/firmware.zip" target="_blank" download>Download firmware .zip</Link><br/>
                </Col>
            </Row>
            <Row style={{margin:'0', marginTop:'3%'}}>
                <Col style={{ width: '40%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <Image style={{ width: '30%', float:'right'}} src={require('../Start/nodemcu.png')}/>
                </Col>
                <Col style={{ width: '60%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    #INSTRUCTION FIRMWARE LINUX<br />
                    <br />
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
                </Col>
            </Row>
            <Row style={{margin:'0', marginTop:'3%'}}>
                <Col style={{ width: '40%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <div style={{marginTop:'3%'}}>
                        <Image style={{ width: '30%', float:'right'}} src={require('../Start/firmware_programmer.png')}/>
                    </div>
                </Col>
                <Col style={{ width: '60%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    #INSTRUCTION FIRMWARE WINDOWS<br/>
                    <br />
                    Nodemcu firmware programmer<br/>
                    https://ciaobit.com/mcu/esp8266/come-installare-il-firmware-nodemcu-esp8266-con-windows/ <br/>
                    <br/>
                    Now connect your ESP device to the computer after enabling flash mode<br/>
                    The COM port number will be displayed in the log tab<br/>
                    Go to "Config" tab and select the file you had created using cloud service,The address should be 0x00000<br/>
                    Go to Operation tab and click on Flash button.The MAC address and COM port will be automatically filled and the progress bar starts moving<br/>
                    If you check the log tab now it'll show you the status of flashing each block<br/>
                    Once the flash is successfully completed you will get a green tick on bottom left corner<br/>
                    <br/>
                </Col>
            </Row>
        </div>
    )

})

export default Start
