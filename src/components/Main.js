import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import Blog from './Blog';
import PostList from './PostList';
import PostView from './PostView';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/game' component={Game}/>
        <Route path='/posts' render={(props) => <PostList {...props} />}/>
        <Route path='/post/:title' render={props => <PostView {...props} />}/>
        <Route path='/Blog' component={Blog}/>
      </Switch>
    </main>
  );
};

export default Main;