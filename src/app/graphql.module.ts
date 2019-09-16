import { NgModule } from '@angular/core';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-angular-link-http';

import gql from 'graphql-tag';

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
