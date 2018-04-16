import React from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_ID, STATUS } from '../config/github';

const REDIRECT_URI = 'http://localhost:3000';

const Header = ({ status }) => {
  const loginButton = (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
    >
      Login
    </a>);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/game'>Game</Link></li>
          <li><Link to='/posts'>Post List</Link></li>
          <li><Link to='/Blog'>Blog</Link></li>
        </ul>
      </nav>

      { status !== STATUS.FINISHED_LOADING ? loginButton : (<div>logged In</div>) }
      
    </header>
  );
};

export default Header;