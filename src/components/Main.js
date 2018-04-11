import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import Blog from './Blog';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/game' component={Game}/>
        <Route path='/Blog' component={Blog}/>
      </Switch>
    </main>
  );
};

export default Main;