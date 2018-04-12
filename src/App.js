import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import createHistory from "history/createHashHistory"
import Header from './components/Header';
import Main from './components/Main';
// import Game from './components/Game';

const history = createHistory();

class App extends Component {

  render() {
    console.log("process.env.PUBLIC_URL: ", process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL} history={history}>
        <div>
          <Header />
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
