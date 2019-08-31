import { Component, OnInit } from '@angular/core';

class Menu {
  id = '';
  title = '';
  icon = '';
}

@Component({
  selector: 'app-kits-page',
  templateUrl: './kits-page.component.html',
  styleUrls: ['./kits-page.component.scss']
})
export class KitsPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'developer', title: 'Developer', icon: 'build' },
    { id: 'ci', title: 'CI', icon: 'build' },
    { id: 'cd', title: 'CD', icon: 'build' },
  ];

  secondary: Array<Menu> = [
    { id: 'angular', title: 'Angular', icon: 'code' },
    { id: 'java', title: 'Java', icon: 'code' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
