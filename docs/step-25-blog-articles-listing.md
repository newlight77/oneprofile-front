## Blog Articles Listing

So fare we have routed the `/blog` to display the blog page with a menu to list of categories or tags, and search by a key work. Now we need to add some loggic the BlogArticlesPageComponent class to do that. But according to good practices, we don't want to have this specific login the the component, we want to decouple responsibilities. The component should be only responsible for the presentation and interaction with end-users. 

We can retrieve the articles data through this service, but we also need a model class to be able to interface with the component.

Let's create a model and a service to this logic on manipulating data.

```sh
ng g service blog/services/articles
ng g class blog/model/artice
```

### Article Model

```ts
export class Article {
    id = '';
    title = '';
    author = '';
    categories = new Array();
    tags = new Array();
    content = '';
}

export type ListType = 'default' | 'categories' | 'tags' | 'author';

export class TagCount {
    name: string;
    count: string;
}

export class CategoryCount {
    name: string;
    count: string;
}

export const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata4', title: 'Coding Dojo & Kata4', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, stupid, linux, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata5', title: 'Coding Dojo & Kata5', categories: 'crafts, testing, agile'.split(','), tags: 'test, kata, crafts, tools, agile'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
];
```

### Article Service

So we will expose these methods :

```ts
import { Injectable } from '@angular/core';

import { Article, ListType, ARTICLES, TagCount, CategoryCount } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  articles(): Array<Article> {
    return ARTICLES;
  }

  categories(): string {
    return this.articles()
      // Flattening to an array of tags as tring
      .reduce((acc, a: Article) => [...acc, ...a.categories], [])
      // stats with number per tag
      .reduce((acc: Array<any>, t: string) => {
        t = t.trim();
        acc[t] = acc[t] + 1 || 1;
        return acc;
      }, {});
  }

  tags(): any {
    return this.articles()
      // Flattening to an array of tags as tring
      .reduce((acc, a: Article) => [...acc, ...a.tags], [])
      // stats with number per tag
      .reduce((acc, t: string) => {
        t = t.trim();
        acc[t] = acc[t] + 1 || 1;
        return acc;
    }, {});
  }
}
```

### ArticleService Test

Let's test this new service class :

```ts
import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { Article, ListType } from '../model/article';


describe('ArticlesService', () => {

  const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, agile'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
  ];

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    expect(service).toBeTruthy();
  });

  it('should list all distinct tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const tags = service.tags();

    expect(tags['test']).toEqual(3);
    expect(tags['kata']).toEqual(3);
    expect(tags['clean code']).toEqual(1);
    expect(tags['solid']).toEqual(1);
    expect(tags['principles']).toEqual(1);
    expect(tags['kiss']).toEqual(1);
  });

  it('should list all distinct categories', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const categories = service.categories();

    expect(categories['crafts']).toEqual(3);
    expect(categories['testing']).toEqual(1);
    expect(categories['agile']).toEqual(1);
  });
});
```

To be able to test this service, we had to spy on it to mock the `articles` method so we can set a dataset for the articles, so then we can test the behavior of the `tags` and `categories` methodes.

### Using the service in BlogArticlesPageComponent

Then we can use it in the BlogArticlesPageComponent :

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article, ListType, TagCount, CategoryCount} from '../model/article';
import { ArticlesService } from '../services/articles.service';

...
export class BlogArticlesPageComponent implements OnInit {

  listType: ListType = 'default';
  tagCounts = [];
  categoryCounts = [];
  articles: Array<Article> = [];

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    this.listType = this.route.snapshot.data.listType;
    if (this.route.snapshot.data.listType) {
      this.listType = this.route.snapshot.data.listType;
    }

    this.articles = this.articleService.articles();

    const tags = this.articleService.tags();
    Object.getOwnPropertyNames(tags).forEach(t => {
      const tagCount = new TagCount();
      tagCount.name = t;
      tagCount.count = tags[t];
      console.log(`tagCount : ${tagCount.name} ${tagCount.count}`);
      this.tagCounts.push(tagCount);
    });

    const categories = this.articleService.categories();
    Object.getOwnPropertyNames(categories).forEach(c => {
      const categoryCount = new CategoryCount();
      categoryCount.name = c;
      categoryCount.count = categories[c];
      console.log(`tagCount : ${categoryCount.name} ${categoryCount.count}`);
      this.categoryCounts.push(categoryCount);
    });

    console.log(`tagCounts : ${this.tagCounts}`);
  }

}
```

Now let's add the html to display the pages with articles :

```html
<div class="row">
  <div class="col-12 col-xl-6">
    <div class="articles-tags">
      <div class="articles-row-title">Tags</div>
      <div class="tag-container" *ngFor="let tag of tagCounts" routerLink="{{tag}}" routerLinkActive>
        <div class="row">
          <div class="col-12 col-xl-9">{{tag.name}}</div>
          <div class="col-12 col-xl-3">{{tag.count}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-xl-6">
    <div class="articles-categories">
      <div class="articles-row-title">Categories</div>
      <div class="category-container" *ngFor="let category of categoryCounts" routerLink="{{category}}"
        routerLinkActive>
        <div class="row">
          <div class="col-12 col-xl-9">{{category.name}}</div>
          <div class="col-12 col-xl-3">{{category.count}}</div>
        </div>
      </div>
    </div>
  </div>
</div>

<hr>

<div class="article-container" *ngFor="let article of articles" routerLink="{{article.markdown}}" routerLinkActive>
  <span class="flex-spacer"></span>

  <div class="article-card">
    <mat-card>
      <mat-card-header class="article-card-header">
        <mat-card-title class="article-card-title">{{article.title}}</mat-card-title>
      </mat-card-header>
      <mat-card-content class="article-card-content">
        {{article.sommary}}
      </mat-card-content>
    </mat-card>
  </div>

  <span class="flex-spacer"></span>
</div>

```

And to complete this, let's add some styles :

```css
.articles-row-title {
  // color: #4D4D4D;
  font-weight: 500;
  font-size:130%;
  text-align: center;
}

.tag-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.category-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.flex-spacer {
  padding-left: 0.3em;
}

.article-container {
  display: block;
  box-sizing: border-box;
}

.article-card {
  box-shadow: 0 1px 1px 0 rgb(0, 0, 0, .10), 0 1px 1px 0 rgb(0, 0, 0, .12);
}

.article-card-header {
  margin-top: 10px;
  margin-bottom: 10px;
}

.article-card-title {
  background-color: #00915A; //fallback default color
  background-color: var(--theme-color);
  color: #111;
  color: var(--theme-color);
}

.article-card-content {
  margin-top: 10px;
  margin-bottom: 10px;
}
```

### Testing BlogArticlesPageComponent

```ts
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

    const tagTitle = compiled.querySelector('div.articles-tags>div.articles-row-title');
    expect(tagTitle).toBeTruthy();
    expect(tagTitle.textContent).toContain('Tags');

    const cateogryTitle = compiled.querySelector('div.articles-categories>div.articles-row-title');
    expect(cateogryTitle).toBeTruthy();
    expect(cateogryTitle.textContent).toContain('Categories');
  });
});
```

### Next Step

This part is a bit too long to achieve, so we stop here and leave the rest for later. The work we have done until now for the blog section is missing the possibility to :

- display articles filtered by a tag or a category : when we click on a tag or category from the list at the top of the articles page, only articles having that tag or category is displayed.

- display an article when we click on an article item from the list.

- filter by a keyword the list of articles: with a keyword, only articles containing that keyword is displayed.
