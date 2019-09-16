import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RequestQueryService {

  constructor(private apollo: Apollo) { }

  query(options) {
    return this.apollo.watchQuery(options).valueChanges;
  }
}
