import { Component, OnInit } from '@angular/core';


class Menu {
  id = '';
  title = '';
  icon = '';
  mdParth = '';
}

@Component({
  selector: 'app-guides-page',
  templateUrl: './guides-page.component.html',
  styleUrls: ['./guides-page.component.scss']
})
export class GuidesPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'developer', title: 'Developer', icon: 'person', mdParth: 'assets/contents/guides/developer.md' },
    { id: 'devops', title: 'DevOps', icon: 'build', mdParth: 'assets/contents/guides/devops.md' },
    { id: 'gitflow', title: 'Gitflow', icon: 'track_changes', mdParth: 'assets/contents/guides/gitflow.md' },
  ];

  secondary: Array<Menu> = [
    { id: 'angular', title: 'Angular', icon: 'code', mdParth: 'assets/contents/guides/angular.md' },
    { id: 'java', title: 'Java', icon: 'code', mdParth: 'assets/contents/guides/java.md' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
