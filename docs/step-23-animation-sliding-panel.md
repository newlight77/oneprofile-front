## Sliding Panel

One of my favourite Angular features is animation because it can greatly improve the user experience. Animation is also possible without any framework, but having well integration with ease of use make it more acessible to developers. Animations in Angular are probably easier than we may think. During this step, we will make the the existing left and right side panels slide.

First of all, we need to declare some imports in the component responsible for the animation. Let's start with the left side panel, this will be our LeftPanelComponent.

```ts
import {Component, trigger, state, style, transition, animate} from '@angular/animations';
```

And create the togglePanel method :

```ts
  togglePanel() {

  }
```

Since our side navigation is located on the left side of the screen, but not completely on the left. We want it be moved to the most left, with a click. Then slide back on toggle. In other words, we simply move the navigation off the canvas to the right side by using `transform:translate`. On toggle the navigation will slide back in by resetting the transform to zero. The animation is declared in the component decorator in `left-panel.component.ts` and then applied to the planned HTML element using the `[@]` syntax.

Add the animation definition:

```ts
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
+  animations: [
+    trigger('slideInOut', [
+      state('right', style({
+        transform: 'translate3d(-50%, 0, 0)'
+      })),
+      state('left', style({
+        transform: 'translate3d(0, 0, 0)'
+      })),
+      transition('left => right', animate('400ms ease-in-out')),
+      transition('right => left', animate('400ms ease-in-out'))
+    ]),
+  ]
})
```

The `trigger()` function creates a named handle `slideInOut` that we can use in the template to start off the animation. The `state()` functions define the states that our component can take — either left or right. When component takes one of the states the styles defined for that state applied to the animated element. The `transition()` function defines how component transitions from one state to another.

Now we need a variable that holds the current state of the animation (`left` or `right`). The initial state should be `left` in order to position the panel where it was set by default. Also we are adding now the logic of the `togglePanel` method, it will simply toggle the states value.

Another interesting thing we use here is PaneType. We leverage TypeScript’s string literal types combined with union types to limit possible values that can be assigned to activePane property. This increases type safety in our application.

```ts

type PaneType = 'left' | 'right';
...

export class LeftPanelComponent implements OnInit {

  icons = ICONS;
+  panelState = 'left';

  constructor() { }

  ngOnInit() {
  }

  togglePanel() {
+    this.panelState = this.panelState === 'left' ? 'right' : 'left';
  }
}
```

At last, we add the animation to the component call in our HTML markup using the `[@]` syntax with `<div class='row' [@slideInOut]="panelState">`. The `slideInOut` part matches the animations name we have set for the trigger in the component class, and the given parameter is the value (`left` or `right`) that matches the state of the panel from our component.

To attach animation to an element in the template we use special syntax:

```html
<div class='row' [@slideInOut]="panelState">
  <div class="col-12 col-xl-10">
    <mat-card class="panel-card" [style.minHeight]="'105%'" [style.minWidth]="'105%'">
...
    </mat-card>
  </div>
  <div class="col-12 col-xl-2">
      <mat-icon class="material-icons" (click)="togglePanel()">keyboard_arrow_{{panelState}}</mat-icon>
  </div>
</div>

```

When `panelState` property changes, slide animation is applied to the current div element. The values of the `panelState` property should match one of the defined animation states (`PaneType` with `left` or `right`).

In our case the left panel is next the center page, when the value of the `panelState` is updated to the `left`, animation kicks in and applies styles defined for the left state to the div element. `translate3d(-50%)` moves the div along the horizontal axis on the left direction. Normally it would happen immediately, but because of the transition we defined it lasts for `400 milliseconds`, the user sees a smooth animation.

### Right panel

For the right panel, we can just repeat the same steps.

### Webanimations Polyfill

There is one thing to remember, this animation requires the webanimations polyfill, so make sure to include it when packagint the application for production.
