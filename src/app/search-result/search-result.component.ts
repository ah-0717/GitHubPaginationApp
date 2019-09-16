import { Component, OnInit, Input } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { GraphQLError } from 'graphql/error/GraphQLError';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  loading: boolean;
  errorMessages: ReadonlyArray<GraphQLError>;

  result: any; // 結果表示用
  title: string;

  constructor() {
    this.loading = false;
  }

  @Input() set searchResult(result: ApolloQueryResult<unknown>) {
    if (!result) {
      return;
    }

    this.loading = result.loading;
    if (result.loading) {
      return;
    }
    if (result.errors) {
      this.errorMessages = result.errors;
      return;
    }
    // タイトル
    const repositoryCount = result.data.search.repositoryCount;
    const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories';
    this.title = `${repositoryCount} ${repositoryUnit}`;

    this.result = result;
  }

  ngOnInit() {}

}
