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

    return (
        <div className="DropDownMenuRuling">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Ruling control
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={RulingButton}>RulingButton</Dropdown.Item>
                    <Dropdown.Item onClick={RulingRange}>RulingRange</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropdownMenuRuling;
