import {observer} from "mobx-react-lite";
import React from "react";
import './sr.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RulingRange from "./Components/RulingRange";
import ConnectWebSocket from "./Socket/ConnectWebSocket";
import RulingButton from "./Components/RulingButton";
import DropdownMenuRuling from "./Components/DropdownMenuRuling"
import InfoRuling from "./Components/InfoRuling";
import store from "./Store"
import Little from "./Components/Little";

const Index = observer(() => {

    return (
        <div>
            <ConnectWebSocket/>
            { store.rulingControl === 'RulingButton' ? <RulingButton/> : "" }
            { store.rulingControl === 'RulingRange' ? <RulingRange/> : "" }
            {/*{ store.rulingControl === 'Little' ? <Little/> : "" }*/}
            {/*<InfoRuling/>*/}
            <DropdownMenuRuling/>
        </div>
    );
});

export default Index;
