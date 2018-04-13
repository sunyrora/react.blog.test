import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { fetchPostList } from '../queries/fetchData';
import { Link } from 'react-router-dom';

class PostList extends Component {
  render() {
    return (
      <Query
        query={ fetchPostList }
      >
        {
          ({loading, error, data}) => {
            if(loading) return (<p>Loading...</p>);
            if(error) return (<p>Error :(</p>);

            {/* console.log(data); */}
            
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
  }
}

PostList.propTypes = {

};

export default PostList;