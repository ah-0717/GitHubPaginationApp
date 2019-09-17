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
    const totalCount = this.edge.node.stargazers.totalCount;
    this.star = totalCount === 1 ? '1 star' : `${totalCount} stars`;
  }

}
