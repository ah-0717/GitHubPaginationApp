import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ME } from '../graphql.module';

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
        query: ME,
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        this.rates = result.data && result.data.user.name;
        this.loading = result.loading;
        this.error = result.message;
      });
  }

}
