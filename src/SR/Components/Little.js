import {observer} from "mobx-react-lite";
import React from "react";
import store from '../Store'
import {Col, Row} from "react-bootstrap";
import DropdownMenuModel from "./DropdownMenuModel";

const Little = observer(() => {

    return(

        <div style={{color:'white'}}>
            <DropdownMenuModel/>
        </div>
    )

})

export default Little
