## Dojo Components

Now it is time to implement the Blog module and pages. In this section, we want to display a list of articles in form of box like we have for kata statements, then display the article as a whole form markdown.

Let's start generating the dojo modules with it's pages.

```sh
ng g module blog --routing
```

This generated a module with routing. Once the module is created, we want to add this module to the AppRoutingModule route.

```ts
...
export const routes: Routes = [
...
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
+  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
...
];

export class AppRoutingModule { }
```

And in the BlogModule, we need to import the SharedModule and MaterialModule.

Now let's generate 2 components for the blog page. Frist one is the home to show the menu and the second to show the list of articles, so we can display artibles per category or tag, and search with key words

```sh
ng g component blog/blog-page --module=blog
ng g component blog/blog-articles-page --module=blog
```

Angular CLI would automatically declare it in the BlogModule. Next, we are going to declare the routes for the new pages in BlogRoutingModule:

```ts
...
import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

export const routes: Routes = [
  { path: '', component: BlogPageComponent,
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'blog', component: BlogArticlesPageComponent },
      { path: 'categories/:catogory', component: BlogArticlesPageComponent},
      { path: 'tags/:tag', component: BlogArticlesPageComponent },
      { path: 'search/:searchKeyWord', component: BlogArticlesPageComponent },
      { path: 'articles/:article', component: MarkdownComponent, data: { markdown: 'blog/articles/' } },
    ]
  }
];
```

### BlogPage

Let's add a mat-tab-nav-bar int the BlogPage, so it display a sub menu like we have in DojoPage. We use `mat-align-tabs="center"` to center this tab menu, same as for dojo pages. This menu will allow to display artibles per category, tag, and search by key words.

```ts
<div class="nav-container">
    <nav mat-tab-nav-bar mat-align-tabs="center" class='nav-bar-tabs'>
      <a mat-tab-link routerLink="search" routerLinkActive class='nav-bar-tab-link-search'>
        <mat-icon aria-label="Menu" class="material-icons">search</mat-icon>
        <span class="flex-spacer"></span>
        Search
      </a>
    </nav>
    <span class="flex-spacer"></span>

    <div class="content-container">
      <router-outlet></router-outlet>
    </div>
  </div>
```

Also, we display icons next to the label of the search option, but it's sticks to close to the title. We add a flex-spacer to have a little space between them.

Then, we need to add some css, just the same guides pages :

```css
.flex-spacer {
    padding-left: 0.5em;
}

nav {
    margin-top: -16px;
    margin-bottom: -16px;
}
```

Also, here is the code for the component class :

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  articles = ARTICLES;

  constructor() { }

  ngOnInit() {
  }
}
```

### BlogArticlesComponent

When go to the url `blog/categories`, we display the BlogArticlesComponents view, and retrive from the route, the last of the path `categories`. With that value, we sort the articles per categories. The same logic goes for `tags` and `authors`.

To get that behavior, we are going to have the html and class as followed :

```html

```

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogArticlesPageComponent implements OnInit {

  articles = ARTICLES;

  constructor() { }

  ngOnInit() {
  }
}
```

### Blog Module

We need to import what is required to make these pages work as expected.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
+import { SharedModule} from '../shared/shared.module';
+import { MaterialModule} from '../shared/material.module';

+import { BlogRoutingModule } from './blog-routing.module';
+import { BlogPageComponent } from '../blog/blog-page/blog-page.component';


@NgModule({
  declarations: [
    BlogPageComponent
  ],
  imports: [
    CommonModule,
+    SharedModule,
+    MaterialModule,
+    BlogRoutingModule
  ]
})
export class KitsModule { }

```

As we are using material components, we need to import the material module, and as well the Shared module that comes with others modules such as the MarkdownModule. We are going to dis display content from markdown files later.

### Markdown files

To make the created pages work, the markdown files have to be present under ./src/assets :

```sh
mkdir ./src/assets/blog
touch ./src/assets/blog/dojo-kata1.md
touch ./src/assets/blog/dojo-kata2.md
touch ./src/assets/blog/dojo-kata3.md
```

### Navigation update

The nav bar routerlinks must be updated :

```html
...
  <mat-toolbar id="appToolbar" class="mat-elevation-z6" color="primary">
...
    <button id="button-guides" mat-button routerLink="guides">Guides</button>
    <button id="button-kits" mat-button routerLink="kits">Kits</button>
    <button id="button-lab" mat-button routerLink="dojo">Dojo</button>
+    <button id="button-lab" mat-button routerLink="dojo">Blog</button>
    <button id="button-blog" mat-button routerLink="blog">Login</button>
...

</mat-sidenav-container>
```

### Testing BlogPageModule

Let's make sure the test is passing. Here we have used material so we need to import materiel module in the TestBed.

```ts

...
+ import { RouterTestingModule } from '@angular/router/testing';
+ import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+ import { MaterialModule } from '../../shared/material.module';
...

describe('BlogPageComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
 +     imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
...
     })
    .compileComponents();
  }));
```

With that in place, the test pass again.

But let's add a test to check if the tab menu is present:

```ts

  it('should display tab menus', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const title = compiled.querySelector('div.nav-container>nav');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Search');
  });
});
```

Now we are done with this blog page to display a meu allowing to list articles by categoy or by tag, and search by a key work. We will enrich the BlogArticlePageComponent with logic to dispplay articles as a list.
