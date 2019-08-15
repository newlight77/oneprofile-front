## Component Testing

In addition to the AppComponent, we have created 7 components, so far:

- ErrorNotFound
- FooterComponent
- HeaderComponent
- LoginComponent
- HomeCommunityComponent
- HomeEventsComponent
- HomeLandingPageComponent

Let's go through them and add test to cover them all, because we have broken many tests. Actually AppComponent and LoginComponent tests are failing. Let`s fix them.

### AppComponent

AppComponent is main the component (which render the router-outlet selector) and aggregates all other components as a whole.

In order to run a test that load the main component, the router-outlet selector must be overriden by a stub. Otherwise, it will complain with 'Error: No base href set' as it try to locate the href tag in index.html. To do so, let's declare a stub component and include it the TestBed context.

```ts
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { AppModule } from './app.module';

import { MaterialModule } from './material.module';

describe('AppComponent', () => {

  let component:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule,
        MaterialModule
      ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component    = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'oneprofile-admin-angular7'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('oneprofile-admin-angular7');
  });

  it('should render title in a h1 tag', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const item = compiled.querySelector('div.container-fluid>div.footer');
    expect(item).toBeTruthy();
  });
});
```

If we look at the AppComponent html, we had add <app-header> and <app-footer> so it means it uses the HeaderComponent and FooterComponent. In our test, we need to declare them in the TestingModule, inside the call to beforeEach.

```ts
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
...

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
    }).compileComponents();
  }));
```

Now the test is passing.

## Login component

The same principle applies here. This component is using Material and Reactive Forms within it, so we need to declare them when configuring the TestingModule. In addition to these 2, Material requires an AnimationsModule, and for testing purpose we can use NoopAnimationsModule.

```ts
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
...
beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MaterialModule
      ],
      declarations: [ LoginComponent ],
    })
    .compileComponents();
  }));
```

We can see how to import the 3 modules in the TestBed configuration. From there, existing test can  pass. Now, let's add more tets to convert some corner cases :

```ts
  it('should have blank props', fakeAsync(() => {
    expect(component.loginForm.get('email').value).toEqual('');
    expect(component.loginForm.get('password').value).toEqual('');
  }));

  it('should have default props', fakeAsync(() => {
    component.defaultEmail();
    expect(component.loginForm.get('email').value).toEqual('newlight77@gmail.com');
    expect(component.loginForm.get('password').value).toEqual('password');
    expect(component.loginForm.status).toEqual('VALID');
  }));

  it('form status should be invalid from form updated with invalid input ', fakeAsync(() => {
    component.loginForm.get('email').setValue('invalid email');
    expect(component.loginForm.status).toEqual('INVALID');
  }));
```

Now we have all tests passed for all components, so from now on, every component must be tests.
