import React from 'react';
import { Query } from 'react-apollo';
import { fetchPostList } from '../queries/fetchData';
import { Link } from 'react-router-dom';


const PostList = () => (
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

export default PostList;