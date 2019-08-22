import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

import { ICONS } from '../../shared/icons.model';

type PaneType = 'left' | 'right';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('right', style({
        transform: 'translate3d(-50%, 0, 0)'
      })),
      state('left', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('left => right', animate('400ms ease-in-out')),
      transition('right => left', animate('400ms ease-in-out'))
    ]),
  ]
})
export class LeftPanelComponent implements OnInit {

  icons = ICONS;
  panelState: PaneType = 'left';

  constructor() { }

  ngOnInit() {
  }

  togglePanel() {
    this.panelState = this.panelState === 'left' ? 'right' : 'left';
  }
}
