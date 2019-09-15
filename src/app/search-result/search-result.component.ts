import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
        query: gql`
        query me {
          user(login: "ah-1991") {
            name
            avatarUrl
          }
        }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        this.rates = result.data && result.data.user.name;
        this.loading = result.loading;
        this.error = result.message;
      });
  }

}
