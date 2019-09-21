import { NgModule } from '@angular/core';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-angular-link-http';

import gql from 'graphql-tag';

export const ADD_STAR = gql`
mutation addStar($input: AddStarInput!) {
  addStar(input: $input) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
`;

export const REMOVE_STAR = gql`
mutation removeStar($input: RemoveStarInput!) {
  removeStar(input: $input) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
`;

export const SEARCH_REPOSITORIES = gql`
query searchRepositories($first: Int, $after: String, $last: Int, $before: String, $query: String!) {
  search(first: $first, after: $after, last: $last, before: $before, query: $query, type: REPOSITORY) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          viewerHasStarred
        }
      }
    }
  }
}
`;

export const ME = gql`
  query me {
    user(login: "ah-1991") {
      name
      avatarUrl
    }
  }
`;

const uri = ''; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    hash: new InMemoryCache()
  };
}

@NgModule({
  // exports: [ApolloModule],
  // providers: [
  //   {
  //     provide: APOLLO_OPTIONS,
  //     useFactory: createApollo,
  //     deps: [HttpLink, Apollo],
  //   },
  // ],
})
export class GraphQLModule {}
