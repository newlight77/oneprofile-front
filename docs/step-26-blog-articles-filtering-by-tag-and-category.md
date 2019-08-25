## Filtering Blog Articles

First, we realise that the way we have defined the routing is not the proper way. It would be just a lot easier to apply fitlers for tags and categories. 

Let's see what we have :

```ts
 export const routes: Routes = [
   { path: '', component: BlogPageComponent,
     children: [
-      { path: '', redirectTo: 'blog', pathMatch: 'full' },
-      { path: 'blog', component: BlogArticlesPageComponent },
-      { path: 'categories/:catogory', component: BlogArticlesPageComponent},
-      { path: 'tags/:tag', component: BlogArticlesPageComponent },
+      { path: '', component: BlogArticlesPageComponent },
       { path: 'search/:searchKeyWord', component: BlogArticlesPageComponent },
-      { path: 'articles/:article', component: MarkdownComponent, data: { markdown: 'blog/articles/' } },
+      { path: 'articles/:article', component: MarkdownComponent, data: { markdown: 'blog/articles/' } }
     ]
   }
```

When we click on on of the tag or category, the list fo articles is updated dynamically without re-routing. So we need to update the html to react on click :

```html
     <div class="articles-tags">
       <div class="articles-row-title">Tags</div>
-      <div class="tag-container" *ngFor="let tag of tagCounts" routerLink="{{tag}}" routerLinkActive>
+      <div class="tag-container" *ngFor="let tag of tagCounts" (click)="filterByTag(tag.name)">
         <div class="row">
           <div class="col-12 col-xl-9">{{tag.name}}</div>
...
   <div class="articles-row-title">Categories</div>
-      <div class="category-container" *ngFor="let category of categoryCounts" routerLink="{{category}}"
-        routerLinkActive>
+      <div class="category-container" *ngFor="let category of categoryCounts" (click)="filterByCategory(category.name)">
         <div class="row">
```

### BlogArticlesPageComponent Behavior

Now it's time to add the behavior of the component.

```ts

     this.articles = this.articleService.articles();
+    this.tagCounts = this.articleService.tagCounts();
+    this.categoryCounts = this.articleService.categoryCounts();
+  }
-    const tags = this.articleService.tags();
-    Object.getOwnPropertyNames(tags).forEach(t => {
-      const tagCount = new TagCount();
-      tagCount.name = t;
-      tagCount.count = tags[t];
-      this.tagCounts.push(tagCount);
-    });
-
-    const categories = this.articleService.categories();
-    Object.getOwnPropertyNames(categories).forEach(c => {
-      const categoryCount = new CategoryCount();
-      categoryCount.name = c;
-      categoryCount.count = categories[c];
-      this.categoryCounts.push(categoryCount);
-    });
+
+  filterByTag(tag: string) {
+    this.articles = this.articleService.filterByTag(tag);
+  }

+  filterByCategory(category: string) {
+    this.articles = this.articleService.filterByCategory(category);
   }
```

This the component class, we have done a bit of refactoring. We have move the logic of mapping (from PropertyNames to TagCount or CategoryCount objects) to the article service. And we also have delegate the logic of filtering in that service class.

```ts
-  categories(): string {
+  private categories(): string {
     return this.articles()
       // Flattening to an array of tags as tring
       .reduce((acc, a: Article) => [...acc, ...a.categories], [])
       }, {});
   }

-  tags(): any {
+  private tags(): any {
     return this.articles()
       // Flattening to an array of tags as tring
       .reduce((acc, a: Article) => [...acc, ...a.tags], [])
     }, {});
   }

+  tagCounts(): Array<TagCount> {
+    const tagCounts = [];
+    const tags = this.tags();
+    Object.getOwnPropertyNames(tags).forEach(t => {
+      tagCounts.push(new TagCount(t, tags[t]));
+    });
+    return tagCounts;
+  }
+
+  categoryCounts(): Array<CategoryCount> {
+    const categoryCounts = [];
+    const categories = this.categories();
+    Object.getOwnPropertyNames(categories).forEach(c => {
+      categoryCounts.push(new CategoryCount(c, categories[c]));
+    });
+    return categoryCounts;
+  }
+
+  filterByTag(tag: string): Array<Article> {
+    return this.articles().filter(a => {
+      return this.contains(a.tags, tag);
+    });
+  }
+
+  filterByCategory(category: string): Array<Article> {
+    return this.articles().filter(a => {
+      return this.contains(a.categories, category);
+    });
+  }
+
+  private contains(list: Array<string>, item: string) {
+    let filtered = false;
+    list.forEach(element => {
+      if (element.trim() === item) {
+        filtered = true;
+      }
+    });
+    return filtered;
+  }
```

