import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPost } from '../queries/fetchData';
import { Query } from 'react-apollo';
import marked from 'marked';

class PostView extends Component {
  createMarkup(val) {
    return { __html: val };
  }

  render() {
    return (
      <Query
        query={ fetchPost }
      >
        {
          ({ loading, error, data }) => {
            if(loading) return <p>Loading...</p>;
            if(error) return <p>error :(</p>;

            const converted = this.createMarkup(marked(data.repository.object.text));

            return <div dangerouslySetInnerHTML={converted} />;
          }
        }
      </Query>
    );
  }
}

PostView.propTypes = {
  // title: PropTypes.string.isRequired
};

export default PostView;