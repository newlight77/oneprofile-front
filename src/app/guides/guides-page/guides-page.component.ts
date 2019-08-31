import { Component, OnInit } from '@angular/core';


class Menu {
  id = '';
  title = '';
  icon = '';
}

@Component({
  selector: 'app-guides-page',
  templateUrl: './guides-page.component.html',
  styleUrls: ['./guides-page.component.scss']
})
export class GuidesPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'developer', title: 'Developer', icon: 'person' },
    { id: 'devops', title: 'DevOps', icon: 'build' },
    { id: 'gitflow', title: 'Gitflow', icon: 'track_changes' },
  ];

  secondary: Array<Menu> = [
    { id: 'angular', title: 'Angular', icon: 'code' },
    { id: 'java', title: 'Java', icon: 'code' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
