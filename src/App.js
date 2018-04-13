import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import { ApolloProvider } from 'react-apollo';
import { githubClient } from './config/apollo_client';
// import { fetchPostList } from './queries/fetchData';

// githubClient.query({
//   query: fetchPostList
// })
// .then(result => console.log("query result: ", result));

class App extends Component {

  render() {
    return (
      <ApolloProvider client={githubClient}>
        <Router>
          <div>
            <Header />
            <Main />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
