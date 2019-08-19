import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides-developer-page',
  templateUrl: './guides-developer-page.component.html',
  styleUrls: ['./guides-developer-page.component.scss']
})
export class GuidesDeveloperPageComponent implements OnInit {

  mdPath = 'assets/contents/guides/developer.md';

  constructor() { }

  ngOnInit() {
  }

}
