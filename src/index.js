import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import './SR/sr.css'
// import registerServiceWorker from './registerServiceWorker';
// import SR from "./SR";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>

    </div>
)
// registerServiceWorker();
