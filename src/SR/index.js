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

const Index = observer(() => {

    return (
        <div>
            <ConnectWebSocket/>
            { store.rulingControl === 'RulingButtonPS' ? <RulingButtonPS/> : "" }
            { store.rulingControl === 'RulingRange' ? <RulingRange/> : "" }
            { store.rulingControl === 'RulingNull' ? "" : "" }
            {/*{ store.rulingControl === 'Little' ? <Little/> : "" }*/}
            {/*<InfoRuling/>*/}
            <DropdownMenuRuling/>
        </div>
    );
});

export default Index;
