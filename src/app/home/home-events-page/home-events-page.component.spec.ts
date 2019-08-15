import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventsPageComponent } from './home-events-page.component';

describe('HomeEventsPageComponent', () => {
  let component: HomeEventsPageComponent;
  let fixture: ComponentFixture<HomeEventsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEventsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
