import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides-java-page',
  templateUrl: './guides-java-page.component.html',
  styleUrls: ['./guides-java-page.component.scss']
})
export class GuidesJavaPageComponent implements OnInit {

  mdPath = 'assets/contents/guides/java.md';

  constructor() { }

  ngOnInit() {
  }

}
