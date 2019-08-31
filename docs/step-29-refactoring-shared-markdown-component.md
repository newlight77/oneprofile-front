## Refactoring the Share MarkdownComponent

There are many small reasons we want to make changes to the MarkdownComponent. They are really small changes, but we still want to do it because it makes sense. Let's have a look at the actual code of the MarkdownComponent class :

```ts
ngOnInit() {
    const markdown = this.route.snapshot.data.markdown;
    this.mdPath = this.mdRootDir + markdown;
    if (this.route.snapshot.params.statement) {
      this.mdPath = this.mdPath + this.route.snapshot.params.statement;
    }
    this.mdPath = this.mdPath + '.md';
  }
```

We would like to have this :

```ts
ngOnInit() {
    if (this.route.snapshot.data.mdSubDir) {
      this.mdPath = this.mdRootDir + this.route.snapshot.data.mdSubDir;
    }
    if (this.route.snapshot.data.mdFilename) {
      this.mdPath = this.mdPath + this.route.snapshot.data.mdFilename;
    } else if (this.route.snapshot.params.mdFilename) {
      this.mdPath = this.mdPath + this.route.snapshot.params.mdFilename;
    }
    this.mdPath = this.mdPath + '.md';
  }
}
```

With the new code, we want to allow the caller to pass through the route data the `mdSubDir` and `mdFilename`, because we realise that in some case, we don't use route params at all.

As an example, let's have a look at the DojoRoutingModule :

```ts
export const routes: Routes = [
  { path: '', component: DojoPageComponent,
    children: [
      { path: '', redirectTo: 'guide', pathMatch: 'full' },
      { path: 'dojo', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'dojo' } },
      { path: 'statements', component: StatementsPageComponent, data: { mdSubDir: 'dojo/', mdFilename: 'statements' } },
      { path: 'statements/:mdFilename', component: MarkdownComponent, data: { mdSubDir: 'dojo/statements/' } },
      { path: 'bootstraps', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'bootstraps' } },
    ]
  }
];
```

The `/dojo/statements` rout is using the route `data.mdSubDir` and `data.mdFilename`, while the `/dojo/statements/mdFilename`, we don't have `data.mdFilename`.

This logic makes more sense. Let's compare the new code with the code before changes, :

```ts
     children: [
       { path: '', redirectTo: 'guide', pathMatch: 'full' },
-      { path: 'dojo', component: MarkdownComponent, data: { markdown: 'dojo/dojo' } },
-      { path: 'statements', component: StatementsPageComponent, data: { markdown: 'dojo/statements' } },
-      { path: 'statements/:statement', component: MarkdownComponent, data: { markdown: 'dojo/statements/' } },
-      { path: 'bootstraps', component: MarkdownComponent, data: { markdown: 'dojo/bootstraps' } },
+      { path: 'dojo', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'dojo' } },
+      { path: 'statements', component: StatementsPageComponent, data: { mdSubDir: 'dojo/', mdFilename: 'statements' } },
+      { path: 'statements/:mdFilename', component: MarkdownComponent, data: { mdSubDir: 'dojo/statements/' } },
+      { path: 'bootstraps', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'bootstraps' } },
     ]
   }
```

We see we had `statement` as a param. That is ok because in the Dojo section, we talk about statement. But what happens when we are at Kits, Guides, or Blog section? We had to use the `statement` name as it is required to be so in the MarkdownComponent. That's why we have to change it.

Now that we have changed the MarkdownComponent, we need to update the test so it can pass:

```ts
   it('should set mdPath from route', () => {
     const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
-    activatedRoute.snapshot.data = { markdown: 'developer-test-mdPath' };
-    activatedRoute.snapshot.params = { statement: 'statement-test' };
+    activatedRoute.snapshot.data = { mdSubDir: 'developer-test-mdPath' };
+    activatedRoute.snapshot.params = { mdFilename: 'statement-test' };
     component.ngOnInit();
```

### Apply the changes to the whole project

Here is the list of files that has changed :

