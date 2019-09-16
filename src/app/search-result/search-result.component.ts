import { Component, OnInit, Input } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { GraphQLError } from 'graphql/error/GraphQLError';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  _loading: boolean;
  errorMessages: ReadonlyArray<GraphQLError>;

  result: any; // 結果表示用
  title: string;

  constructor() {}

  @Input() set loading(isLoad: boolean) {
    this._loading = isLoad;
  }

  @Input() set searchResult(result: ApolloQueryResult<unknown>) {
    if (!result) {
      return;
    }

    this._loading = result.loading;
    if (result.loading) {
      return;
    }
    if (result.errors) {
      this.errorMessages = result.errors;
      return;
    }
    const search = result.data.search;
    // タイトル
    const repositoryCount = search.repositoryCount;
    const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories';
    this.title = `${repositoryCount} ${repositoryUnit}`;

    this.result = result;
  }

  ngOnInit() {}

}
