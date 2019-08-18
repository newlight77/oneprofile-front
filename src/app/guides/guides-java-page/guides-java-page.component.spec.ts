import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesJavaPageComponent } from './guides-java-page.component';

describe('GuidesJavaPageComponent', () => {
  let component: GuidesJavaPageComponent;
  let fixture: ComponentFixture<GuidesJavaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesJavaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesJavaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
