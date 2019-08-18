import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesAngularPageComponent } from './guides-angular-page.component';

describe('GuidesAngularPageComponent', () => {
  let component: GuidesAngularPageComponent;
  let fixture: ComponentFixture<GuidesAngularPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesAngularPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesAngularPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
