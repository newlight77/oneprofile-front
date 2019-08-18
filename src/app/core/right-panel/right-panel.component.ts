import { Component, OnInit } from '@angular/core';
import { Event, UPCOMING_EVENTS } from '../../shared/events.model';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  events = UPCOMING_EVENTS;

  constructor() { }

  ngOnInit() {
  }

  getEndTime(event: Event): number {
    return event.date.getTime() + event.duration * 60000;
  }

}
