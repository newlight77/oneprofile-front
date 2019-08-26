## Filtering Blog Articles by Search Keyword

Instead of having a search menu, now we can simply add filtering fied to filter articles using a keyword. So first we add the filter field at the top of the html file :

```html
<nav mat-tab-nav-bar mat-align-tabs="center" class='nav-bar-tabs'>
  <div >
    <mat-form-field class="nav-bar-filter">
      <input matInput type="text" (keyup)="filterBySearchKeyword($event.target.value)" placeholder="Filter">
    </mat-form-field>
  </div>
</nav>

<span class="flex-spacer"></span>
```

Here we use the keyup event to apply the filter. And we add a little style in the css :

```css
+nav {
+  margin-top: 10px;
+  margin-bottom: 10px;
+}
+
 .articles-row-title {
```

So we need to implement the method called by the html :

```ts
  filterBySearchKeyword = (keyword: string) => {
    this.articles = this.articleService.filterBySearchKeyword(keyword);
  }
```

But we do just the same as before, we delegate the logic of filtering the article service class :

```ts
  filterBySearchKeyword(keyword: string): Array<Article> {
    return this.articles().filter(a => {
       return a.title.toLowerCase().includes(keyword.toLowerCase())
       || a.author.toLowerCase().includes(keyword.toLowerCase())
       || a.content.toLowerCase().includes(keyword.toLowerCase())
       || a.tags.toString().toLowerCase().includes(keyword.toLowerCase())
       || a.categories.toString().toLowerCase().includes(keyword.toLowerCase())
       ;
    });
  }
```

### Update Unit Tests

It's time to add a few unit tests in the service class :

```ts
  it('should filter by keyword present in title', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterBySearchKeyword('Kata3');

    expect(articles.length).toEqual(1);
    expect(articles[0].title.trim()).toContain('Kata3');
  });

  it('should filter by keyword present in tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterBySearchKeyword('kis');

    expect(articles.length).toEqual(1);
    expect(articles[0].tags[4]).toContain('kiss');
  });

  it('should filter by keyword present in content', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterBySearchKeyword('keyw');

    expect(articles.length).toEqual(1);
    expect(articles[0].content).toContain('keyword');
  });
```

### BlogPageComponent Update

Now we have replace the search button by a filter field in the nav bar, and the nav bar is moved to the BlogArticlesPageComponent. So the BlogPageComponent's html has changed :

```html
 <div class="nav-container">
-  <nav mat-tab-nav-bar mat-align-tabs="center" class='nav-bar-tabs'>
-    <a mat-tab-link routerLink="search" routerLinkActive class='nav-bar-tab-link-search'>
-      <mat-icon aria-label="Menu" class="material-icons">search</mat-icon>
-      <span class="flex-spacer"></span>
-      Search
-    </a>
-  </nav>
-  <span class="flex-spacer"></span>
-
   <div class="content-container">
     <router-outlet></router-outlet>
   </div>
```

As a consequence, the test also changed. We need to remove the test that verify the presence of search menu : 

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { BlogPageComponent } from './blog-page.component';

describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let fixture: ComponentFixture<BlogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ BlogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
```