We can notice, we have change the acessibility of `tags()` and `categories()` to private because we don't need them to be seen by other classes. We made also the `containts()` method private for the same reason.

In order to have a bit cleaner code, we have change the model classes to pass arguments by constructor :

```ts
export class TagCount {
     name: string;
-    count: string;
+    count: number;
+
+    constructor(name: string, count: number) {
+        this.name = name;
+        this.count = count;
+    }
 }

 export class CategoryCount {
     name: string;
-    count: string;
+    count: number;
+
+    constructor(name: string, count: number) {
+        this.name = name;
+        this.count = count;
+    }
 }
```

### Adding more tests for the service class

Finally, we can tackle all the testing part :

```ts
   it('should list all distinct tags', () => {
     const service: ArticlesService = TestBed.get(ArticlesService);
     spyOn(service, 'articles').and.returnValue(ARTICLES);
-    const tags = service.tags();
-
-    expect(tags['test']).toEqual(3);
-    expect(tags['kata']).toEqual(3);
-    expect(tags['clean code']).toEqual(1);
-    expect(tags['solid']).toEqual(1);
-    expect(tags['principles']).toEqual(1);
-    expect(tags['kiss']).toEqual(1);
+    const tags = service.tagCounts().sort();
+
+    expect(tags.length).toEqual(7);
+    expect(tags[0].name).toEqual('test');
+    expect(tags[0].count).toEqual(3);
+    expect(tags[1].name).toEqual('kata');
+    expect(tags[1].count).toEqual(3);
+    expect(tags[2].name).toEqual('crafts');
+    expect(tags[2].count).toEqual(3);
+    expect(tags[3].name).toEqual('solid');
+    expect(tags[3].count).toEqual(1);
+    expect(tags[4].name).toEqual('clean code');
+    expect(tags[4].count).toEqual(1);
+    expect(tags[5].name).toEqual('principles');
+    expect(tags[5].count).toEqual(1);
+    expect(tags[6].name).toEqual('kiss');
+    expect(tags[6].count).toEqual(1);
   });

   it('should list all distinct categories', () => {
     const service: ArticlesService = TestBed.get(ArticlesService);
     spyOn(service, 'articles').and.returnValue(ARTICLES);
-    const categories = service.categories();
+    const categories = service.categoryCounts().sort();
+
+    expect(categories.length).toEqual(3);
+    expect(categories[0].name).toEqual('crafts');
+    expect(categories[0].count).toEqual(3);
+    expect(categories[1].name).toEqual('testing');
+    expect(categories[1].count).toEqual(1);
+    expect(categories[2].name).toEqual('agile');
+    expect(categories[2].count).toEqual(1);
+  });
 });
```

The existing tests being updated and passed, we may want to add 2 more tests to couver the new logic of filtering :

```ts
  it('should filter tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterByTag('kiss');

    expect(articles.length).toEqual(1);
    expect(articles[0].tags[4].trim()).toEqual('kiss');
  });

  it('should filter categories', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterByCategory('agile');

    expect(articles.length).toEqual(1);
    expect(articles[0].categories[1].trim()).toEqual('agile');
  });
```

Now this being done. There still be one missing part : the filter by keyword.
