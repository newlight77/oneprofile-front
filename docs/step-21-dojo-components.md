## Dojo Components

Insteand of using the `lab` name, it's better to use the concept of Dojo. Now it is time to implement the Dojo module and pages. In this section, it's about providing kata, topics for developers to practices themselves on coding skils. it will be composed of the following pages :

- dojo
  - Coding Dojo
  - Kata Statements
  - Kata Bootstraps

Let's start generating the dojo modules with it's pages.

```sh
ng g module dojo --routing
```

This generated a module with routing. Once the module is created, we want to add this module to the AppRoutingModule route.

```ts
...
export const routes: Routes = [
...
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
+  { path: 'dojo', loadChildren: './dojo/dojo.module#DojoModule' },
...
];

export class AppRoutingModule { }
```

Now let's generate the components for every dojo pages.

```sh
ng g component dojo/dojo-page --module=dojo
```

Angular CLI would automatically declare them in the DojoModule. Next, we are going to declare the routes for these pages in DojoRoutingModule:

```ts
...
...
import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { DojoPageComponent } from './dojo-page/dojo-page.component';

export const routes: Routes = [
  { path: '', component: DojoPageComponent,
    children: [
      { path: '', redirectTo: 'guide', pathMatch: 'full' },
      { path: 'dojo', component: MarkdownComponent, data: { markdown: 'dojo/dojo' } },
      { path: 'statements', component: MarkdownComponent, data: { markdown: 'dojo/statements' } },
      { path: 'bootstraps', component: MarkdownComponent, data: { markdown: 'dojo/bootstraps' } },
    ]
  }
];
```

### DojoPage

Let's add a mat-tab-nav-bar int the DojoPage, so it display a sub menu like we have in KitsPage. We use `mat-align-tabs="center"` to center this tab menu, same as for kits pages.

```ts
<div class="nav-container">
  <span class="flex-spacer"></span>
  <nav mat-tab-nav-bar mat-align-tabs="center" class='nav-bar-primary'>
    <a mat-tab-link *ngFor="let menu of primary" routerLink="{{menu.id}}" routerLinkActive class='nav-bar-tab-link-primary'>
      <mat-icon aria-label="Menu" class="material-icons">{{menu.icon}}</mat-icon>
      <span class="flex-spacer"></span>
      {{menu.title}}
    </a>
  </nav>
  <span class="flex-spacer"></span>

  <div class="content-container">
    <router-outlet></router-outlet>
  </div>
</div>
```

Also, we display icons next to the label of the tab menu, but it's sticks to close to the title. We add a flex-spacer to have a little space between them.

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

Also, again the same code for the class :

```ts
import { Component, OnInit } from '@angular/core';

class Menu {
  id = '';
  title = '';
  icon = '';
  mdParth = '';
}

@Component({
  selector: 'app-dojo-page',
  templateUrl: './dojo-page.component.html',
  styleUrls: ['./dojo-page.component.scss']
})
export class DojoPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'dojo', title: 'Coding Dojo', icon: 'code' },
    { id: 'statements', title: 'Kata Statements', icon: 'assignment' },
    { id: 'bootstraps', title: 'Kata Bootstraps', icon: 'offline_bolt' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

```

### Kits Module

We need to import what is required to make these pages work as expected.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
+import { SharedModule} from '../shared/shared.module';
+import { MaterialModule} from '../shared/material.module';

+import { KitsRoutingModule } from './kits-routing.module';
+import { KitsPageComponent } from '../kits/kits-page/kits-page.component';


@NgModule({
  declarations: [
    KitsPageComponent
  ],
  imports: [
    CommonModule,
+    SharedModule,
+    MaterialModule,
+    KitsRoutingModule
  ]
})
export class KitsModule { }

```

### Markdown files

To make the created pages work, the markdown files have to be present under ./src/assets :

```sh
mkdir ./src/assets/dojo
touch ./src/assets/dojo/dojo.md
touch ./src/assets/dojo/statements.md
touch ./src/assets/dojo/bootstraps.md
```

### Navigation update

As we have rename lab to dojo, we the nav bar routerlinks must be updated :

```html
...
  <mat-toolbar id="appToolbar" class="mat-elevation-z6" color="primary">
...
    <button id="button-guides" mat-button routerLink="guides">Guides</button>
    <button id="button-kits" mat-button routerLink="kits">Kits</button>
+    <button id="button-lab" mat-button routerLink="dojo">Dojo</button>
    <button id="button-blog" mat-button routerLink="blog">Blog</button>
...

</mat-sidenav-container>
```

### Test

Let's make sure the test is passing. Here we have used material so we need to import materiel module in the TestBed.

```ts

...
+ import { RouterTestingModule } from '@angular/router/testing';
+ import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+ import { MaterialModule } from '../../shared/material.module';
...

describe('DojoPageComponent', () => {

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
    expect(title.textContent).toContain('Coding Dojo');
    expect(title.textContent).toContain('Statements');
    expect(title.textContent).toContain('Bootstrap');
  });
});
```
