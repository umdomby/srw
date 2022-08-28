import React, { Component } from 'react';
import Video from './components/video'
import Videovr from './components/videovr'
import VideoNoMic from './components/videoNoMic'
import './styles/video.css'
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import { goToRoomInput } from './components/goToRoomInput';
import Little from "./SR/Components/Little";
import Big from "./SR/Components/Big";
import DropdownMenuModel from "./SR/Components/DropdownMenuModel";
import Start from "./SR/Components/Start";
import ScrollToTop from "./SR/Components/ScrollToTop";
import SR from "./SR";
import Gamepad from "./SR/Components/Gamepad/Gamepad";
import TextSpeak from "./SR/Components/TextSpeak";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          {/*<DropdownMenuModel/>*/}
          <ScrollToTop />
          <SR/>
          <Gamepad/>
          <Switch>
          {/*<TextSpeak/>*/}
            <React.Fragment>
               <Route path="/" exact component={goToRoomInput}/>
                <Route path="/start" exact component={Start}/>
                <Route path="/little" exact component={Little}/>
                <Route path="/big" exact component={Big}/>
                <Route path="/r/:roomId" exact component={Video}/>
                <Route path="/vr/:roomId" exact component={Videovr}/>
                <Route path="/mr/:roomId" exact component={VideoNoMic}/>
            </React.Fragment>
          </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
