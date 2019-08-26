### Displaying Articles from Markdown

Here we are going to update the BlogArticlePageComponent to display the content of articles from markdown files. Let's start wit the html :

```html

-<div class="article-container" *ngFor="let article of articles" routerLink="{{article.markdown}}" routerLinkActive>
+<div class="article-container" *ngFor="let article of articles" routerLink="articles/{{article.markdown}}" routerLinkActive>
   <span class="flex-spacer"></span>

   <div class="article-card">
     <mat-card>
       <mat-card-header class="article-card-header">
         <mat-card-title class="article-card-title">{{article.title}}</mat-card-title>
+        <mat-card-subtitle class="article-card-title"><b>Tags</b> : {{article.tags}}</mat-card-subtitle>
       </mat-card-header>
       <mat-card-content class="article-card-content">
```

We have add a prefix `articles` of the routerlink to `articles/{{article.markdown}}`, simply because we are `/blog` and in the BlogRoutingModule we had defined this rout `/blog/articles/markdown-article`.

```ts
       { path: '', component: BlogArticlesPageComponent },
       { path: 'search/:searchKeyWord', component: BlogArticlesPageComponent },
-      { path: 'articles/:article', component: MarkdownComponent, data: { markdown: 'blog/articles/' } }
+      { path: 'articles/:statement', component: MarkdownComponent, data: { markdown: 'blog/articles/' } }
     ]
```

Now the route is correctly set, we can reach the article. However, the attributes `markdown` and `summary` do not exist. We made a mistake in there. Let's correct the Article class :

```ts
     categories = new Array();
     tags = new Array();
-    content = '';
+    sommary = '';
+    markdown = '';

...

 export const ARTICLES: Array<Article> = [
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
+    { id: '2018-08-27-design-patterns', title: 'Design patterns by example', categories: 'design patterns'.split(','), tags: 'java, spring, design patterns'.split(','), author: 'Kong To', sommary: 'Design patterns are considered as good practices as they are generic, repeatable and re-usable solutions in software design. They aims to describe how problems could be solved in a commonly known pattern so it will easy the understanding.', markdown: '2018-08-27-design-patterns'  },
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
+    { id: '2018-08-28-RESTful-web-services', title: 'RESTful web services explained', categories: 'architecture, java'.split(','), tags: 'jest, spring, unit test, rest'.split(','), author: 'Kong To', sommary: 'Nowadways, most of backend services provides REST APIs for client such as frontend applications to consume. Therefore, it is very important to understand what it defines and how to implement RESTful web services or to consume them properly and more effiently.', markdown: '2018-08-28-RESTful-web-services'  },
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
+    { id: '2018-08-29-RESTful-json-patch-by-example', title: 'RESTful json-patch by example', categories: 'architecture, java'.split(','), tags: 'spring, java, rest'.split(','), author: 'Kong To', sommary: 'JSON Patch is a format for describing changes to a JSON document. It can be used to avoid sending a whole document when only a part has changed.', markdown: '2018-08-29-RESTful-json-patch-by-example'  },
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata4', title: 'Coding Dojo & Kata4', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, stupid, linux, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
+    { id: '2018-09-06-springboot-test-disable-security', title: 'How to test endpoints with Springboot by disabling security', categories: 'java, security'.split(','), tags: 'java, spring security, unit test, annotation, aspect'.split(','), author: 'Kong To', sommary: 'This article aims to show how to write tests when using springboot with security embedded.', markdown: '2018-09-06-springboot-test-disable-security' },
     // tslint:disable-next-line:max-line-length
-    { id: 'dojo-kata5', title: 'Coding Dojo & Kata5', categories: 'crafts, testing, agile'.split(','), tags: 'test, kata, crafts, tools, agile'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
+    { id: '2018-09-08-linux-shortcuts-keys', title: 'Linux shell shortcuts', categories: 'server'.split(','), tags: 'shell, linux, shortcuts'.split(','), author: 'Kong To', sommary: 'The shortcuts below may be of use, and they are quite useful to me.', markdown: '2018-09-08-linux-shortcuts-keys' },
 ];
```

Now articles objects are set properly with accurate information, but the markdown files aren't there. Let's add them :

```sh
mkdir ./src/assets/contents/blog/articles

touch ./src/assets/contents/blog/articles/2018-08-27-design-patterns
touch ./src/assets/contents/blog/articles/2018-08-28-RESTful-web-services
touch ./src/assets/contents/blog/articles/2018-08-29-RESTful-json-patch-by-example
touch ./src/assets/contents/blog/articles/2018-09-06-springboot-test-disable-security
touch ./src/assets/contents/blog/articles/2018-09-08-linux-shortcuts-keys
```

Of course, we need to add content inside each of the markdown. Now we should be able to display artiles from markdown files.

### Update ArticleService Test

As we have renamed the `content` attribute to `summary`, added `markdown` in the Article class, we just need to do the same in this ArticleService test.

```ts
  const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata1', markdown: '' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, agile'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata2', markdown: '' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', sommary: '## Coding Dojo & Kata3 keyword', markdown: '' },
  ];

-  it('should filter by keyword present in content', () => {
+  it('should filter by keyword present in sommary', () => {
     const service: ArticlesService = TestBed.get(ArticlesService);
     spyOn(service, 'articles').and.returnValue(ARTICLES);
     const articles = service.filterBySearchKeyword('keyw');

     expect(articles.length).toEqual(1);
-    expect(articles[0].content).toContain('keyword');
+    expect(articles[0].sommary).toContain('keyword');
```

### Cleanup

We notice there are unused types and code, so let's take the opportunity to clean that.

In the ArticleService class, remove unused types :

```ts
-import { Article, ListType, ARTICLES, TagCount, CategoryCount } from '../model/article';
+import { Article, ARTICLES, TagCount, CategoryCount } from '../model/article';
```

In the Article class, remove the ListType because we don't use it nowhere :

```ts
-export type ListType = 'default' | 'categories' | 'tags' | 'author';
```

In the BlogArticlePageComponent class, we can remove anything that is associated to the ListType :

```ts

-import { Article, ListType, TagCount, CategoryCount} from '../model/article';
+import { Article, TagCount, CategoryCount} from '../model/article';
 import { ArticlesService } from '../services/articles.service';

 @Component({
@@ -11,7 +11,6 @@ import { ArticlesService } from '../services/articles.service';
 })
 export class BlogArticlesPageComponent implements OnInit {

-  listType: ListType = 'default';
   tagCounts = [];
   categoryCounts = [];
...
   ngOnInit() {
-    this.listType = this.route.snapshot.data.listType;
-    if (this.route.snapshot.data.listType) {
-      this.listType = this.route.snapshot.data.listType;
-    }
-
     this.articles = this.articleService.articles();
```

That's it.
