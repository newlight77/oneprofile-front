import { Component, OnInit } from '@angular/core';

class Menu {
  id = '';
  title = '';
  icon = '';
}

@Component({
  selector: 'app-dojo-page',
  templateUrl: './dojo-page.component.html',
  styleUrls: ['./dojo-page.component.scss']
})
export class DojoPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'dojo', title: 'Coding Dojo', icon: 'code' },
    { id: 'statements', title: 'Statements', icon: 'assignment' },
    { id: 'bootstraps', title: 'Bootstraps', icon: 'offline_bolt'  },
  ];

  constructor() { }

  ngOnInit() {
  }

}
