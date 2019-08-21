## Kits Components

Now it is time to implement the Kits module's pages. In this section, it's about providing tools for software development purpose. it will be composed of the following pages :

- kits
  - develoer
  - ci
  - cd
  - angular
  - java

Let's start generating the kits modules with it's pages.

```sh
ng g module kits --routing
```

This generated a module with routing. Once the module is created, we want to add this module to the AppRoutingModule route.

```ts
...
export const routes: Routes = [
...
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
+  { path: 'kits', loadChildren: './kits/kits.module#KitsModule' },
...
];

export class AppRoutingModule { }
```

Now let's generate the components for every kits pages.

```sh
ng g component kits/kits-page --module=kits
```

Angular CLI would automatically declare them in the KitsModule. Next, we are going to declare the routes for these pages in KitsRoutingModule:

```ts
...
...
import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { KitsPageComponent } from './kits-page/kits-page.component';

export const routes: Routes = [
  { path: '', component: KitsPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: MarkdownComponent, data: { markdown: 'kits/developer' } },
      { path: 'ci', component: MarkdownComponent, data: { markdown: 'kits/ci' } },
      { path: 'cd', component: MarkdownComponent, data: { markdown: 'kits/cd' } },
      { path: 'java', component: MarkdownComponent, data: { markdown: 'kits/java' } },
      { path: 'angular', component: MarkdownComponent, data: { markdown: 'kits/angular' } },
    ]
  }
];
```

### KitsPage

Let's add a mat-tab-nav-bar int the KitsPage, so it display a sub menu like we have in HomePage. We use `mat-align-tabs="center"` to center this tab menu, same as for guides pages.

```ts
<div class="nav-container">
  <span class="flex-spacer"></span>
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
  selector: 'app-kits-page',
  templateUrl: './kits-page.component.html',
  styleUrls: ['./kits-page.component.scss']
})
export class KitsPageComponent implements OnInit {

  primary: Array<Menu> = [
    { id: 'developer', title: 'Developer', icon: 'build', mdParth: 'assets/contents/kits/developer.md' },
    { id: 'ci', title: 'CI', icon: 'build', mdParth: 'assets/contents/kits/ci.md' },
    { id: 'cd', title: 'CD', icon: 'build', mdParth: 'assets/contents/kits/cd.md' },
  ];

  secondary: Array<Menu> = [
    { id: 'angular', title: 'Angular', icon: 'code', mdParth: 'assets/contents/kits/angular.md' },
    { id: 'java', title: 'Java', icon: 'code', mdParth: 'assets/contents/kits/java.md' },
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
mkdir ./src/assets/kits
touch ./src/assets/kits/developer.md
touch ./src/assets/kits/ci.md
touch ./src/assets/kits/cd.md
touch ./src/assets/kits/angular.md
touch ./src/assets/kits/java.md
```

### Test

Let's make sure the test is passing. Here we have used material so we need to import materiel module in the TestBed.

```ts

...
+ import { RouterTestingModule } from '@angular/router/testing';
+ import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+ import { MaterialModule } from '../../shared/material.module';
...

describe('KitsPageComponent', () => {

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
    expect(title.textContent).toContain('Developer');
    expect(title.textContent).toContain('CI');
    expect(title.textContent).toContain('CD');
    expect(title.textContent).toContain('Angular');
    expect(title.textContent).toContain('Java');
  });
});
```
