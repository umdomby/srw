import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import store from '../Store'
const DropdownMenuRuling = observer(() => {

    const [dropDown, setDropDown] = useState(localStorage.getItem('localRulingControl') || '')

    useEffect(()=>{
        if( localStorage.getItem('localRulingControl') === null || localStorage.getItem('localRulingControl') === undefined) {
            localStorage.setItem('localRulingControl', 'Clean')
        }
        // if( localStorage.getItem('localIdRoom') === null || localStorage.getItem('localIdRoom') === undefined) {
        //     localStorage.setItem('localRulingControl', 'Home')
        // }
        store.setRulingControl(localStorage.getItem('localRulingControl') || '')
    },[store.rulingControl])

    const RulingButton = () => {
        localStorage.setItem('localRulingControl', 'Button')
        store.setRulingControl('Button')
        setDropDown('Button')
    }
    const RulingRange = () => {
        localStorage.setItem('localRulingControl', 'Range')
        store.setRulingControl('Range')
        setDropDown('Range')
    }
    const Clean = () => {
        localStorage.setItem('localRulingControl', 'Clean')
        store.setRulingControl('Clean')
        setDropDown('Clean')
    }
    const Joy = () => {
        localStorage.setItem('localRulingControl', 'Joy')
        store.setRulingControl('Joy')
        setDropDown('Joy')
    }

    return (
        <div className="DropDownMenuRuling">
            <Dropdown>
                <Dropdown.Toggle style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}} id="dropdown-basic">
                    {dropDown}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}}>
                    <Dropdown.Item onClick={Clean}>Clean</Dropdown.Item>
                    <Dropdown.Item onClick={RulingButton}>Button</Dropdown.Item>
                    <Dropdown.Item onClick={Joy}>Joy</Dropdown.Item>
                    <Dropdown.Item onClick={RulingRange}>Range</Dropdown.Item>
                    {/*<Dropdown.Item onClick={Little}>Little</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropdownMenuRuling;
