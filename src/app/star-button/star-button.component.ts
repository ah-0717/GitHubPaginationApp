import { Component, OnInit, Input } from '@angular/core';
import { RequestQueryService } from '../request-query.service';

@Component({
  selector: 'app-star-button',
  templateUrl: './star-button.component.html',
  styleUrls: ['./star-button.component.scss']
})
export class StarButtonComponent implements OnInit {
  @Input() edge;
  starStatus: string;
  node: any;

  constructor(private requestQueryService: RequestQueryService) { }

  ngOnInit() {
    this.node = this.edge.node;
    const totalCount: number = this.node.stargazers.totalCount;
    const viewerHasStarred: boolean = this.node.viewerHasStarred;
    const starCount = totalCount === 1 ? '1 star' : `${totalCount} stars`;
    this.starStatus = `${starCount} | ${viewerHasStarred ? 'starred' : '-'}`;
  }

  clickStar(node: any) {
    this.requestQueryService.shareNode(node);
  }
}
