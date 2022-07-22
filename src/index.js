import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import './SR/sr.css'
// import registerServiceWorker from './registerServiceWorker';
import SR from "./SR";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div>
        <App/>
        {/*<div className="Control">*/}

            <SR/>

    </div>

)
// registerServiceWorker();
