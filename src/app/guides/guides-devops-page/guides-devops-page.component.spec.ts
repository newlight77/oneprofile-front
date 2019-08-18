import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesDevopsPageComponent } from './guides-devops-page.component';

describe('GuidesDevopsPageComponent', () => {
  let component: GuidesDevopsPageComponent;
  let fixture: ComponentFixture<GuidesDevopsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesDevopsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesDevopsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
