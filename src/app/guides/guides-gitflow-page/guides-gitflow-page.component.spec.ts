import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesGitflowPageComponent } from './guides-gitflow-page.component';

describe('GuidesGitflowPageComponent', () => {
  let component: GuidesGitflowPageComponent;
  let fixture: ComponentFixture<GuidesGitflowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesGitflowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesGitflowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