```sh
	modified:   src/app/blog/blog-articles-page/blog-articles-page.component.html
	modified:   src/app/blog/blog-routing.module.ts
	modified:   src/app/blog/model/article.ts
	modified:   src/app/blog/services/articles.service.spec.ts
	modified:   src/app/dojo/dojo-routing.module.ts
	modified:   src/app/dojo/statements-page/statements-page.component.html
	modified:   src/app/dojo/statements-page/statements-page.component.ts
	modified:   src/app/guides/guides-page/guides-page.component.ts
	modified:   src/app/guides/guides-routing.module.ts
	modified:   src/app/home/home-routing.module.ts
	modified:   src/app/kits/kits-page/kits-page.component.ts
	modified:   src/app/kits/kits-routing.module.ts
	modified:   src/app/shared/markdown/markdown.component.spec.ts
	modified:   src/app/shared/markdown/markdown.component.ts
```

We can skip reading below as it's very repeatitive. It can serve as guidance if we find ourselves lost in the process. 

### Per file changes - [may be skipped]

KitsRoutingModule :

```ts
   { path: '', component: KitsPageComponent,
     children: [
       { path: '', redirectTo: 'developer', pathMatch: 'full' },
-      { path: 'developer', component: MarkdownComponent, data: { markdown: 'kits/developer' } },
-      { path: 'ci', component: MarkdownComponent, data: { markdown: 'kits/ci' } },
-      { path: 'cd', component: MarkdownComponent, data: { markdown: 'kits/cd' } },
-      { path: 'java', component: MarkdownComponent, data: { markdown: 'kits/java' } },
-      { path: 'angular', component: MarkdownComponent, data: { markdown: 'kits/angular' } },
+      { path: 'developer', component: MarkdownComponent, data: { mdSubDir: 'kits/', mdFilename: 'developer' } },
+      { path: 'ci', component: MarkdownComponent, data: { mdSubDir: 'kits/', mdFilename: 'cd' } },
+      { path: 'cd', component: MarkdownComponent, data: { mdSubDir: 'kits/', mdFilename: 'cd' } },
+      { path: 'java', component: MarkdownComponent, data: { mdSubDir: 'kits/', mdFilename: 'java' } },
+      { path: 'angular', component: MarkdownComponent, data: { mdSubDir: 'kits/', mdFilename: 'angular' } },
     ]
   }
 ];
```

KitsPageComponent :

```ts

   primary: Array<Menu> = [
-    { id: 'developer', title: 'Developer', icon: 'build', mdParth: 'assets/contents/kits/developer.md' },
-    { id: 'ci', title: 'CI', icon: 'build', mdParth: 'assets/contents/kits/ci.md' },
-    { id: 'cd', title: 'CD', icon: 'build', mdParth: 'assets/contents/kits/cd.md' },
+    { id: 'developer', title: 'Developer', icon: 'build' },
+    { id: 'ci', title: 'CI', icon: 'build' },
+    { id: 'cd', title: 'CD', icon: 'build' },
   ];

   secondary: Array<Menu> = [
-    { id: 'angular', title: 'Angular', icon: 'code', mdParth: 'assets/contents/kits/angular.md' },
-    { id: 'java', title: 'Java', icon: 'code', mdParth: 'assets/contents/kits/java.md' },
+    { id: 'angular', title: 'Angular', icon: 'code' },
+    { id: 'java', title: 'Java', icon: 'code' },
   ];
```

HomeComoponent :

```ts
       { path: '', redirectTo: 'landing', pathMatch: 'full' },
       { path: 'landing', component: HomeLandingPageComponent, pathMatch: 'full' },
-      { path: 'community', component: MarkdownComponent, pathMatch: 'full', data: {markdown: 'home/community'} },
+      { path: 'community', component: MarkdownComponent, pathMatch: 'full', data: { mdSubDir: 'home/', mdFilename: 'community' } }
```

GuidesRoutingModule :

```ts
   { path: '', component: GuidesPageComponent,
     children: [
       { path: '', redirectTo: 'developer', pathMatch: 'full' },
-      { path: 'developer', component: MarkdownComponent, data: {markdown: 'guides/developer'} },
-      { path: 'devops', component: MarkdownComponent, data: {markdown: 'guides/devops'} },
-      { path: 'gitflow', component: MarkdownComponent, data: {markdown: 'guides/gitflow'} },
-      { path: 'angular', component: MarkdownComponent, data: {markdown: 'guides/angular'} },
-      { path: 'java', component: MarkdownComponent, data: {markdown: 'guides/java'} },
+      { path: 'developer', component: MarkdownComponent, data: { mdSubDir: 'guides/', mdFilename: 'developer'} },
+      { path: 'devops', component: MarkdownComponent, data: { mdSubDir: 'guides/', mdFilename: 'devops'} },
+      { path: 'gitflow', component: MarkdownComponent, data: { mdSubDir: 'guides/', mdFilename: 'gitflow'} },
+      { path: 'angular', component: MarkdownComponent, data: { mdSubDir: 'guides/', mdFilename: 'angular'} },
+      { path: 'java', component: MarkdownComponent, data: { mdSubDir: 'guides/', mdFilename: 'java'} },
     ],
```

