import React, { Component } from 'react';
import Video from './components/video'
import './styles/video.css'
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import { goToRoomInput } from './components/goToRoomInput';
import Little from "./SR/Components/Little";
import Big from "./SR/Components/Big";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <React.Fragment>
               <Route path="/" exact component={goToRoomInput}/>
                <Route path="/little" exact component={Little}/>
                <Route path="/big" exact component={Big}/>
                <Route path="/r/:roomId" exact component={Video}/>
            </React.Fragment>
          </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
