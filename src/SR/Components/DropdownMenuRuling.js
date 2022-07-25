import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import store from '../Store'
const DropdownMenuRuling = observer(() => {

    useEffect(()=>{
        if( localStorage.getItem('localRulingControl') === null || localStorage.getItem('localIdRoom') === undefined) {
            localStorage.setItem('localRulingControl', '')
        }
        store.setRulingControl(localStorage.getItem('localRulingControl') || '')
    },[store.rulingControl])

    const RulingButton = () => {
        localStorage.setItem('localRulingControl', 'RulingButton')
        store.setRulingControl('RulingButton')
    }
    const RulingRange = () => {
        localStorage.setItem('localRulingControl', 'RulingRange')
        store.setRulingControl('RulingRange')
    }
    const Scheme = () => {
        localStorage.setItem('localRulingControl', 'Scheme')
        store.setRulingControl('Scheme')
    }

    return (
        <div className="DropDownMenuRuling">
            <Dropdown>
                <Dropdown.Toggle style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}} id="dropdown-basic">
                    RULING
                </Dropdown.Toggle>

                <Dropdown.Menu style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}}>
                    <Dropdown.Item onClick={RulingButton}>Button</Dropdown.Item>
                    <Dropdown.Item onClick={RulingRange}>Range</Dropdown.Item>
                    {/*<Dropdown.Item onClick={Little}>Little</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropdownMenuRuling;
