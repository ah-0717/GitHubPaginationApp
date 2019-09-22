import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ADD_STAR, REMOVE_STAR, SEARCH_REPOSITORIES } from '../graphql.module';
import { ApolloQueryResult } from 'apollo-client';
import { RequestQueryService } from '../request-query.service';

// 検索用の設定
const PER_PAGE = 5;
const DEFAULT_STATE = {
  first: PER_PAGE,
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

  constructor(private fb: FormBuilder, private requestQueryService: RequestQueryService) {
    this.state = DEFAULT_STATE;
    this.loading = false;

    requestQueryService.sharedNodeSource$.subscribe(
      node => {
        this.addOrRemoveStar(node);
      }
    );
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
    this.state = Object.assign(this.state, {query: this.formSearchValue.value});

    this.requestQueryService.query({
      query: SEARCH_REPOSITORIES,
      variables: this.state
    }).subscribe(result => {
      console.log(result);
      this.loading = false;
      this.searchResult = result;
    });
  }

  goNext(search: any) {
    this.loading = true;
    this.state = Object.assign(this.state, {
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null,
      query: this.formSearchValue.value
    });

    this.requestQueryService.query({
      query: SEARCH_REPOSITORIES,
      variables: this.state
    }).subscribe(result => {
      console.log(result);
      this.loading = false;
      this.searchResult = result;
    },
    error => {
      console.log(error);
      this.loading = false;
      this.searchResult = error;
    });
  }

  goPrevious(search: any) {
    this.loading = true;
    this.state = Object.assign(this.state, {
      first: null,
      after: null,
      last: PER_PAGE,
      before: search.pageInfo.startCursor,
      query: this.formSearchValue.value
    });

    this.requestQueryService.query({
      query: SEARCH_REPOSITORIES,
      variables: this.state
    }).subscribe(result => {
      console.log(result);
      this.loading = false;
      this.searchResult = result;
    },
    error => {
      console.log(error);
      this.loading = false;
      this.searchResult = error;
    });
  }

  addOrRemoveStar(node: any) {
    this.requestQueryService.mutation({
      mutation: node.viewerHasStarred ? REMOVE_STAR : ADD_STAR,
      variables: { input: { starrableId: node.id}},
      refetchQueries: [{
        query: SEARCH_REPOSITORIES,
        variables: this.state
      }]
    }).subscribe(result => {
      console.log(result);
    });
  }
}
