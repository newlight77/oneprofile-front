import { Component, OnInit } from '@angular/core';
import { Event, UPCOMING_EVENTS } from '../home.model';


@Component({
  selector: 'app-home-events-page',
  templateUrl: './home-events-page.component.html',
  styleUrls: ['./home-events-page.component.scss']
})
export class HomeEventsPageComponent implements OnInit {

  events = UPCOMING_EVENTS;

  constructor() { }

  ngOnInit() {
  }

  getEndTime(event: Event): number {
    return event.date.getTime() + event.duration * 60000;
  }

}
