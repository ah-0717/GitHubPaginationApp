import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import { StringValueNode } from 'graphql';
import { ME, SEARCH_REPOSITORIES } from '../graphql.module';
import { ApolloQueryResult } from 'apollo-client';

// 検索用の設定
const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: ''
};

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  message: string;
  searchValue: string;
  state: any; // todo IF定義
  searchResult: ApolloQueryResult<unknown>;
  loading: boolean;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.state = DEFAULT_STATE;
    this.loading = false;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchValue: ''
    });
  }

  get formSearchValue() {
    return this.searchForm.get('searchValue');
  }

  onClikSearch() {
    this.message = this.formSearchValue.value;
    this.searchValue = this.formSearchValue.value;
    this.loading = true;

    this.apollo.watchQuery({
      query: SEARCH_REPOSITORIES,
      variables: Object.assign(this.state, {query: this.formSearchValue.value})
    })
    .valueChanges.subscribe(result => {
      console.log(result);
      this.loading = false;
      this.searchResult = result;
    });

  }

}