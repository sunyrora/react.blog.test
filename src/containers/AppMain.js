import React from 'react';
// import PropTypes from 'prop-types';
import { HashRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';

const AppMain = () => {
  return (
    <Router>
      <div>
        <Header />
        <Main />
      </div>
    </Router>
  );
}

// AppMain.propTypes = {
//   apolloClient: PropTypes.object
// };

export default AppMain;