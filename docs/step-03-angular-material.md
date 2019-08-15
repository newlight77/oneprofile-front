## Angular material

To use material, we first need to install Angular Material, Angular CDK and Angular Animations.

```sh
npm install --save @angular/material @angular/cdk @angular/animations
```

Then, we need to configure animations. Once the animations package is installed, import BrowserAnimationsModule into our application to enable animations support, the AppModule class.

```ts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
```

Alternatively, you can disable animations by importing NoopAnimationsModule.

```ts
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [NoopAnimationsModule],
  ...
})
```

Now, we can import the each Material component as per our needs, e.g. :

```ts
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  ...
  imports: [MatButtonModule, MatCheckboxModule],
  ...
})
```

Alternatively, we can create a separate NgModule that imports and then re-exports all of the Angular Material components that you will use in our application. By exporting them again, other modules can simply include your CustomMaterialModule wherever Material components are needed, and automatically get all of the exported Material modules. A good place for importing/exporting the application-wide Material modules is the SharedModule. Here is an example of that [MAteridalModule class](https://github.com/angular/components/blob/master/src/material-examples/material-module.ts).

### Import all Material Module

We need to import the MaterialModule class in whichever module compoents requires Material components. For example, we can import that MaterialModule class in the AppModule class, if there is an imported component used Material. __Here there is no need__.

Example :

```ts
...
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

@NgModule({
...
  imports: [
...
    BrowserAnimationsModule,
    MaterialModule,
...
})
export class AppModule { }

```

That way, we can any Material component.

### Themes

At last, we can include a theme. Including a theme is required to apply all of the core and theme styles to your application. Themes are required to add styles to the Material components used in our application. We can either use a custom or a pre-built theme.

Themes are CSS files. To find all the available pre-built themes we can check the @angular/material/prebuilt-themes folder in the node_modules folder in your project:

- deeppurple-amber.css
- indigo-pink.css
- pink-bluegrey.css
- purple-green.css

Simply add this to the style.css file to use deeppurple-amber theme :

```css
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
```

If we don't want to use the Angular CLI, we can include a prebuilt theme via a <link> element in your index.html. For more information on theming and instructions on how to create a custom theme, see the theming [guide](https://material.angular.io/guide/theming).

### Gesture Support

Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures. We can add HammerJS to our application :

```sh
npm install --save hammerjs
```

After installing, import it on app's entry point (e.g. main.ts) :

```ts
import 'hammerjs';
```

### Material Icons

If you want to use the mat-icon component with the official Material Design Icons, load the icon font in your index.html.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

For more information on using Material Icons, check out the [Material Icons Guide](https://google.github.io/material-design-icons/).

Note that mat-icon supports any font or svg icons; using Material Icons is one of many options.

### Using Material in Login page

As we are going to use Material components in the Login component, included int he CoreModule, we are going to import in the CoreModule.

```ts
...
import { MaterialModule } from './shared/material.module';

@NgModule({
...
  imports: [
...
    MaterialModule,
...
})
export class CoreModule { }

```

Then edit login.component.html :

```html
<mat-card>
    <mat-form-field>
      <input matInput type="email" placeholder="Username"  />
    </mat-form-field>
    <mat-form-field>
      <input matInput type="password" placeholder="Password" />
    </mat-form-field>
    <br />
    <button mat-raised-button color="primary">Signin</button>
</mat-card>
```

And edit also the LoginComponent class :

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
```