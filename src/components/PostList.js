import React from 'react';
import { Query } from 'react-apollo';
import { fetchPostList } from '../queries/fetchData';
import { Link } from 'react-router-dom';
import { REPO_NAME, REPO_OWNER, BRANCH, TARGET_FOLDER } from '../config/github';


const PostList = () => (
  <Query
    query={ fetchPostList }
    variables={{
      expression: `${BRANCH}:${TARGET_FOLDER}`,
      repositoryName: REPO_NAME,
      owner: REPO_OWNER
    }
    }
  >
    {
      ({loading, error, data}) => {
        if(loading) return (<p>Loading...</p>);
        if(error) return (<p>Error :(</p>);
        
        const posts = data.repository.object.entries.map(({ name }) => {
          const reg = /[^\d{4}\-\d{2}\-\d{2}\-].*(?=.md|html)/;
          const newName = name.match(reg);

          return (
            <Link to={`post/${name}`} key={ name }>
              <li>{newName}</li>
            </Link>
          );
        });

        return (<ul>{posts}</ul>);
      }
    }
  </Query>
);

export default PostList;