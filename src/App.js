import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
// import Game from './components/Game';

class App extends Component {

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Header />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
