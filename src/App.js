import React, { Component } from 'react';
import { githubClient } from './config/apollo_client';
import AppMain from './containers/AppMain';
import storage from './utils/storage';
import { ApolloProvider } from 'react-apollo';

import { GIT_AUTH_URI, GATE_KEEPER } from './config/github';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gitToken: undefined,
      apolloClient: undefined,
    }
  }

  init() {
    const token = storage.get('gitToken');

    if(!token || token === 'undefined') {
      const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
      if (code) {
        fetch(`${GATE_KEEPER}/authenticate/${code}`)
          .then(response => response.json())
          .then(({ token }) => {
            storage.set('gitToken', token);
            const redirectURL = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL;
            window.location.replace(redirectURL);
          });
      } else {
        window.open(GIT_AUTH_URI, '_self');
      }
    } else {
      this.setState({
        token,
        apolloClient: githubClient.getApolloClient(token),
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
  }

  render() {
    const LoginButton = (
      <button
        onClick={() => {
          window.open(GIT_AUTH_URI, '_self');
        }}
      >Authorize App
      </button>
    );

    return this.state.apolloClient ? (
      <ApolloProvider client={this.state.apolloClient}>
        <AppMain />
      </ApolloProvider>
    )
    : (
      <div>
        Loading...
      </div>
    );
  }
}

export default App;
