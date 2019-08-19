import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides-gitflow-page',
  templateUrl: './guides-gitflow-page.component.html',
  styleUrls: ['./guides-gitflow-page.component.scss']
})
export class GuidesGitflowPageComponent implements OnInit {

  mdPath = 'assets/contents/guides/gitflow.md';

  constructor() { }

  ngOnInit() {
  }

}
