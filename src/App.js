import React, { Component } from 'react';
import { getApolloClient } from './config/apollo_client';
import AppMain from './containers/AppMain';
import { Redirect } from 'react-router-dom';
import storage from './utils/storage';

import { GIT_AUTH_URI, GATE_KEEPER } from './config/github';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gitToken: undefined,
    }

    this.apolloClient = undefined;
  }

  init() {
    const token = storage.get('gitToken');

    if(!token) {
      return this.gitAuth();
    }

    this.setApolloClient(token);
    this.setState({token});
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    // storage.remove('gitToken');
  }

  gitAuth() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      fetch(`${GATE_KEEPER}/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setApolloClient(token);
          storage.set('gitToken', token);
          this.setState({ token });
        });
    }
  }

  setApolloClient(token) {
    this.apolloClient = getApolloClient(token);
  }

  createApp() {
    return (
      <AppMain apolloClient={this.apolloClient} />
    );
  }

  render() {
    const LoginButton = (
      <a
        href={GIT_AUTH_URI}
      >
        Login
      </a>
    );

    return this.apolloClient ? this.createApp() : LoginButton;
  }
}

export default App;
