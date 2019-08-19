import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides-devops-page',
  templateUrl: './guides-devops-page.component.html',
  styleUrls: ['./guides-devops-page.component.scss']
})
export class GuidesDevopsPageComponent implements OnInit {

  mdPath = 'assets/contents/guides/devops.md';

  constructor() { }

  ngOnInit() {
  }

}
