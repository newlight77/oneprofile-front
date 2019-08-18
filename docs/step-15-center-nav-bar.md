## Centering Top Nav Bar

This step is quite easy. We have prepared a grid with the left and right panels, and in the middle the content to display. The content would any pages depending on user's navigatio. With that design, the content and sub menu per content is centered with `mat-align-tabs="center"` for the `nav` tag :

```html
<nav mat-tab-nav-bar mat-align-tabs="center">
```

As such, the top nav bar should be centered as well. It would nicer and more adapted for user experience (UX). Here is about design and choice. 

Now let's simply add this css to the SCSS file for the NavigationComponent :

```css
.toolbar-flex {
  flex: 1 0.5 auto;
}
```

Then add these 2 lines :

```html
  <mat-toolbar id="appToolbar" class="mat-elevation-z6" color="primary">
+    <span class="toolbar-flex"></span>
    <button mat-button routerLink="/">
      <a style="font-family:cursive;font-size:220%;color:rgb(255, 104, 93);">One</a>
      <a style="font-family:cursive;font-size:220%;color:rgb(1, 213, 250);">Profile</a>
    </button>
    ...
    <button id="button-login" mat-button *ngIf="!isAuthenticated()" (click)="login()">Login</button>
    <button id="button-logout" mat-button *ngIf="isAuthenticated()" (click)="logout()">Logout</button>
+    <span class="toolbar-flex"></span>
  </mat-toolbar>
```

That's it.

### Guides Nav Bar

In addition to the modification above. Let's improve also a bit the Guides sub-menu. With 5 items in the menu, some of them are hidden with a scroll. We don't want that. In terms of UX, we may want to display all 5 items all the time.

Let's split this `<nav>` in 2. Instead of having this :

```html
...
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
  <span class="flex-spacer"></span>
...
```

Now we have this :

```html
...
  <span class="flex-spacer"></span>
  <nav mat-tab-nav-bar mat-align-tabs="center" class="nav-bar-primary">
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
...
```

Also, let's change a bit the style :

```css
...
+nav {
+    margin-top: -16px;
+    margin-bottom: -16px;
+}
```

With this `margin-top` and `margin-bottom`, with the `<span class="flex-spacer"></span>`, the 2 sub-menu lines are closer to each other, while having a pretty good distance from the top menu and the content pages.

As a consequence, the test must be updated :

```ts
  it('should display tab menus', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const primary = compiled.querySelector('div.nav-container>nav.nav-bar-primary');
    expect(primary).toBeTruthy();
    expect(primary.textContent).toContain('Developer');
    expect(primary.textContent).toContain('DevOps');
    expect(primary.textContent).toContain('Gitflow');
    const secondary = compiled.querySelector('div.nav-container>nav.nav-bar-secondary');
    expect(secondary).toBeTruthy();
    expect(secondary.textContent).toContain('Angular');
    expect(secondary.textContent).toContain('Java');
  });
```
