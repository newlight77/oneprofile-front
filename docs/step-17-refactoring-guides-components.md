## Refactoring Guides Components

Did you notice anything wrong at last step ?

There was repetitions. The 5 Guides' components are about the same. The HTML are exactly the same. The typescript classes are also the same, except for the mdPath attribute. That's it. Now what can we do about it ?

In fact we need only one more generic component to display all those 5 pages. Let's see first what we can do with Guides menu. We have this. That means we have also 5 `<mat-tab-link> that look very similar too.

We can refactor this part, we have this

```html
<span class="flex-spacer"></span>
  <nav mat-tab-nav-bar mat-align-tabs="center" class='nav-bar-primary'>
    <a mat-tab-link routerLink="developer" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">person</mat-icon>
      <span class="flex-spacer"></span>
      Developer
    </a>
    <a mat-tab-link routerLink="devops" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">build</mat-icon>
      <span class="flex-spacer"></span>
      DevOps
    </a>
    <a mat-tab-link routerLink="gitflow" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">track_changes</mat-icon>
      <span class="flex-spacer"></span>
      Gitflow
    </a>
  </nav>
  <nav mat-tab-nav-bar mat-align-tabs="center" class="nav-bar-secondary">
    <a mat-tab-link routerLink="angular" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">code</mat-icon>
      <span class="flex-spacer"></span>
      Angular
    </a>
    <a mat-tab-link routerLink="java" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">code</mat-icon>
      <span class="flex-spacer"></span>
      Java
    </a>
  </nav>
  <span class="flex-spacer"></span>
```

Now we are going to use `*ngFor`, so we replace the 5 links to this :

```html
<nav mat-tab-nav-bar mat-align-tabs="center" class='nav-bar-primary'>
    <a mat-tab-link *ngFor="let menu of primary" routerLink="{{menu.id}}" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">{{menu.icon}}</mat-icon>
      <span class="flex-spacer"></span>
      {{menu.title}}
      </a>
  </nav>
  <nav mat-tab-nav-bar mat-align-tabs="center" class="nav-bar-secondary">
    <a mat-tab-link *ngFor="let menu of secondary" routerLink="{{menu.id}}" routerLinkActive>
      <mat-icon aria-label="Menu" class="material-icons">{{menu.icon}}</mat-icon>
      <span class="flex-spacer"></span>
      {{menu.title}}
    </a>
  </nav>
```

Of course, those linksnow rely on an 2 attributes : `prmary` and `secondary` having id, icon and title. We need to declare that in the GuidesPageComponent class.

```ts
...
class Menu {
  id = '';
  title = '';
  icon = '';
  mdParth = '';
}

export class GuidesPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'developer', title: 'Developer', icon: 'person', mdParth: 'assets/contents/guides/developer.md' },
    { id: 'devops', title: 'DevOps', icon: 'build', mdParth: 'assets/contents/guides/devops.md' },
    { id: 'gitflow', title: 'Gitflow', icon: 'track_changes', mdParth: 'assets/contents/guides/gitflow.md' },
  ];

  secondary: Array<Menu> = [
    { id: 'angular', title: 'Angular', icon: 'code', mdParth: 'assets/contents/guides/angular.md' },
    { id: 'java', title: 'Java', icon: 'code', mdParth: 'assets/contents/guides/java.md' },
  ];

  constructor() { }
  ...
```

We took the opportunity to add id mdPath as well because we know we will need that to point to the markdown file.

Then we are going to create a generic component to load the content from a markdown file.

#### Guides Markdown Component

The new component we want to create is meant to be generic to display the 5 guides as intended. For the moment, we are going to put that in the guides module.

```sh
ng g component guides/guides-markdown-page --module=guides
```

Again Angular CLI in the new component in the GuidesModule declations, but we need to refactoring the GuidesRoutingModule :

From this :

```ts
export const routes: Routes = [
  { path: '', component: GuidesPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: GuidesDeveloperPageComponent, pathMatch: 'full' },
      { path: 'devops', component: GuidesDevopsPageComponent, pathMatch: 'full' },
      { path: 'gitflow', component: GuidesGitflowPageComponent, pathMatch: 'full' },
      { path: 'angular', component: GuidesAngularPageComponent, pathMatch: 'full' },
      { path: 'java', component: GuidesJavaPageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'developer' }
    ]
  }
];
```

