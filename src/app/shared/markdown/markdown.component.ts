import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {

  mdPathDir = 'assets/contents/';
  mdPath = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const markdown = this.route.snapshot.data.markdown;
    this.mdPath = this.mdPathDir + markdown + '.md';
  }
}