GuidesPageComponent :

```ts
   primary: Array<Menu> = [
-    { id: 'developer', title: 'Developer', icon: 'person', mdParth: 'assets/contents/guides/developer.md' },
-    { id: 'devops', title: 'DevOps', icon: 'build', mdParth: 'assets/contents/guides/devops.md' },
-    { id: 'gitflow', title: 'Gitflow', icon: 'track_changes', mdParth: 'assets/contents/guides/gitflow.md' },
+    { id: 'developer', title: 'Developer', icon: 'person' },
+    { id: 'devops', title: 'DevOps', icon: 'build' },
+    { id: 'gitflow', title: 'Gitflow', icon: 'track_changes' },
   ];

   secondary: Array<Menu> = [
-    { id: 'angular', title: 'Angular', icon: 'code', mdParth: 'assets/contents/guides/angular.md' },
-    { id: 'java', title: 'Java', icon: 'code', mdParth: 'assets/contents/guides/java.md' },
+    { id: 'angular', title: 'Angular', icon: 'code' },
+    { id: 'java', title: 'Java', icon: 'code' },
   ];
```

DojoRoutingModule :

```ts
   { path: '', component: DojoPageComponent,
     children: [
       { path: '', redirectTo: 'guide', pathMatch: 'full' },
-      { path: 'dojo', component: MarkdownComponent, data: { markdown: 'dojo/dojo' } },
-      { path: 'statements', component: StatementsPageComponent, data: { markdown: 'dojo/statements' } },
-      { path: 'statements/:statement', component: MarkdownComponent, data: { markdown: 'dojo/statements/' } },
-      { path: 'bootstraps', component: MarkdownComponent, data: { markdown: 'dojo/bootstraps' } },
+      { path: 'dojo', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'dojo' } },
+      { path: 'statements', component: StatementsPageComponent, data: { mdSubDir: 'dojo/', mdFilename: 'statements' } },
+      { path: 'statements/:mdFilename', component: MarkdownComponent, data: { mdSubDir: 'dojo/statements/' } },
+      { path: 'bootstraps', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'bootstraps' } },
     ]
   }
 ];
```

Dojo StatementPageComponent :

```ts
       sommary: 'Create a program, which, given a valid sequence of rolls for one line of American Ten-Pin Bowling, produces the total score for the game.',
-      markdown: 'bowling' },
+      mdFilename: 'bowling' },
     { title: 'Pizza Factory',
       sommary: 'Create a program which which acts as a pizzeria, so that given an order from a customer, pizzas are made for delivery.',
-      markdown: 'pizza-factory' },
+      mdFilename: 'pizza-factory' },
   ];
```

```html
-<div class="statement-container" *ngFor="let statement of statements" routerLink="{{statement.markdown}}"
+<div class="statement-container" *ngFor="let statement of statements" routerLink="{{statement.mdFilename}}"
   routerLinkActive>
   <span class="flex-spacer"></span>
```

BlogRoutingModule :

```ts
       { path: '', component: BlogArticlesPageComponent },
       { path: 'search/:searchKeyWord', component: BlogArticlesPageComponent },
-      { path: 'articles/:statement', component: MarkdownComponent, data: { markdown: 'blog/articles/' } }
+      { path: 'articles/:mdFilename', component: MarkdownComponent, data: { mdSubDir: 'blog/articles/' } }
     ]
   }
```

BlogArticlesPageComponent :

```html

-<div class="article-container" *ngFor="let article of articles" routerLink="articles/{{article.markdown}}" routerLinkActive>
+<div class="article-container" *ngFor="let article of articles" routerLink="articles/{{article.mdFilename}}" routerLinkActive>
   <span class="flex-spacer"></span>
```

Article class :

