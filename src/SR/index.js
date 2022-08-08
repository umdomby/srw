import {observer} from "mobx-react-lite";
import React from "react";
import './sr.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RulingRange from "./Components/RulingRange";
import ConnectWebSocket from "./Socket/ConnectWebSocket";
import RulingButtonPC from "./Components/RulingButtonPC";
import DropdownMenuRuling from "./Components/DropdownMenuRuling"
import InfoRuling from "./Components/InfoRuling";
import store from "./Store"
import Little from "./Components/Little";
import Gamepad from "./Components/Gamepad/Gamepad";
import RulingButtonSmart from "./Components/RulingButtonSmart";
import Dictaphone from "./Components/Dictaphone/Dictaphone"
import TextSpeak from "./Components/TextSpeak";

const Index = observer(() => {

    return (
        <div>
            <ConnectWebSocket/>
            { store.rulingControl === 'Button' ? <RulingButtonPC/> : "" }
            { store.rulingControl === 'ButtonSmart' ? <RulingButtonSmart/> : "" }
            { store.rulingControl === 'Range' ? <RulingRange/> : "" }
            { store.rulingControl === 'Gamepad' ? <Gamepad/> : "" }
            { store.rulingControl === 'Clean' ? "" : "" }
            { store.rulingControl === 'Voice' ? <Dictaphone/> : "" }
            { store.rulingControl === 'TextSpeak' ? <TextSpeak/> : "" }

            {/*<InfoRuling/>*/}
            <DropdownMenuRuling/>
        </div>
    );
});

export default Index;
