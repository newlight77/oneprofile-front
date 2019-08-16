import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-community-page',
  templateUrl: './home-community-page.component.html',
  styleUrls: ['./home-community-page.component.scss']
})
export class HomeCommunityPageComponent implements OnInit {

  mdPath = 'assets/contents/home/community.md';

  constructor() { }

  ngOnInit() {
  }

  onLoad(event) {
  }

  onError(event) {
  }
}
