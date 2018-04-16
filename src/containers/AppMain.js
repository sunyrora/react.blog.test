import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';

const AppMain = ({apolloClient}) => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <div>
        <Header />
        <Main />
      </div>
    </Router>
  </ApolloProvider>
);

AppMain.propTypes = {
  apolloClient: PropTypes.object.isRequired
};

export default AppMain;