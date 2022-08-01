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
    const RulingButtonSmart = () => {
        localStorage.setItem('localRulingControl', 'ButtonSmart')
        store.setRulingControl('ButtonSmart')
        setDropDown('ButtonSmart')
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
    const Gamepad = () => {
        localStorage.setItem('localRulingControl', 'Gamepad')
        store.setRulingControl('Gamepad')
        setDropDown('Gamepad')
    }
    const Voice = () => {
        localStorage.setItem('localRulingControl', 'Voice')
        store.setRulingControl('Voice')
        setDropDown('Voice')
    }
    const TextSpeak = () => {
        localStorage.setItem('localRulingControl', 'TextSpeak')
        store.setRulingControl('TextSpeak')
        setDropDown('TextSpeak')
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
                    <Dropdown.Item onClick={RulingButtonSmart}>ButtonSmart</Dropdown.Item>
                    <Dropdown.Item onClick={Gamepad}>Gamepad</Dropdown.Item>
                    <Dropdown.Item onClick={RulingRange}>Range</Dropdown.Item>
                    <Dropdown.Item onClick={Voice}>Voice</Dropdown.Item>
                    <Dropdown.Item onClick={TextSpeak}>TextSpeak</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropdownMenuRuling;
