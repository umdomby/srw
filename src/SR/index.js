import {observer} from "mobx-react-lite";
import React from "react";
import './sr.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RulingRange from "./Components/RulingRange";
import ConnectWebSocket from "./Socket/ConnectWebSocket";
import RulingButton from "./Components/RulingButton";
import DropDownMenuRuling from "./Components/DropDownMenuRuling"

const Index = observer(() => {

    return (
        <div>
            <ConnectWebSocket/>
            <RulingButton/>
            <RulingRange/>
            <DropDownMenuRuling/>
        </div>
    );
});

export default Index;
