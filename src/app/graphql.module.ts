import {NgModule, Input} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { ApolloLink, concat } from 'apollo-link';

// ローカルから読み込む
import { environment } from './../environments/environment';
export function print() {
  console.log('test: ', environment.GITHUB_TOKEN);
}

const uri = ''; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, apollo: Apollo) {
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
