import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { BlogArticlesPageComponent } from './blog-articles-page.component';

import { ArticlesService } from '../services/articles.service';

describe('BlogArticlesPageComponent', () => {
  let component: BlogArticlesPageComponent;
  let fixture: ComponentFixture<BlogArticlesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ BlogArticlesPageComponent ],
      providers: [ ArticlesService ]
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

  it('should display tab menus', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const tagTitle = compiled.querySelector('div.articles-tags');
    expect(tagTitle).toBeTruthy();
    expect(tagTitle.textContent).toContain('Tags');

    const cateogryTitle = compiled.querySelector('div.articles-categories');
    expect(cateogryTitle).toBeTruthy();
    expect(cateogryTitle.textContent).toContain('Categories');
  });
});
