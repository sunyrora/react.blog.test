import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
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
    </header>
  );
};

export default Header;