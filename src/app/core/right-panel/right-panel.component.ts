import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { Event, UPCOMING_EVENTS } from '../../shared/events.model';

type PaneType = 'left' | 'right';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('right', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('left', style({
        transform: 'translate3d(50%, 0, 0)'
      })),
      transition('left => right', animate('400ms ease-in-out')),
      transition('right => left', animate('400ms ease-in-out'))
    ]),
  ]
})
export class RightPanelComponent implements OnInit {

  events = UPCOMING_EVENTS;
  panelState: PaneType = 'right';

  constructor() { }

  ngOnInit() {
  }

  getEndTime(event: Event): number {
    return event.date.getTime() + event.duration * 60000;
  }

  togglePanel() {
    this.panelState = this.panelState === 'left' ? 'right' : 'left';
  }
}
