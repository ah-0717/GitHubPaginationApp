import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { RequestQueryService } from '../request-query.service';

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

  @Output() goNext = new EventEmitter();
  @Output() goPrevious = new EventEmitter();

  constructor() {}

  @Input() set loading(isLoad: boolean) {
    this._loading = isLoad;
  }

  @Input() set searchResult(result: ApolloQueryResult<unknown>) {
    // todo 見直したい
    if (!result) {
      return;
    }

    this._loading = result.loading;
    if (result.loading) {
      return;
    }
    if (result.graphQLErrors) {
      this.result = result;
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

  // todo IF定義
  clickNext(search: any) {
    this.goNext.emit(search);
  }

  clickPrevious(search: any) {
    this.goPrevious.emit(search);
  }

}
