import gql from 'graphql-tag';

export const fetchPostList = gql`
query PostListQuery($expression: String!, $repositoryName: String!, $owner: String!) {
  repository(name: $repositoryName, owner: $owner) {
    object(expression: $expression) {
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
  query PostQuery($expression: String!, $repositoryName: String!, $owner: String!) {
    repository(name: $repositoryName, owner: $owner){
      object(expression: $expression) {
        ... on Blob {
          text
        }
      }
    }
  }
`;

// export const fetchPost2 = gql`
// {
//   repository(name: "sunyrora.github.io", owner: "sunyrora"){
//     object(expression: "gh-pages:_posts/2018-04-03-GitHub-Pages.md") {
//       ... on Blob {
//         text
//       }
//     }
//   }
// }
// `;