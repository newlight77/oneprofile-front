import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { RightPanelComponent } from './right-panel.component';
import { Event } from '../../shared/events.model';

const EVENTS: Array<Event> = [
  { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
    title: 'Workshop : test', content: ''}
];

describe('RightPanelComponent', () => {
  let component: RightPanelComponent;
  let fixture: ComponentFixture<RightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ RightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display events', () => {
    component.events = EVENTS;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const title = compiled.querySelector('mat-card-content>div>div.event-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toEqual('Workshop : test');

    const date = compiled.querySelector('mat-card-content>div>div.event-date');
    expect(date).toBeTruthy();
    expect(date.textContent).toContain('Mon, 09 9 14:30 - 15:30');

    const author = compiled.querySelector('mat-card-content>div>div.event-author');
    expect(author).toBeTruthy();
    expect(author.textContent).toEqual('Kong To @ Paris');

  });
});
