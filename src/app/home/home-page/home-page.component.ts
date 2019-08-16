import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // homeMenu = [
  //   {id: 'landing', title: 'Welcome to Oneprofile', path: 'home/landing', icon: 'home'},
  //   {id: 'events', title: 'Events', path: 'home/events', icon: 'event'},
  //   {id: 'community', title: 'Open Community', path: 'home/community', icon: 'group'},
  // ];

  constructor() { }

  ngOnInit() {
  }

}
