import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guides-markdown-page',
  templateUrl: './guides-markdown-page.component.html',
  styleUrls: ['./guides-markdown-page.component.scss']
})
export class GuidesMarkdownPageComponent implements OnInit {

  mdPathDir = 'assets/contents/guides/';
  mdPath = 'developer';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(`markdown page : ${this.route.snapshot.data.markdown}`);
    const markdown = this.route.snapshot.data.markdown;
    this.mdPath = this.mdPathDir + markdown + '.md';
    console.log(`this.mdPath : ${this.mdPath}`);
  }
}
