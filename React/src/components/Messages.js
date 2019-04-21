import axios from 'axios';
import Message from './Message';
import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';

const Messages = ({ match }) => (
  <div>

  
    <ul>
    {
        [...Array(10).keys()].map(n => {
            return <li key={n}>
                    <Link to={`${match.url}/${n+1}`}>
                      Page {n+1}
                    </Link>
                  </li>;
        })
    }
    </ul>
    <Switch>
      <Route path={`${match.url}/:id(\\d+)`} component={Message} />
      <Route
        path={match.url}
        render={() => <h3>Please select a page</h3>}
      />
    </Switch>
  </div>
);

export default Messages;