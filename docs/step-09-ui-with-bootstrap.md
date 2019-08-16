## UI with Bootstrap

Nowadays, almost every frontend developer use use [Bootstrap](https://getbootstrap.com/) to built applications. It allow to build responsive, mobile-first projects on the web with the world’s most popular front-end component library.

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

### Ng-bootstrap

Now we have routes working for home pages (landing, events and community), let's move one to enrich the landing home page. We are going to use Bootstrap. Fortunately the UI bootstrap team has built Angular widgets from the ground up using only Bootstrap 4 CSS with APIs designed for the Angular ecosystem.

Ng-bootstrap requires the bootstrap package being installed, as per [requirement](https://ng-bootstrap.github.io/#/getting-started).

#### Boostrap required

Let's install bootstrap first :

```sh
npm install --save bootstrap
```

Once installed, we have to add the bootstrap css to anguular.json:

```json
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.scss"
            ]
```

Please note that you need only CSS and should not add other JavaScript dependencies like bootstrap.js, jQuery or popper.js as ng-bootstrap's goal is to completely replace them.

#### Install Ng-Bootstrap

Let's install ng-bootstrap :

```sh
npm install --save @ng-bootstrap/ng-bootstrap
```

Once installed we need to import our main module.

```ts
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  ...
  imports: [NgbModule, ...],
  ...
})
export class AppModule {
}
```

> Alternatively we may only import modules with components you need, ex. pagination and alert. The resulting bundle will be smaller in this case.

```ts
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  ...
  imports: [NgbPaginationModule, NgbAlertModule, ...],
  ...
})
export class AppModule {
}
```

But we go keep the first option.

### Adding panels to the home page

Now we have setup Bootstrap in our project, we can use it. Let's edit the HomePageComponent's html.

```html
<div class="container">

    <div class="row" fxLayoutAlign="start start">
        <!-- left panel -->
        <div class="col-12 col-xl-3">
            <mat-card class="panel-card" [style.minHeight]="'110%'" [style.minWidth]="'105%'">
                <mat-card-title>
                    <div class="panel-news-title">About</div>
                </mat-card-title>
                <mat-divider></mat-divider>
                <mat-card-content class="panel-news-content">
                    <img src="https://s.gravatar.com/avatar/2ab8133286eff8a9fb7cd77876135d2f?s=80" height="36%" width="36%">
                    <span>Built by Kong To</span>
                    <div #newsContainer class="callout left"></div>
                </mat-card-content>
            </mat-card>
        </div>

        <!-- content panel -->
        <div class="col-12 col-xl-6">
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

        <!-- right panel -->
        <div class="col-12 col-xl-3">
            <mat-card class="panel-card panel-card-right" [style.minHeight]="'110%'" [style.minWidth]="'105%'">
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
        </div>
    </div>
</div>
```

It has grown a lot bigger. There are 3 parts : left panel, middle container and right panel :

- left panel : display a gravator and a callout container for news
- middle container : display contents frome the child components
- right panel : display upcoming events

Within that html, we access to the model's object `events` and to the methode `getEndTime(event)`, we need to add them to the HomePageComponent class.

```ts
events: Array<Event> = [
{ date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
    title: 'Workshop : Angular from zero to production'},
{ date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
    title: 'Workshop : Begining with Ansible' },
{ date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
    title: 'Workshop : Learn Spring'}
];
...

getEndTime(event: Event): number {
    return event.date.getTime() + event.duration * 60000;
}
```

With this, we can display 3 events in the right panel. And the `getEndTime` allows to compute the end time from the date and duration.

But wait, we may want to decouple the content of upcoming events from the HomePageComponent class. Let's create a model.

```sh
ng generate class home/home --type=model
```

And edit it :

```ts
export class Event {
    date: Date;
    duration: number;
    title = '';
    location = '';
    author = '';
}

export const UPCOMING_EVENTS: Array<Event> = [
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Angular from zero to production'},
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Begining with Ansible' },
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Learn Spring'}
];
```

Then import it in HomePageComponent to use it.

```ts
import { Component, OnInit } from '@angular/core';
import { Event, UPCOMING_EVENTS } from '../home.model';
...
export class HomePageComponent implements OnInit {
  events = UPCOMING_EVENTS;
...
  getEndTime(event: Event): number {
    return event.date.getTime() + event.duration * 60000;
  }
}

```

Finally we need to add a test for the Event displaying in the right panel.

```ts
import { Event } from '../home.model';
...
const EVENTS: Array<Event> = [
  { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
    title: 'Workshop : test'}
];
...
it('should display events', () => {
    component.events = EVENTS;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('h1').textContent).toContain('Welcome to oneprofile');

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

See ? We put the Event class and the UPCOMING_EVENTS object outside of the HomePageComponent class, so when we need to test HomePageComponent, we just set the `events` attribute in our test. Events are data, and that may change over time. We don't want to change our tests associated to the HomePageComponent class when the data change. The HomePageComponent class just need and use an array of events, so it does not acre very much about what is the content. What matter is the behavior of the component.

In our test, we declare a constant EVENTS and set one Event object for test. In the test, we validate that the page is displaying with proper data : title, date and author.

## CSS

One last to add is the CSS.

```css
.flex-spacer {
    // flex-grow: 10;
    padding-left: 0.5em;
}

div.callout {
    height: 80%;
    width: 95%;
    float: left;
}

div.callout {
    background-color: rgb(23, 102, 173);
    background-image: -moz-linear-gradient(top, #444, #444);
    position: relative;
    color: #ccc;
    padding: 10px;
    border-radius: 1px;
    box-shadow: 0px 0px 20px #999;
    margin: 25px 25px 25px 5px;
    height: 320px;
    border: 1px solid #333;
    text-shadow: 0 0 1px #000;
}

.callout::before {
    content: "";
    width: 0px;
    height: 0px;
    border: 0.8em solid transparent;
    position: absolute;
}

.callout.left:before {
    right: -20px;
    top: 40%;
    border-left: 10px solid #444;
}

.panel-card {
    margin: 10px;
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

Now we are set.
