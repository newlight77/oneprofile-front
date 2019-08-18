## Moving left and right Panels

Here we will see how to move views from one page to another. Let's move the left and right panels out from the HomePageComponent because we want them to be displayed all the time.

We can just move the HTMl from one place to another. But doing so would add complexity to the one component. It's better to move that HTMl into a new component then include that in the NavigationComponent. That way we would favour the Single Responsibility Principle (refer to SOLID readings for more in depth details).

Now let's create 2 components :

```sh
ng g component core/left-panel --module=core
ng g component core/right-panel --module=core
```

## Left Panel

Let's move the HTML from the HomePage HTML :

```html
<mat-card class="panel-card" [style.minHeight]="'105%'" [style.minWidth]="'105%'">
  <mat-card-title>
    <div class="panel-news-title">About</div>
  </mat-card-title>
  <mat-divider></mat-divider>
  <mat-card-content class="panel-news-content">
    <div class="portrait">
      <img src="https://s.gravatar.com/avatar/2ab8133286eff8a9fb7cd77876135d2f?s=80" height="50%" width="50%">
      <div>
        <span><i>by</i><b> Kong To</b></span>
      </div>
    </div>
    <div class="social-media">
      <a href="https://twitter.com/newlight77">
        <img src="{{icons.twitter.color_base64_24px}}" alt="Kong To @ twitter">
      </a>
      <a href="https://github.com/newlight77">
        <img src="{{icons.github.color_base64_24px}}" alt="Kong To @ github">
      </a>
      <a href="https://linkedin.com/kongto">
        <img src="{{icons.linkedin.color_base64_24px}}" alt="Kong To @ linkedin">
      </a>
      <a href="newlight77@gmail.com">
        <img src="{{icons.email.color_base64_24px}}" alt="Email">
      </a>
    </div>
    <div #newsContainer></div>
  </mat-card-content>
```

We need to move the SCSS from the HomePage SCSS :

```css
.mat-list .mat-list-item {
    height: 32px; /* default is 72px */
}

.portrait {
    text-align: center;
}

.portrait img {
    margin-top: 12px;
    margin-bottom: 12px;
    background-position: center;
    background-size: cover;
    object-fit: cover;
    border-radius:50%;
}

.social-media {
    text-align: center;
    margin-top: -24px;
    margin-bottom: 2px;
}

.panel-card {
    // position: sticky;
    top: 0;
    overflow: hidden;
    z-index: 10;
    // margin: 10px;
    box-shadow: 0 2px 5px 0 rgb(0,0,0,.16), 0 2px 10px 0 rgb(0,0,0,.12);
}

.panel-card mat-divider {
    color: #9D9D9D;
    margin-top: 12px;
    margin-bottom: 12px;
}

@media (min-width: 1200px) {
    // if xl screen, all 3 panels are side by side, same height
    .panel-card {
        height: 95%;
    }
}

.panel-news-title {
    background-color: #00915A; //fallback default color
    background-color: var(--theme-color);
    color: #111;
    color: var(--theme-color);
    font-size: 22px;
    margin: -16px;
    padding: 16px;
    text-align: center;
}

.panel-news-content {
    margin-top: 30px;
}

.panel-news-content div {
    margin-bottom: 30px;
}
```

Then, in the component class we need to declare the attribute `icons` :

```ts
import { Component, OnInit } from '@angular/core';
import { ICONS } from '../../shared/icons.model';
...
export class LeftPanelComponent implements OnInit {

+  icons = ICONS;

  constructor() { }
...
```

### Left Panel Test

Here again we have used Material, we must import MaterialModule in the TestBed.

```ts
+ import { RouterTestingModule } from '@angular/router/testing';
+ import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+ import { MaterialModule } from '../../shared/material.module';

...
    TestBed.configureTestingModule({
+      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ LeftPanelComponent ]
    })

```

Then, we add a test to check the presence of the portrait :

```ts
  it('should display portrait', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const title = compiled.querySelector('mat-card-content>div.portrait>div');
    expect(title).toBeTruthy();
    expect(title.textContent).toEqual('by Kong To');

  });
```

### Right Panel

Let's move the HTML from the HomePage HTML :