```ts
 export const ARTICLES: Array<Article> = [
     // tslint:disable-next-line:max-line-length
-    { id: '2018-08-27-design-patterns', title: 'Design patterns by example', categories: 'design patterns'.split(','), tags: 'java, spring, design patterns'.split(','), author: 'Kong To', sommary: 'Design patterns are considered as good practices as they are generic, repeatable and re-usable solutions in software design. They aims to describe how problems could be solved in a commonly known pattern so it will easy the understanding.', markdown: '2018-08-27-design-patterns'  },
+    { id: '2018-08-27-design-patterns', title: 'Design patterns by example', categories: 'design patterns'.split(','), tags: 'java, spring, design patterns'.split(','), author: 'Kong To', sommary: 'Design patterns are considered as good practices as they are generic, repeatable and re-usable solutions in software design. They aims to describe how problems could be solved in a commonly known pattern so it will easy the understanding.', mdFilename: '2018-08-27-design-patterns'  },
     // tslint:disable-next-line:max-line-length
-    { id: '2018-08-28-RESTful-web-services', title: 'RESTful web services explained', categories: 'architecture, java'.split(','), tags: 'jest, spring, unit test, rest'.split(','), author: 'Kong To', sommary: 'Nowadways, most of backend services provides REST APIs for client such as frontend applications to consume. Therefore, it is very important to understand what it defines and how to implement RESTful web services or to consume them properly and more effiently.', markdown: '2018-08-28-RESTful-web-services'  },
+    { id: '2018-08-28-RESTful-web-services', title: 'RESTful web services explained', categories: 'architecture, java'.split(','), tags: 'jest, spring, unit test, rest'.split(','), author: 'Kong To', sommary: 'Nowadways, most of backend services provides REST APIs for client such as frontend applications to consume. Therefore, it is very important to understand what it defines and how to implement RESTful web services or to consume them properly and more effiently.', mdFilename: '2018-08-28-RESTful-web-services'  },
     // tslint:disable-next-line:max-line-length
-    { id: '2018-08-29-RESTful-json-patch-by-example', title: 'RESTful json-patch by example', categories: 'architecture, java'.split(','), tags: 'spring, java, rest'.split(','), author: 'Kong To', sommary: 'JSON Patch is a format for describing changes to a JSON document. It can be used to avoid sending a whole document when only a part has changed.', markdown: '2018-08-29-RESTful-json-patch-by-example'  },
+    { id: '2018-08-29-RESTful-json-patch-by-example', title: 'RESTful json-patch by example', categories: 'architecture, java'.split(','), tags: 'spring, java, rest'.split(','), author: 'Kong To', sommary: 'JSON Patch is a format for describing changes to a JSON document. It can be used to avoid sending a whole document when only a part has changed.', mdFilename: '2018-08-29-RESTful-json-patch-by-example'  },
     // tslint:disable-next-line:max-line-length
-    { id: '2018-09-06-springboot-test-disable-security', title: 'How to test endpoints with Springboot by disabling security', categories: 'java, security'.split(','), tags: 'java, spring security, unit test, annotation, aspect'.split(','), author: 'Kong To', sommary: 'This article aims to show how to write tests when using springboot with security embedded.', markdown: '2018-09-06-springboot-test-disable-security' },
+    { id: '2018-09-06-springboot-test-disable-security', title: 'How to test endpoints with Springboot by disabling security', categories: 'java, security'.split(','), tags: 'java, spring security, unit test, annotation, aspect'.split(','), author: 'Kong To', sommary: 'This article aims to show how to write tests when using springboot with security embedded.', mdFilename: '2018-09-06-springboot-test-disable-security' },
     // tslint:disable-next-line:max-line-length
-    { id: '2018-09-08-linux-shortcuts-keys', title: 'Linux shell shortcuts', categories: 'server'.split(','), tags: 'shell, linux, shortcuts'.split(','), author: 'Kong To', sommary: 'The shortcuts below may be of use, and they are quite useful to me.', markdown: '2018-09-08-linux-shortcuts-keys' },
+    { id: '2018-09-08-linux-shortcuts-keys', title: 'Linux shell shortcuts', categories: 'server'.split(','), tags: 'shell, linux, shortcuts'.split(','), author: 'Kong To', sommary: 'The shortcuts below may be of use, and they are quite useful to me.', mdFilename: '2018-09-08-linux-shortcuts-keys' },
 ];
```

ArticleService test :

```ts
   const ARTICLES: Array<Article> = [
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata1', markdown: '' },
+    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata1', mdFilename: '' },
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, agile'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata2', markdown: '' },
+    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, agile'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata2', mdFilename: '' },
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata3 keyword', markdown: '' },
+    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata3 keyword', mdFilename: '' },
   ];
```