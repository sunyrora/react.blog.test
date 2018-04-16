import React, { Component } from 'react';
import { HashRouter as Router, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import { ApolloProvider } from 'react-apollo';
import { getApolloClient } from './config/apollo_client';

import { CLIENT_ID, GATE_KEEPER, STATUS } from './config/github';

const REDIRECT_URI = 'http://localhost:3000';

const APOLLO_STATUS = {
  APOLLO_WAIT: 'apollo_wait',
  APOLLO_READY: 'apollo_ready',
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: STATUS.INITIAL,
      apollo_status: APOLLO_STATUS.APOLLO_WAIT,
      token: null,
    }

    this.apolloClient = null;
  }

  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1]
      console.log("code: ", code);
    if (code) {
      this.setState({ status: STATUS.LOADING })
      fetch(`${GATE_KEEPER}/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          console.log('### token: ', token);
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING,
          }, () => this.setApolloClient(token));
        });
    }
  }

  setApolloClient(token) {
    this.apolloClient = getApolloClient(token);
    this.setState({apollo_status: APOLLO_STATUS.APOLLO_READY});
  }

  createApolloProvider() {
    const provider = (
      <ApolloProvider client={this.apolloClient}>
        <Router>
          <div>
            <Header 
              status={this.state.status}
            />
            <Main status={this.state.status}/>
          </div>
        </Router>
      </ApolloProvider>
    );

    return provider;
  }

  render() {
    

    const loginButton = (
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        Login
      </a>);
    return this.state.apollo_status === APOLLO_STATUS.APOLLO_READY ? this.createApolloProvider() : loginButton;
  }
}

export default App;
