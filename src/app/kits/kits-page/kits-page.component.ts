import { Component, OnInit } from '@angular/core';

class Menu {
  id = '';
  title = '';
  icon = '';
  mdParth = '';
}

@Component({
  selector: 'app-kits-page',
  templateUrl: './kits-page.component.html',
  styleUrls: ['./kits-page.component.scss']
})
export class KitsPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'developer', title: 'Developer', icon: 'build', mdParth: 'assets/contents/kits/developer.md' },
    { id: 'ci', title: 'CI', icon: 'build', mdParth: 'assets/contents/kits/ci.md' },
    { id: 'cd', title: 'CD', icon: 'build', mdParth: 'assets/contents/kits/cd.md' },
  ];

  secondary: Array<Menu> = [
    { id: 'angular', title: 'Angular', icon: 'code', mdParth: 'assets/contents/kits/angular.md' },
    { id: 'java', title: 'Java', icon: 'code', mdParth: 'assets/contents/kits/java.md' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
