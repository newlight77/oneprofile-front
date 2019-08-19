## Ngx-markdown

We have seen in previous steps how to use at third party package with Bootstrap. Now are going to add another one : ngx-markdown. `ngx-markdown` is an Angular library that uses marked to parse markdown to html combined with Prism.js for syntax highlight.

To add ngx-markdown library to your package.json use the following command.

```sh
npm install ngx-markdown --save
```

As the library is using marked parser we will need to add node_modules/marked/lib/marked.js to the application.
Let's add this in the angular.json file :

```json
"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism-okaidia.css"
],
"scripts": [
+ "node_modules/marked/lib/marked.js"
]
```

### Prism

To activate Prism.js syntax highlight, you will need to include :

- prism.js core library - node_modules/prismjs/prism.js file
- a highlight css theme - from node_modules/prismjs/themes directory
- desired code language syntax files - from node_modules/prismjs/components directory

Additional themes can be found by browsing the web such as Prism-Themes or Mokokai for example.

Let's add this in the angular.json file :

```json
"styles": [
    "styles.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
+    "node_modules/prismjs/themes/prism-okaidia.css",
+    "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css",
+    "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css"

],"scripts": [
    "node_modules/marked/lib/marked.js"
+    "node_modules/prismjs/prism.js",
+    "node_modules/prismjs/components/prism-bash.js",
+    "node_modules/prismjs/components/prism-css.js",
+    "node_modules/prismjs/components/prism-csharp.js",
+    "node_modules/prismjs/components/prism-gherkin.js",
+    "node_modules/prismjs/components/prism-javascript.js",
+    "node_modules/prismjs/components/prism-java.js",
+    "node_modules/prismjs/components/prism-ruby.js",
+    "node_modules/prismjs/components/prism-python.js",
+    "node_modules/prismjs/components/prism-typescript.js",
+    "node_modules/prismjs/components/prism-yaml.js",
+    "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js",
+    "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js"
]
```

### Import MarkdownModule

Once installed we need to import our main module.

```ts
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  ...
  imports: [MarkdownModule.forRoot({ loader: HttpClient }),
  ...
  ],
  ...
})
export class AppModule {
}
```

Here we import the Markdown module for Root with HttpClient. That way, if we want to use the [src] attribute to directly load a remote file, in order to keep only one instance of HttpClient and avoid issues with interceptors, we have provided the HttpClient.

It's not over yet. We need to make that module reachable by the component in which we want to use the markdown component or directive. The best place is to import that module in the SharedModule, as it is meant to imported by the any other module, and export it so that it can be seen. 

Let's edit the SharedModule.

```ts
...
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ],
  exports: [
    MarkdownModule
  ]
})
export class SharedModule { }
```

In our case, we want to use the markdown component in the HomeCommunityPage. Now we can use the markdown.

### HomeCommunityPage

We are going to display content of the Community page from a markdown file.

First, let's create the markdown.

```sh
touch ./src/assets/contents/home/community.md
```

And edit it :

```md
### Open Community

The term "open" for an open community refers to the opportunity for anyone - from the community - to join and contribute to the collaborative effort.

The resulting work is made available to everyone - the commuon platform, and continuously add useful things and improve it together to respond to the steadily changing IT.
```

Now let's edit the CommunityPageComponent html and replace everything by this :

```html
<markdown src="{{mdPath}}" (load)="onLoad($event)" (error)="onError($event)"></markdown>
```

We are going to add 2 methods in the class:

```ts
  mdPath = 'assets/contents/home/community.md';

  constructor() { }

  ...

  onLoad(event) {
  }

  onError(event) {
  }
```

Now Community page is display content form the markdown, we need to have a look at tests. Actually, the HomeCommunityPageComponent test is failing. Of course, as we use the `<markdown>` tag, we need to configure the TestBed to import required modules to make the test pas :

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
      declarations: [ HomeCommunityPageComponent ],
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

Ok we are done for this part.

### Why Markown

[Markdown](http://en.wikipedia.org/wiki/Markdown) uses a very simple formatting syntax to accomplish the same thing that HTML or Rich Text Formatting does. The difference is that it's simpler than HTML and you don't have to worry about opening and closing tags.To format text, Markdown uses punctuation and characters you're already familiar with.

At its core, Markdown is a super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text. It was originally designed to be an easy alternative to HTML, and allows people to create web pages with no HTML experience—but it's also a great way to organize notes, to-do lists, and other things. It has all the advantages of plain text, but with the organizational power of a word processor. The end goal is a minimalist writing system that you can use to get your thoughts down, and then export them elsewhere without worrying too much about the appearance.

Markdown was initially created by John Gruber (of Daring Fireball) as a simple way for non-programming types to write in an easy-to-read format that could be converted directly into HTML.