We change it to this, replacing Guides*PageComponent to GuidesMarkdownPageComponent :

```ts
...
-import { GuidesDeveloperPageComponent } from './guides-developer-page/guides-developer-page.component';
-import { GuidesGitflowPageComponent } from './guides-gitflow-page/guides-gitflow-page.component';
-import { GuidesDevopsPageComponent } from './guides-devops-page/guides-devops-page.component';
-import { GuidesAngularPageComponent } from './guides-angular-page/guides-angular-page.component';
-import { GuidesJavaPageComponent } from './guides-java-page/guides-java-page.component';
+import { GuidesMarkdownPageComponent } from './guides-markdown-page/guides-markdown-page.component';
...
export const routes: Routes = [
  { path: '', component: GuidesPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: GuidesMarkdownPageComponent, data: {markdown: 'developer'} },
      { path: 'devops', component: GuidesMarkdownPageComponent, data: {markdown: 'devops'} },
      { path: 'gitflow', component: GuidesMarkdownPageComponent, data: {markdown: 'gitflow'} },
      { path: 'angular', component: GuidesMarkdownPageComponent, data: {markdown: 'angular'} },
      { path: 'java', component: GuidesMarkdownPageComponent, data: {markdown: 'java'} },
      { path: '**', redirectTo: 'developer' }
    ]
  }
];
```

When the we try to reach a url with `/guides/<whatever<`, the routing is loading the GuidesMarkdownPageCompoent. Then the component must retrieve that parameter to display the content accordingly.

In the GuidesMarkdownPageComponent class, we need to retrieve that parameter :

```ts
import { Component, OnInit, Input } from '@angular/core';
+import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guides-markdown-page',
  templateUrl: './guides-markdown-page.component.html',
  styleUrls: ['./guides-markdown-page.component.scss']
})
export class GuidesMarkdownPageComponent implements OnInit {

+  @Input()
+  mdPath = 'assets/contents/guides/angular.md';
  
+  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
+    console.log(`markdown page : ${this.route.snapshot.data.markdown}`);
+    const markdown = this.route.snapshot.data.markdown;
+    this.mdPath = this.mdPathDir + markdown + '.md';
+    console.log(`this.mdPath : ${this.mdPath}`);
  }
}
```

We retrieve the value from `route.snapshot.data.markdown`, and that must come from somewhere. Yes we get it from the route. So the that value passed through the route. If we look back at the GuidesRoutingModule :

```ts
      { path: 'developer', component: GuidesMarkdownPageComponent, data: {markdown: 'developer'} },
      { path: 'devops', component: GuidesMarkdownPageComponent, data: {markdown: 'devops'} },
      { path: 'gitflow', component: GuidesMarkdownPageComponent, data: {markdown: 'gitflow'} },
      { path: 'angular', component: GuidesMarkdownPageComponent, data: {markdown: 'angular'} },
      { path: 'java', component: GuidesMarkdownPageComponent, data: {markdown: 'java'} },
```

At first line, we have pass in `data: {markdown: 'developer'}` a value `developer`. We pass a value specific per path, so the GuidesMarkdownPageComponent will retrieve it from the route, then the HTML will use it to load content from a markdown file.

Let's edit the HTML :

```html
<markdown src="{{mdPath}}"></markdown>
```

And voila! We can delete unused components. Then how about tests ?

### Testing GuidesMarkdownPage

Now GuidesMarkdownPage page is display content form the markdown, we need to have a look at tests. Actually, the GuidesMarkdownPage test is failing. Of course, as we use the `<markdown>` tag, we need to configure the TestBed to import required modules to make the test pas :

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
      declarations: [ GuidesMarkdownPageComponent ],
      providers: [
+        MarkdownService,
+        MarkedOptions
      ]
```

Even with this, as we have seen in a earlier step, the test is not passing. Let go through it at next step to fix this.
