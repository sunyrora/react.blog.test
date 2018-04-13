import gql from 'graphql-tag';

export const fetchPostList = gql`
{
  repository(name: "sunyrora.github.io", owner: "sunyrora"){     
    object(expression: "gh-pages:_posts") {
      ... on Tree{
        entries{
          name
          type
          mode
        }
      }
    }
  }
}
`;

export const fetchPost = gql`
{
  repository(name: "sunyrora.github.io", owner: "sunyrora"){
    object(expression: "gh-pages:_posts/2018-04-03-GitHub-Pages.md") {
      ... on Blob {
        text
      }
    }
  }
}
`;