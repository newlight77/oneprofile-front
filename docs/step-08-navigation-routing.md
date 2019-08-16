## Navigation and Routing

We are going to setup a routing as such :

- with url / ou /home, we are routed to the HomeModule, which is lazy loaded
- with url /guides, we are routed to the GuidesModule, which is lazy loaded
- with url /kits, we are routed to the KitsModule, which is lazy loaded -> which doesn't exist yet
- with url /lab, we are routed to the LabModule, which is lazy loaded -> which doesn't exist yet
- with url /blog, we are routed to the BlogModule, which is lazy loaded -> which doesn't exist yet

And :

- with url /home, we are routed to the HomeComponent, which doesn't exist yet so we will create it. This will have navigation with 3 tabs : landing, events and community
- with url /home/landing, we are routed to the HomeLandingComponent
- with url /home/events, we are routed to the HomeCommunityComponent
- with url /home/community, we are routed to the HomeCommunityComponent

We will see later for guides, kits, lab and glob.

Let's start with the home module

### App Routing

First, let's setup the AppRouting: 

```ts
 import { Routes, RouterModule } from '@angular/router';
 import { LoginComponent } from './core/login/login.component';
 import { ErrorNotFoundComponent } from './core/error-not-found/error-not-found.component';
-import { HomeLandingPageComponent } from './home/home-landing-page/home-landing-page.component';
-import { HomeCommunityPageComponent } from './home/home-community-page/home-community-page.component';
-import { HomeEventsPageComponent } from './home/home-events-page/home-events-page.component';


 export const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
-  { path: 'home', component: HomeLandingPageComponent, pathMatch: 'full' },
-  { path: 'home/community', component: HomeCommunityPageComponent, pathMatch: 'full' },
-  { path: 'home/events', component: HomeEventsPageComponent, pathMatch: 'full' },
+  { path: 'home', loadChildren: './home/home.module#HomeModule' },
   { path: '404', component: ErrorNotFoundComponent },
   { path: '**', redirectTo: '404' }
 ];
```

We ca not that instead of having this :

```ts
  { path: 'home', component: HomeLandingPageComponent, pathMatch: 'full' },
  { path: 'home/community', component: HomeCommunityPageComponent, pathMatch: 'full' },
  { path: 'home/events', component: HomeEventsPageComponent, pathMatch: 'full' },
```

We will put this instead :

```ts
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
```

By doing so, we can remove the imports below:

```ts
import { HomeLandingPageComponent } from './home/home-landing-page/home-landing-page.component';
import { HomeCommunityPageComponent } from './home/home-community-page/home-community-page.component';
import { HomeEventsPageComponent } from './home/home-events-page/home-events-page.component';
```

As a result, when we go to / or /home, we are routed to the HomeModule which is lazy loaded.

### Home Routing

Nex step is to add a HomeRoutingModule. As the HomeModule already exist, we can not use angular CLI to do so. Let's manually create it :

```sh
touch ./src/app/home/home-routing.module.ts
```

Now edit it :

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCommunityPageComponent } from './home-community-page/home-community-page.component';
import { HomeEventsPageComponent } from './home-events-page/home-events-page.component';
import { HomeLandingPageComponent } from './home-landing-page/home-landing-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: HomeLandingPageComponent, pathMatch: 'full' },
      { path: 'community', component: HomeCommunityPageComponent, pathMatch: 'full' },
      { path: 'events', component: HomeEventsPageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'landing' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

```

In the HomeModule, add the HomeRoutingModule in the imports. And in HomeRoutingModule, we would have defined the routing as explained earlier.

For the path '' (when going to /home), we reach the HomePageComponent, which we need to create. And that path has children. It means when the urls is /home/**, it is routed to one of the child which matches.

### HomePageComponent

Now, let's start creating a HomeComponent.

```sh
ng generate component home/home-page --module=home
```

In the html, we add this :

```html
<div class="container">
    <div class="nav-container">
        <nav mat-tab-nav-bar>
            <a mat-tab-link routerLink="landing" routerLinkActive>
                <mat-icon aria-label="Menu" class="material-icons">home</mat-icon>
                <span class="flex-spacer"></span>
                Welcome
            </a>
            <a mat-tab-link routerLink="events" routerLinkActive>
                <mat-icon aria-label="Menu" class="material-icons">event</mat-icon>
                <span class="flex-spacer"></span>
                Events
            </a>
            <a mat-tab-link routerLink="community" routerLinkActive>
                <mat-icon aria-label="Menu" class="material-icons">groupe</mat-icon>
                <span class="flex-spacer"></span>
                Community
            </a>
        </nav>
        <router-outlet></router-outlet>
    </div>
</div>
```

We use Angular material again, we have now 3 tabs as link for the landing, events and comunity pages. Just a little detail, the icon is too close to the title of the tile in the tab bar. We may want to add some space. There is a `<span class="flex-spacer"></span>` between the icon and title, but it's does nothing yet. Let's add this style to the csss to have it in effect :

```css
.flex-spacer {
    padding-left: 0.5em;
}
```

Also, we have to make the test pass for the HomePageComponent. In this component, we are using material and routing, so we have to import these 3 modules : RouterTestingModule, NoopAnimationsModule, MaterialModule.

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

### Run it

Let's run the application with ng serve. When going to http://localhost:4200, it is redirected to http://localhost:4200/home. Then is shows the Menu in blue and it says `home-landing-page works!`. When clicking on Welcome, `home-landing-page works!`, when clicking on events, `home-events-page works!` is shown, and when clikcing on community, `home-community-page works!` is shown.

That's good. Our routing is working just fine. Also when running `jest`, all tests pass.
