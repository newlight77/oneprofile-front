import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {

  mdRootDir = 'assets/contents/';
  mdPath = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const markdown = this.route.snapshot.data.markdown;
    this.mdPath = this.mdRootDir + markdown;
    if (this.route.snapshot.params.statement) {
      this.mdPath = this.mdPath + this.route.snapshot.params.statement;
    }
    this.mdPath = this.mdPath + '.md';
  }
}
