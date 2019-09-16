import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ME, SEARCH_REPOSITORIES } from '../graphql.module';

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: 'フロントエンドエンジニア'
};

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;
  state; // ts IF定義

  constructor(private apollo: Apollo) {
    this.state = VARIABLES;
  }

  ngOnInit() {
    this.apollo.watchQuery({
        query: SEARCH_REPOSITORIES,
        variables: {...this.state}
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        // this.rates = result.data && result.data.user.name;
        // this.loading = result.loading;
        // this.error = result.message;
      });
  }

}