```html
<mat-card class="panel-card panel-card-right" [style.minHeight]="'105%'" [style.minWidth]="'105%'">
  <mat-card-title>
    <div class="panel-events-title">Upcoming events</div>
  </mat-card-title>
  <mat-divider></mat-divider>
  <mat-card-content class="panel-events-content">
    <div *ngFor="let event of events">
      <!-- title -->
      <div class="event-title">
        <label>{{event.title}}</label>
      </div>
      <!-- date -->
      <div class="event-date">
        <mat-icon class="material-icons">calendar_today</mat-icon>
        <span>{{event.date | date : 'EEE, MM d H:mm'}} - {{getEndTime(event) | date : 'H:mm'}}</span>
      </div>
      <!-- author -->
      <div class="event-author">
        <span>{{event.author}} @ {{event.location}}</span>
      </div>
      <hr>
    </div>
  </mat-card-content>
</mat-card>
```

We need to move the SCSS from the HomePage SCSS :

```css
.panel-card {
    // position: sticky;
    top: 0;
    overflow: hidden;
    z-index: 10;
    // margin: 10px;
    box-shadow: 0 2px 5px 0 rgb(0,0,0,.16), 0 2px 10px 0 rgb(0,0,0,.12);
}

.panel-card-right {
    overflow-y: auto;
    max-height: 600px;
}

@media (min-width: 1200px) {
    // if xl screen, all 3 panels are side by side, same height
    .panel-card {
        height: 95%;
    }
}

.panel-card mat-divider {
    color: #9D9D9D;
    margin-top: 12px;
    margin-bottom: 12px;
}

.panel-events-title {
    background-color: #00915A; //fallback default color
    background-color: var(--theme-color);
    color: #111;
    color: var(--theme-color);
    font-size: 22px;
    margin: -16px;
    padding: 16px;
    text-align: center;
}

.panel-events-content {
    margin-top: 40px;
}

.panel-events-content div {
    margin-bottom: 20px;
}

.event-title {
    color: #4D4D4D;
    font-weight: 500;
}

.event-title label {
    margin-top: 10px;
}

.event-date {
    display: flex;
    margin-top: 2px;
    margin-bottom: 2px;
}

.event-date mat-icon {
    margin-right: 5px;
    color: #4D4D4D;
    font-size: 14px;
}

.event-date span {
    color: rgb(0,0,0,.54);
}

.event-author {
    display: flex;
    margin-top: -8px;
    margin-bottom: -8px;
}

.event-author span {
    color: rgb(0,0,0,.54);
}
```

Then, in the component class we need to declare the attribute `icons` :

```ts
import { Component, OnInit } from '@angular/core';
+ import { Event, UPCOMING_EVENTS } from './events.model';

...
export class LeftPanelComponent implements OnInit {

+  events = UPCOMING_EVENTS;

  constructor() { }
...
+  getEndTime(event: Event): number {
+    return event.date.getTime() + event.duration * 60000;
+  }
...
```

Note that we Events class is no more related to the HomePageComponent. It just does not make sense to leave it there. So then, let's move it out from there. As it's now used int the RightPanelComponent, but it's also used by the HomeEventsPage, we should put it in the SharedModule. Then rename the file properly, to `events.model.ts`.

### Right Panel Test

Same here, we have used Material, we must import MaterialModule in the TestBed.

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
+import { RouterTestingModule } from '@angular/router/testing';
+import { NoopAnimationsModule } from '@angular/platform-browser/animations';
+import { MaterialModule } from '../../shared/material.module';

import { RightPanelComponent } from './right-panel.component';
+import { Event } from '../../shared/events.model';

