## Dojo Satements

At last step,we added the dojo module and components to display the coding dojo, kata statements and kata bootstrap. The contents are loaded from markdown files. However, displaying a list of statements with links to every single statement is not quite good in terms of user experience. We may want to change the view with a more dynamic view, by creating a more customize kata statements page. Then let's create a new component :

```sh
ng g component dojo/statements-page --module=dojo
```

Angular CLI has update the DojoMulde automatically :

```ts
 import { DojoRoutingModule } from './dojo-routing.module';
 import { DojoPageComponent } from './dojo-page/dojo-page.component';
+import { StatementsPageComponent } from './statements-page/statements-page.component';

 @NgModule({
-  declarations: [DojoPageComponent],
+  declarations: [DojoPageComponent, StatementsPageComponent],
   imports: [
...
```

Then modify the DojoRoutingModule :

```ts
import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { DojoPageComponent } from './dojo-page/dojo-page.component';
+import { StatementsPageComponent } from './statements-page/statements-page.component';

export const routes: Routes = [
  { path: '', component: DojoPageComponent,
    children: [
      { path: '', redirectTo: 'guide', pathMatch: 'full' },
      { path: 'dojo', component: MarkdownComponent, data: { markdown: 'dojo/dojo' } },
+      { path: 'statements', component: StatementsPageComponent, data: { markdown: 'dojo/statements' } },
+      { path: 'statements/:statement', component: StatementsPageComponent, data: { markdown: 'dojo/statements/' } },
      { path: 'bootstraps', component: MarkdownComponent, data: { markdown: 'dojo/bootstraps' } },
    ]
  }
];
...
```

Now we don't need no more the statements.md file, let's delete it ;

```sh
rm ./src/assets/contents/dojo/statements.md
```

Now the statements page should be showing `statements-page works!`. Also we want to display the statement detail at `/dojo/statements/**` (e.g. `/dojo/statements/bowling`), by using the MarkdownComponent. Before we get into details of how to do this, we need to first be able to display the list of statements using boxed widgets. We are going to use clickage `mat-card` (Material) showing the title and summary for each kata statement.

### New Statements View with widgets

We should feel more comfortable to display the list of statements with widgets instead of just a list of links. Let's modify the html :

```html
<div class="statement-container" *ngFor="let statement of statements" routerLink="{{statement.markdown}}"
  routerLinkActive>
  <span class="flex-spacer"></span>

  <div class="statement-card">
    <mat-card>
      <mat-card-header class="statement-card-header">
        <mat-card-title class="statement-card-title">{{statement.title}}</mat-card-title>
      </mat-card-header>
      <mat-card-content class="statement-card-content">
          {{statement.sommary}}
      </mat-card-content>
    </mat-card>
  </div>

  <span class="flex-spacer"></span>
</div>
```

We can note that this view is binded to the model `statements`. So we need to add that attribute in the class :

```ts
...
class Statement {
  title = '';
  sommary = '';
  markdown = '';
}
...
export class StatementsPageComponent implements OnInit {

  statements: Array<Statement> = [
    { title: 'Bowling Game Scoring',
      // tslint:disable-next-line:max-line-length
      sommary: 'Create a program, which, given a valid sequence of rolls for one line of American Ten-Pin Bowling, produces the total score for the game.',
      markdown: 'bowling' },
    { title: 'Pizza Factory',
      sommary: 'Create a program which which acts as a pizzeria, so that given an order from a customer, pizzas are made for delivery.',
      markdown: 'pizza-factory' },
  ];

  constructor() { }
...
}
```

In addition to that, we need to add some CSS to the new component we just created :

```css
.flex-spacer {
  padding-left: 0.3em;
}

.statement-container {
  margin-left: 10px;
  margin-right: 10px;
  display: block;
  box-sizing: border-box;
}

.statement-card {
  box-shadow: 0 1px 1px 0 rgb(0, 0, 0, .10), 0 1px 1px 0 rgb(0, 0, 0, .12);
}

.statement-card-header {
  margin-top: 10px;
  margin-bottom: 10px;
}

.statement-card-title {
  background-color: #00915A; //fallback default color
  background-color: var(--theme-color);
  color: #111;
  color: var(--theme-color);
}

.statement-card-content {
  margin-top: 10px;
  margin-bottom: 10px;
}

.statement-container>* {
  box-sizing: border-box;
}

.statement-container>*:not(:last-child) {
    margin-left: 24px;
    margin-right: 24px;
}
```

