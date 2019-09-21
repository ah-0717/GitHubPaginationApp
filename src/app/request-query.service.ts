import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestQueryService {
  private sharedNodeSource = new Subject<string>();
  sharedNodeSource$ = this.sharedNodeSource.asObservable();

  constructor(private apollo: Apollo) { }

  query(options) {
    return this.apollo.watchQuery(options).valueChanges;
  }

  mutation(options) {
    return this.apollo.mutate(options);
  }

  // app-star-button(孫)からapp-search-form（親）に値を送るためのサービス
  shareNode(node: any) {
    this.sharedNodeSource.next(node);
  }
}
