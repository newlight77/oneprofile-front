import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesDeveloperPageComponent } from './guides-developer-page.component';

describe('GuidesDeveloperPageComponent', () => {
  let component: GuidesDeveloperPageComponent;
  let fixture: ComponentFixture<GuidesDeveloperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesDeveloperPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesDeveloperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
