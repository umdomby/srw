import {observer} from "mobx-react-lite";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const DropDownMenuRuling = observer(() => {

    return (
        <div className="DropDownMenuRuling">
            <Dropdown>
                <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    size="sm"
                >
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default DropDownMenuRuling;
