import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { environment } from 'src/environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SearchFormComponent } from './search-form/search-form.component';
import { StarButtonComponent } from './star-button/star-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SearchFormComponent,
    StarButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', `Bearer ${environment.GITHUB_TOKEN}`)
      });
      return forward(operation);
    });
    const uri = 'https://api.github.com/graphql';
    const http = httpLink.create({uri});
    const link = concat(authMiddleware, http);
    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
