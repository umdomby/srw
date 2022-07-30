import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import store from "../Store";

const Little = observer(() => {

        useEffect(()=>{
                localStorage.setItem('localRulingControl', 'Clean')
                store.setRulingControl('Clean')
        },[])

    return(
        <div className='Page'>
            <div style={{width:'50%', margin: '0 auto', paddingTop:'100px'}}>
            Robot: Chassis(12.28$) + NodeMcu v3(1.76$) + driver L298N(0.85$) + your: batteries 5V, wires and any smartphone  = 14,89$ + Delivery 5,65$ <br/>
            For all 20,54$<br/>
            <br/>
            Robot chassis set <br/>
            $12.28 + $4.80<br/>
            <a href="https://aliexpress.ru/wholesale?catId=&SearchText=robot%20chassis%20set" target="_blank" rel="noopener noreferrer">https://aliexpress.ru/wholesale?catId=&SearchText=robot%20chassis%20set</a><br />
            </div>
            <br/>
            <Image src={require('../Little/little.png')} style={{ width: '50%', marginLeft:'25%'}}/><br/>
            <div style={{width:'50%', margin: '0 auto'}}>
            <br/>
            <br/>
            NodeMcu v3 esp8266<br/>
            $1.76<br/>
            <a href="https://aliexpress.ru/wholesale?catId=&SearchText=nodemcu%20v3" target="_blank" rel="noopener noreferrer">https://aliexpress.ru/wholesale?catId=&SearchText=nodemcu%20v3</a><br />
            </div>
            <br/>
            <Image src={require('../Little/nodemcu.png')} style={{ width: '50%', marginLeft:'25%'}}/><br/>
            <br/>
            <div style={{width:'50%', margin: '0 auto'}}>
            Motor driver L298N<br/>
            $0.85
            <br/>
            <a href="https://aliexpress.ru/wholesale?SearchText=Motor%20driver%20L298N" target="_blank" rel="noopener noreferrer">https://aliexpress.ru/wholesale?SearchText=Motor%20driver%20L298N</a><br />
            </div>
            <Image src={require('../Little/L298N.png')} style={{ width: '50%', marginLeft:'25%'}}/><br/>
            <br/>
            <div style={{width:'50%', margin: '0 auto'}}>
            <Link to='../start'>To Step 2</Link>
            </div>
            <br/>
            <br/>
        </div>
    )
})

export default Little
