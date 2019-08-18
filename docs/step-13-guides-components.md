## Guides

Now it is time to implement the guides module's pages. As a remind, we wanted to achieve the Crafts platform with guides, section as followed :

- guides
  - develoer
  - gitflow
  - devops
  - angular
  - java

In this section, it's about general purpose guidelines. We want to displays guidelines from markdown, because it uses a very simple formatting syntax, simplier than HTML, Word, PDF or any other Rich Text format.

So far, we have been able to use `ngx-markdown` library to display content form a markdown file. We are going to do just that for guidelines.

Let's start generating the guides modules with it's pages.

```sh
ng g module guides --routing
```

This generated a module with routing. Once the module is created, we want to add this module to the AppRoutingModule route.

```ts
...
export const routes: Routes = [
...
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
+  { path: 'guides', loadChildren: './guides/guides.module#GuidesModule' },
...
];

export class AppRoutingModule { }
```

Now let's generate the components for every Guideline pages.

```sh
ng g component guides/guides-page --module=guides
ng g component guides/guides-developer-page --module=guides
ng g component guides/guides-gitflow-page --module=guides
ng g component guides/guides-devops-page --module=guides
ng g component guides/guides-angular-page --module=guides
ng g component guides/guides-java-page --module=guides
```

Angular CLI would automatically declare them in the GuidesModule. Next, we are going to declare the routes for these pages in GuidesRoutingModule:

```ts
export const routes: Routes = [
  { path: '', component: GuidesPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: GuidesDeveloperPageComponent, pathMatch: 'full' },
      { path: 'gitlfow', component: GuidesDevopsPageComponent, pathMatch: 'full' },
      { path: 'devops', component: GuidesGitflowPageComponent, pathMatch: 'full' },
      { path: 'java', component: GuidesAngularPageComponent, pathMatch: 'full' },
      { path: 'angular', component: GuidesJavaPageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'developer' }
    ]
  }
];
```

### GuidesPage

Let's add a mat-tab-nav-bar int the GuidesPage, so it display a sub menu like we have in HomePage. We use `mat-align-tabs="center"` to center this tab menu.

```ts

<div class="nav-container">
    <nav mat-tab-nav-bar mat-align-tabs="center">
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

    <div class="content-container">
        <router-outlet></router-outlet>
    </div>
</div>
```

Also, we display icons next to the label of the tab menu, but it's sticks to close to the title. We add a flex-spacer to have a little space between them. At last, we may forget something, tests!

### Test

Let's make sure the test is passing. Here we have used material so we need to import materiel module in the TestBed.

```ts

...
+ import { RouterTestingModule } from '@angular/router/testing';
+ import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+ import { MaterialModule } from '../../shared/material.module';
...

describe('GuidesPageComponent', () => {

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
    expect(title.textContent).toContain('DevOps');
    expect(title.textContent).toContain('Gitflow');
    expect(title.textContent).toContain('Angular');
    expect(title.textContent).toContain('Java');
  });
});
```
