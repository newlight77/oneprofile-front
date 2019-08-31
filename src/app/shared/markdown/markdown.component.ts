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
    if (this.route.snapshot.data.mdSubDir) {
      this.mdPath = this.mdRootDir + this.route.snapshot.data.mdSubDir;
    }
    if (this.route.snapshot.data.mdFilename) {
      this.mdPath = this.mdPath + this.route.snapshot.data.mdFilename;
    } else if (this.route.snapshot.params.mdFilename) {
      this.mdPath = this.mdPath + this.route.snapshot.params.mdFilename;
    }
    this.mdPath = this.mdPath + '.md';
  }
}
