## First Modules and Components 

### First Modules

There is an easy way to add modules :

```sh
ng generate module core
ng generate module shared
ng generate module home
```

This would create 3 classes ./src/app/core/core.module.ts and ./src/app/core/shared.module.ts and ./src/app/home/home.module.ts

Now we can include the module in the app-module.

### Login Component

There are 2 ways to create a component:

Manually create a file called login.component.ts. This component must be registered in app.module.ts. Also don't forget to create the template.
Using the ng-cli. This is an easy method, as it does all the background work for us.

Let's generate component using ng-cli :

```sh
ng generate component core/login --module=core
```

With the option --module, the login component is created under core.

```html
<p>
    <input type="email" placeholder="username" />
    <input type="password" placeholder="Password" />
    <br/>
    <button>Login</button>
</p>
```

### Error-not-found Component

Let's create a 404 component :

```sh
ng generate component core/error-not-found --module=core
```

### Header Component

Let's create a Header component :

```sh
ng generate component core/header --module=core
```

```html
<nav>
    <a routerLink="home" routerLinkActive="active">Home</a> |
    <a routerLink="login" routerLinkActive="active"> Login </a>
</nav>
```

### Footer Component

Let's create a Footer component :

```sh
ng generate component core/footer --module=core
```

```html
<div id="footer" class="footer">
    &copy; Kong To 2018
</div>
```

### Home Component

```sh
ng generate module home
```

Let's create a home component :

```sh
ng generate component home/home-landing-page --module=home
ng generate component home/home-community-page --module=home
ng generate component home/home-events-page --module=home
```

### Creating Routes for the created Components

We new to declare the 2 components in the core module, that are already included in the app-module.

```ts
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeLandingPageComponent },
  { path: '404', component: ErrorNotFoundComponent },
  { path: '**', redirectTo: '404' }
];
```

### App Component with Header and Footer

We now want to add the header and footer to the main page : 

```html
<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
```

This will throw an error complaining that the app-header and app-footer are not found. Things inside the declarations array are components/directives/pipes used within the module itself. If we want to use it outside of that module - for instance the core module - we need to expose the 2 components so that the app.module can see it. They should be added to the exports array :

```ts
  exports: [
    HeaderComponent, FooterComponent
  ]
```

### RouterLink

Now the page is shown with the header and footer, but there is a problem. The router links are not clickable. It's because we have not imported the RouterModule class (which is where RouterLink is declared) into the module which uses this template, for instance it's the CodeModule.

So go to the module that declares the component with this template and add:

```ts
import { RouterModule } from '@angular/router';
```

then add it to your modules imports e.g.

```ts
  imports: [
    CommonModule,
    RouterModule
  ],
```