import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-button',
  templateUrl: './star-button.component.html',
  styleUrls: ['./star-button.component.scss']
})
export class StarButtonComponent implements OnInit {
  @Input() edge;
  star: string;

  constructor() { }

  ngOnInit() {
    const node: any = this.edge.node;
    const totalCount: number = node.stargazers.totalCount;
    const viewerHasStarred: boolean = node.viewerHasStarred;
    const starCount = totalCount === 1 ? '1 star' : `${totalCount} stars`;
    this.star = `${starCount} | ${viewerHasStarred ? 'starred' : '-'}`;
  }

}
