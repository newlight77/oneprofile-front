## Displaying Guides Contents

Now the guides components and it's navigation is working well, we can add some contents to the guides pages. Here all guides are static, we are going to use `ngx-markdonw` do display contents from markdown files.

We have these pages to work on :

- Developer
- DevOps
- Gitflow
- Angular
- Java

As we had already imported the MarkdownModel in the AppModule and SharedModule, we can just go directly to the components where we need to use the `<markdown>` tag;

### Developer

Now let's edit the GuidesDeveloperComponent html and replace everything by this :

```html
<markdown src="{{mdPath}}"></markdown>
```

We are going to declare an attribute to set the path to markdown files:

```ts
  mdPath = 'assets/contents/guides/developer.md';

  constructor() { }
  ...
```

Now the guides's deverloper page is display content form the markdown, we need to have a look at tests. Actually, the GuidesDeveloperComponent test is failing. Of course, as we use the `<markdown>` tag, we need to configure the TestBed to import required modules to make the test pas :

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
+import { HttpClient, HttpClientModule } from '@angular/common/http';
+import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';
...
    TestBed.configureTestingModule({
      imports: [
+        HttpClientModule,
+        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      declarations: [ GuidesDeveloperComponent ],
      providers: [
+        MarkdownService,
+        MarkedOptions
      ]
```

Now the test is passing again. But to be able to assert the content of the html.

Now let's add a test :

```ts
  it('should containt markdown in html', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('markdown');
    expect(title).toBeTruthy();
  });
```

But wait, the markdown file is not there, so the page can't be displayed. Let's create that file and edit it :

```sh
mkdir ./src/assets/contents/guides
touch ./src/assets/contents/guides/developer.md
```

```md
## Developer's guide
```

Ok we are done for this page.

### DevOps

We can repeat the same steps as for this GuidesDeveloperComponoent.

### Gitflow

We can repeat the same steps as for this GuidesDeveloperComponoent.

### Angular

We can repeat the same steps as for this GuidesDeveloperComponoent.

### Java

We can repeat the same steps as for this GuidesDeveloperComponoent.

We are done with all these guides. We'll fill the content of them later.

