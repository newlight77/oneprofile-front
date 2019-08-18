import { Component, OnInit } from '@angular/core';
import { ICONS } from '../../shared/icons.model';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  icons = ICONS;
  constructor() { }

  ngOnInit() {
  }

}
