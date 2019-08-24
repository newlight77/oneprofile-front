import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticlesPageComponent } from './blog-articles-page.component';

describe('BlogArticlesPageComponent', () => {
  let component: BlogArticlesPageComponent;
  let fixture: ComponentFixture<BlogArticlesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogArticlesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
