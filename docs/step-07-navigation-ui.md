## Navigation and UI

Now we are going to make the UI nicer. First, let's work on the navbar. so far, we have create a Footer and a Header components. We now need a naviation component.

### Navigation Component

Let's create a Header component :

```sh
ng generate component core/navigation --module=core
```

We can now use `mat-toolbar` for the top menu. And we add buttons with routerLink to land on other pages.

```html
<mat-sidenav-container fullscreen>

        <!-- <app-header></app-header> -->

        <mat-toolbar id="appToolbar" color="primary">
                <button mat-button routerLink="/">
                    <a style="font-family:cursive;font-size:220%;color:rgb(255, 104, 93);">One</a>
                    <a style="font-family:cursive;font-size:220%;color:rgb(1, 213, 250);">Profile</a>
                </button>

                <span class="toolbar-filler"></span>
                <button id="button-guides" mat-button routerLink="guides">Guides</button>
                <button id="button-kits" mat-button routerLink="kits">Kits</button>
                <button id="button-lab" mat-button routerLink="lab">Lab</button>
                <button id="button-blog" mat-button routerLink="blog">Blog</button>

                <button id="button-login" mat-button *ngIf="!isAuthenticated()" (click)="login()">Login</button>
                <button id="button-logout" mat-button *ngIf="isAuthenticated()" (click)="logout()">Logout</button>
        </mat-toolbar>

        <router-outlet></router-outlet>

        <app-footer></app-footer>

</mat-sidenav-container>
```

Note that there are 2 calls to the methods login() and logout(). They must exist in the class. 

```ts
  isAuthenticated(): boolean {
    return false;
  }

  login() {
  }

  logout() {
  }
```

Besides, the Navigation component is declared in the CoreModule, but it's not going to work yet. This new component is only reachable whithin the CoreModule. However, the CoreModule is imported within AppModule and the AppComponent which includes the tag <app-navigation> in the html won't be able to load as it does not see the NavigationComponent. To fix that, we need to export it in the CoreModule :

```ts
exports: [
    ...
    NavigationComponent
  ]
```

Also, we have to make the test pass for the NaviationComponent. In this component, we are using material and routing, so we have to import these 3 modules : RouterTestingModule, NoopAnimationsModule, MaterialModule.

```ts
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

...
TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ NavigationComponent ]
    })
```

### AppComponent

Now we have a nice top menu, but tests have been broken because we have change the UI on the AppComponent. Let`s fix them too. In this AppComponent, we have removed the <app-header> and <app-footer>, they are now included in the navigation component. We have to do the same in the test. Also, because we include the <app-naviation> which use material and routing, we have to import these 3 modules as well : RouterTestingModule, NoopAnimationsModule, MaterialModule.

```ts
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

...
TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ AppComponent, NavigationComponent ]
    })
```
