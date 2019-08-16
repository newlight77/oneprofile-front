import { Component, OnInit } from '@angular/core';
import { Event, UPCOMING_EVENTS } from '../home.model';
import { ICONS } from '../../shared/icons.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  icons = ICONS;
  events = UPCOMING_EVENTS;

  constructor() { }

  ngOnInit() { }

  getEndTime(event: Event): number {
    return event.date.getTime() + event.duration * 60000;
  }
}
