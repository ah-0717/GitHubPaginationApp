import { Component, OnInit, Input } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;

  // private _searchResult: ApolloQueryResult<unknown>;
  private _searchResult: any; //結果表示用

  @Input() set searchResult(value: ApolloQueryResult<unknown>) {
    this._searchResult = JSON.stringify(value);
}

  // @Input() searchResult: ApolloQueryResult<unknown>;

  constructor() {}

  ngOnInit() {}

}
