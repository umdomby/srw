import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import store from '../Store'
const DropdownMenuModel = observer(() => {

    return (
        <div className="DropDownMenuModel">
            <Dropdown>
                <Dropdown.Toggle style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}} id="dropdown-basic">
                    MODEL
                </Dropdown.Toggle>

                <Dropdown.Menu style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}}>
                    <Dropdown.Item href="../little">Little</Dropdown.Item>
                    <Dropdown.Item href="../big">Big</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropdownMenuModel;
