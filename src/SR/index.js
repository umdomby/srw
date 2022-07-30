import {observer} from "mobx-react-lite";
import React from "react";
import './sr.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RulingRange from "./Components/RulingRange";
import ConnectWebSocket from "./Socket/ConnectWebSocket";
import RulingButtonPS from "./Components/RulingButtonPS";
import DropdownMenuRuling from "./Components/DropdownMenuRuling"
import InfoRuling from "./Components/InfoRuling";
import store from "./Store"
import Little from "./Components/Little";
import Gamepad from "./Components/Gamepad/Gamepad";

const Index = observer(() => {

    return (
        <div>
            <ConnectWebSocket/>
            { store.rulingControl === 'Button' ? <RulingButtonPS/> : "" }
            { store.rulingControl === 'Range' ? <RulingRange/> : "" }
            { store.rulingControl === 'Joy' ? <Gamepad/> : "" }
            { store.rulingControl === 'Clean' ? "" : "" }
            {/*{ store.rulingControl === 'Little' ? <Little/> : "" }*/}
            {/*<InfoRuling/>*/}
            <DropdownMenuRuling/>
        </div>
    );
});

export default Index;
