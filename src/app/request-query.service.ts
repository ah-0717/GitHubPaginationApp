import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestQueryService {
  private sharedNodeIdSource = new Subject<string>();
  sharedNodeIdSource$ = this.sharedNodeIdSource.asObservable();

  constructor(private apollo: Apollo) { }

  query(options) {
    return this.apollo.watchQuery(options).valueChanges;
  }

  mutation(options) {
    return this.apollo.mutate(options);
  }

  // app-star-button(孫)からapp-search-form（親）に値を送るためのサービス
  shareNodeId(nodeId: string) {
    this.sharedNodeIdSource.next(nodeId);
  }
}
