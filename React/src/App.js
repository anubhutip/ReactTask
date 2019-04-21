import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './components/Home';
import Messages from './components/Messages';
import Message from './components/Message';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="menu">
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/messages/:id">Pages</Link> </li>
            </ul>
        </div>
        <div className="App-intro">
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route path="/messages" component={Messages} />
            <Route path="/messages/:id" component={Message} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
