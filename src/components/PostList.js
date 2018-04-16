import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { fetchPostList } from '../queries/fetchData';
import { Link } from 'react-router-dom';
import { STATUS } from '../config/github';

// const REDIRECT_URI = 'http://localhost:3000';

// const STATUS = {
//   INITIAL: "initial",
//   LOADING: "loading",
//   FINISHED_LOADING: "finished_loading",
//   AUTHENTICATED: "authenticated"
// };

class PostList extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     status: STATUS.INITIAL,
  //     token: null,
  //   }
  // }

  // componentDidMount() {
  //   const code =
  //     window.location.href.match(/\?code=(.*)/) &&
  //     window.location.href.match(/\?code=(.*)/)[1]
  //   if (code) {
  //     this.setState({ status: STATUS.LOADING })
  //     fetch(`${GATE_KEEPER}/authenticate/${code}`)
  //       .then(response => response.json())
  //       .then(({ token }) => {
  //         console.log('### token: ', token);
  //         this.setState({
  //           token,
  //           status: STATUS.FINISHED_LOADING,
  //         })
  //       })
  //   }
  // }
  
  render() {
    const loggedIn = (
      <Query
        query={ fetchPostList }
      >
        {
          ({loading, error, data}) => {
            if(loading) return (<p>Loading...</p>);
            if(error) return (<p>Error :(</p>);
            
            const posts = data.repository.object.entries.map(({ name }) => (
              <Link to={`post/${name}`} key={ name }>
                <li>{name}</li>
              </Link>
            ));

            return (<ul>{posts}</ul>);
          }
        }
      </Query>
    );

    const notLoggedIn = (
      <div>
        Please login.
      </div>
    );

    return this.props.status === STATUS.FINISHED_LOADING ? loggedIn : notLoggedIn;
  }
}

// PostList.propTypes = {

// };

export default PostList;