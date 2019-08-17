import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { HomePageComponent } from './home-page.component';
import { Event } from '../home.model';


const EVENTS: Array<Event> = [
  { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
    title: 'Workshop : test', content: ''}
];

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ HomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
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
    // expect(compiled.querySelector('h1').textContent).toContain('Welcome to oneprofile');

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
