import React, { Component } from 'react';
import { githubClient } from './config/apollo_client';
import AppMain from './containers/AppMain';
import storage from './utils/storage';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import GitAuthCallback from './components/GitAuthCallback';

import { GIT_AUTH_URI } from './config/github';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gitToken: undefined,
      apolloClient: undefined,
    }
  }

  init() {
    // storage.remove('gitToken');
    const token = storage.get('gitToken');
    // console.log('App: token: ', token);

    if(token && token !== 'undefined') {
      this.setState({
        token,
        apolloClient: githubClient.getApolloClient(token),
      });
    }
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.init();
  }

  componentWillUnmount() {
    // storage.remove('gitToken');
  }

  setApolloClient(token) {
    this.setState({ apolloClient: githubClient.getApolloClient(token) });
  }

  render() {
    // console.log("this.apolloClient: ", this.state.apolloClient);
    const LoginButton = (
      <Router>
        <div>
          <button
            onClick={() => {
              window.open(GIT_AUTH_URI, '_self');
            }}
          >Login
          </button>
          <Route path='/gitAuthCallback' component={GitAuthCallback} />
        </div>
      </Router>
      );



    return this.state.apolloClient ? (
      <ApolloProvider client={this.state.apolloClient}>
        <AppMain />
      </ApolloProvider>
    )
    : (
      <div>
        {LoginButton}
      </div>
    );
  }
}

export default App;
