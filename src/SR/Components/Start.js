import {observer} from "mobx-react-lite";
import React from "react";
import {Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import firmware_1234567 from '../Start/firmware_1234567.bin';
import firmware_2345678 from '../Start/firmware_2345678.bin';
import firmware_3456789 from '../Start/firmware_3456789.bin';
import firmware_4567890 from '../Start/firmware_4567890.bin';
import NFP from '../Start/NFP.zip';


const Start = observer(() => {

    return(
        <div className='Page'>
            <Row style={{margin:'0', paddingTop:'70px'}}>
                <Col style={{ width: '40%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <Image style={{ width: '30%', float:'right'}} src={require('../Start/firmware.png')}/>
                </Col>
                <Col style={{ width: '60%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <Link to={firmware_1234567}  target="_blank" download="firmware_1234567.bin">Download firmware bin id: 1234567</Link><br/>
                    <Link to={firmware_2345678} target="_blank" download="firmware_2345678.bin">Download firmware bin id: 2345678</Link><br/>
                    <Link to={firmware_3456789}  target="_blank" download="firmware_3456789.bin">Download firmware bin id: 3456789</Link><br/>
                    <Link to={firmware_4567890} target="_blank" download="firmware_4567890.bin">Download firmware bin id: 4567890</Link><br/>
                </Col>
            </Row>
            <Row style={{margin:'0', marginTop:'3%'}}>
                <Col style={{ width: '40%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    <Image style={{ width: '30%', float:'right'}} src={require('../Start/nodemcu.png')}/>
                </Col>
                <Col style={{ width: '60%', flexGrow: '0', flexShrink: '0',flexBasis: 'auto'}}>
                    #INSTRUCTION FIRMWARE LINUX<br />
                    <br />
                    <a href="https://nodemcu.readthedocs.io/en/release/flash/" target="_blank" rel="noopener noreferrer">https://nodemcu.readthedocs.io/en/release/flash/</a><br />
                    <br />
                    #SEARCH PORT NODEMCUv3<br />
                    'sudo dmesg | grep tty' <br />
                    OR <br />
                    'sudo ls -l /dev/ttyUSB* && ls -l /dev/ttyS*' <br />
                    <br />
                    'sudo apt install python3-pip' <br />
                    'sudo pip install pyserial' <br />
                    'sudo pip install esptool' <br />
                    'sudo esptool.py --port /dev/ttyUSB1 write_flash -fm dio 0x00000 firmware_1234567.bin' <br />
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
                    NODEMCU FIRMWARE PROGRAMMER (NFP)<br/>
                    <a href="https://github.com/nodemcu/nodemcu-flasher" target="_blank" rel="noopener noreferrer">https://github.com/nodemcu/nodemcu-flasher</a><br />
                    <br/>
                    <Link to={NFP}  target="_blank" download="NFP.zip">Download NODEMCU FIRMWARE PROGRAMMER</Link><br/>
                    <br/>
                </Col>
            </Row>
        </div>
    )

})

export default Start
