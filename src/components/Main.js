import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import Blog from './Blog';
import PostList from './PostList';
import PostView from './PostView';

const Main = ({ status }) => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/game' component={Game}/>
        <Route path='/posts' component={(props) => <PostList {...props} status={status} />}/>
        <Route path='/post/:title' component={PostView}/>
        <Route path='/Blog' component={Blog}/>
      </Switch>
    </main>
  );
};

export default Main;