+const EVENTS: Array<Event> = [
+  { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
+    title: 'Workshop : test', content: ''}
+];
...
  beforeEach(async(() => {
    TestBed.configureTestingModule({
+      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ RightPanelComponent ]
    })
...
```

Then, we add a test to check that the events are displayed :

```ts
  it('should display events', () => {
    component.events = EVENTS;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const title = compiled.querySelector('mat-card-content>div>div.event-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toEqual('Workshop : test');

    const date = compiled.querySelector('mat-card-content>div>div.event-date');
    expect(date).toBeTruthy();
    expect(date.textContent).toContain('Mon, 09 9 14:30 - 15:30');

    const author = compiled.querySelector('mat-card-content>div>div.event-author');
    expect(author).toBeTruthy();
    expect(author.textContent).toEqual('Kong To @ Paris');

  });
```

### HomePageComponent

We need to clean up the HomePageComponent as the left and right panels view has been moved out.

So now, this is what is we keep.

```html
<div class="nav-container">
  <nav mat-tab-nav-bar mat-align-tabs="center">
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

  <div class="content-container">
    <router-outlet></router-outlet>
  </div>
</div>

```

This is what is we keep in the SCSS.

```css
.flex-spacer {
    // flex-grow: 10;
    padding-left: 0.5em;
}

nav {
    position: sticky;
    position: -webkit-sticky; /* For macOS/iOS Safari */
    top: 0; /* Sets the sticky toolbar to be on top */
    z-index: 1000; /* Ensure that your app's content doesn't overlap the toolbar */
}

.nav-container {
    margin-left: 6px;
    margin-right: -6px;
}

.content-container {
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 12px;
    margin-right: 12px;
}
```

And in the Typescript class, we remove everthing, getting back to what what originally generated.

```ts
 import { Component, OnInit } from '@angular/core';
-import { Event, UPCOMING_EVENTS } from '../home.model';
-import { ICONS } from '../../shared/icons.model';

...
export class HomePageComponent implements OnInit {

-  icons = ICONS;
-  events = UPCOMING_EVENTS;

   constructor() { }
...
-  getEndTime(event: Event): number {
-    return event.date.getTime() + event.duration * 60000;
-  }
 }
```

### HomePageComponent Test

Of course, we need to update the test class. We remove the test that was checking the events on the right panel ('should display events'). Then, we may want to add a test to check the presence of the tab menu.

```ts
it('should display tab meu', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const title = compiled.querySelector('nav');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Welcome');
    expect(title.textContent).toContain('Events');
    expect(title.textContent).toContain('Community');
  });
```

### AppComponent Test

As we have added LeftPanelComponent and RightPanelComponent that are included within the NivagationComponent's HTML, we need to declare them them in the TestBed.

```ts
 import { NavigationComponent } from './core/navigation/navigation.component';
+import { LeftPanelComponent} from './core/left-panel/left-panel.component';
+import { RightPanelComponent} from './core/right-panel/right-panel.component';
...
       declarations: [
         AppComponent,
-        NavigationComponent
+        NavigationComponent,
+        LeftPanelComponent,
+        RightPanelComponent
       ],
...
```

Now all tests have passed. We are done with this refactoring.

### What have changed ?

To summarise the changes we have made for this refactor task, we have all theses files changes as shown below. We have created 2 new components, while modifying the NavivationComponent, HomePageComponent. 

```js
	new file:   docs/step-14-left-right-panels.md
	modified:   src/app/app.component.spec.ts
	modified:   src/app/core/core.module.ts
	new file:   src/app/core/left-panel/left-panel.component.html
	new file:   src/app/core/left-panel/left-panel.component.scss
	new file:   src/app/core/left-panel/left-panel.component.spec.ts
	new file:   src/app/core/left-panel/left-panel.component.ts
	modified:   src/app/core/navigation/navigation.component.html
	modified:   src/app/core/navigation/navigation.component.spec.ts
	new file:   src/app/core/right-panel/right-panel.component.html
	new file:   src/app/core/right-panel/right-panel.component.scss
	new file:   src/app/core/right-panel/right-panel.component.spec.ts
	new file:   src/app/core/right-panel/right-panel.component.ts
	modified:   src/app/home/home-events-page/home-events-page.component.ts
	modified:   src/app/home/home-page/home-page.component.html
	modified:   src/app/home/home-page/home-page.component.scss
	modified:   src/app/home/home-page/home-page.component.spec.ts
	modified:   src/app/home/home-page/home-page.component.ts
	renamed:    src/app/home/home.model.spec.ts -> src/app/shared/events.model.spec.ts
	renamed:    src/app/home/home.model.ts -> src/app/shared/events.model.ts
```

It seems to be a lot, bu in fact, it's quite easy to do all these changes. More importantly, it does not take much time to do so. Nevertheless, it's important to keep the code clean and well structured.
