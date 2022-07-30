import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import store from '../Store'
import {Link} from "react-router-dom";
const DropdownMenuModel = observer(() => {

    const [dropDown, setDropDown] = useState('Home')

    return (
        <div className="DropDownMenuModel">
            <Dropdown>
                <Dropdown.Toggle style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}} id="dropdown-basic">
                    {dropDown}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{background:'transparent', textShadow: '1px 1px 1px #f1f1f1'}}>
                    <Dropdown.Item
                        // as={Link} to="/"
                        href="/"
                        onClick={()=>setDropDown('Home')}
                    >Home</Dropdown.Item>
                    <Dropdown.Item
                        // as={Link} to="/start"
                        href="/start"
                        onClick={()=>setDropDown('Start')}
                    >Start</Dropdown.Item>
                    <Dropdown.Item
                        href="/start"
                        // as={Link} to="/little"
                        onClick={()=>setDropDown('Little')}
                    >Little</Dropdown.Item>
                    {/*<Dropdown.Item*/}
                    {/*    as={Link} to="/big"*/}
                    {/*    onClick={()=>setDropDown('Big')}*/}
                    {/*>Big</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropdownMenuModel;