Once this is done. The Statements is display the list of 2 statements, as we have only defined 2 statements in the attribute of the class. Later on, we will see how to scrap automatically a list of statements from markdown files, without having to manually update the `statements` attribute each time we add a new kata statement.

### Display a statement by route

Above, we have added this route to the DojoRoutingModule :

```ts
+      { path: 'statements/:statement', component: StatementsPageComponent, data: { markdown: 'dojo/statements/' } },
```

To make this work, we need to make changes to the MarkdownComponent, because we have a bit more logic to define the path to reach the markdown file. With the existing code, the path is simple. With `data: { markdown: 'dojo/statements' }`, we had the full path to the file, it was just missing the suffix. For example, when we go to `/dojo/statements`, the `./src/assets/contents/dojo/statements.md` markdown file is shown. Now we need to append a parameter from the route. For example, when we go to `/dojo/statements/bowling`, we want to load the `./src/assets/contents/dojo/statements/bowling.md` markdown file.

Let's change the MarkdownComponent class :

```ts
export class MarkdownComponent implements OnInit {

-  mdPathDir = 'assets/contents/';
+  mdRootDir = 'assets/contents/';
   mdPath = '';

   ngOnInit() {
     const markdown = this.route.snapshot.data.markdown;
-    this.mdPath = this.mdPathDir + markdown + '.md';
+    this.mdPath = this.mdRootDir + markdown;
+    if (this.route.snapshot.params.statement) {
+      this.mdPath = this.mdPath + this.route.snapshot.params.statement;
+    }
+    this.mdPath = this.mdPath + '.md';
   }
 }
```

Then to make this work, we need to add the markdown files.

```sh
mkdir ./src/assets/dojo
touch ./src/assets/dojo/statements
touch ./src/assets/dojo/statements/bowling.md
touch ./src/assets/dojo/statements/pizza-factory.md
```

### Testing StatementsPageComponent

This step is very much a repetition. Let's see the test code :

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
+import { RouterTestingModule } from '@angular/router/testing';
+import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+import { MaterialModule } from '../../shared/material.module';

import { StatementsPageComponent } from './statements-page.component';

describe('StatementsPageComponent', () => {
  let component: StatementsPageComponent;
  let fixture: ComponentFixture<StatementsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
+      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ StatementsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

+  it('should display tab menus', () => {
+    component.statements = [
+      { title: 'Statement Title',
+        sommary: 'Statement Summary',
+        markdown: 'Statement Markdown' },
+    ];

+    fixture.detectChanges();
+    const compiled = fixture.debugElement.nativeElement;

+    const statements = compiled.querySelector('div.statement-container>div');
+    expect(statements).toBeTruthy();

+    expect(statements.textContent).toContain('Statement Title');
+    expect(statements.textContent).toContain('Statement Summary');
+  });
});
```

### Update MarkdownComponent tests

As we have change a bit the behavior of the MarkdownComponent, we must also update the tests to make them pass. So here are the changes :

```ts
const ActivatedRouteMock = {
  snapshot: {
    data: { markdown: 'developer-test' },
    params: { statement: 'statement-test'}
  }
} as unknown as ActivatedRoute;
...
-describe('GuidesMarkdownPageComponent', () => {
+describe('MarkdownComponent', () => {
   let component: MarkdownComponent;
   let fixture: ComponentFixture<MarkdownComponent>;
...
       providers: [
         MarkdownService,
         MarkedOptions,
-        { provide: ActivatedRoute, useValue: { snapshot: { data: { markdown: 'developer-test' } } } },   +        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
...
   it('should set mdPath from route', () => {
     const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
     activatedRoute.snapshot.data = { markdown: 'developer-test-mdPath' };
+    activatedRoute.snapshot.params = { statement: 'statement-test' };
     component.ngOnInit();
     expect(component.mdPath).toContain('developer-test-mdPath');
   });
```
