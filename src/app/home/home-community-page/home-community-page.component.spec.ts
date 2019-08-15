import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommunityPageComponent } from './home-community-page.component';

describe('HomeCommunityPageComponent', () => {
  let component: HomeCommunityPageComponent;
  let fixture: ComponentFixture<HomeCommunityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCommunityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
