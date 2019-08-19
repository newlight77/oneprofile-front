import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides-angular-page',
  templateUrl: './guides-angular-page.component.html',
  styleUrls: ['./guides-angular-page.component.scss']
})
export class GuidesAngularPageComponent implements OnInit {

  mdPath = 'assets/contents/guides/angular.md';

  constructor() { }

  ngOnInit() {
  }

}
