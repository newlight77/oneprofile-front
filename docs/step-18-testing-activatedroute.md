## Testing: ActivatedRoute 

While testing your components, it may be good to mock this service.

### Mock ActivatedRoute

If the user select an item within a list, the snapshot strategy can be used in your detail component. The route.snapshot provides the initial value of the route data. The data can be accessed this way:

```ts
ngOnInit() {
    console.log(`markdown page : ${this.route.snapshot.data.markdown}`);
    const markdown = this.route.snapshot.data.markdown;
    this.mdPath = this.mdPathDir + markdown + '.md';
    console.log(`this.mdPath : ${this.mdPath}`);
  }
```

### Mock service

We can create a class to stub the ActivatedRoute :

```ts
class ActivatedRouteStub {
  get snapshot() {
    return {
      data: { markdown: 'developer-test' }
    };
  }
}
```

### Test the ActivatedRoute

First we need to make available our ActivatedRouteStub in our test and pass testing parameters.

```ts
beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      declarations: [ GuidesMarkdownPageComponent ],
      providers: [
        MarkdownService,
        MarkedOptions,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

beforeEach(() => {
    fixture = TestBed.createComponent(GuidesMarkdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.data = {data: 'developer'};  
  });
```

Here, we provide a stub class to the providers (with `useClass`) so it will inject it to the component class by constructot.

Now run the test :

```ts
  it('should create', () => {
    expect(component).toBeTruthy();
  });
```

Everything is set, however there is an issue. The test is not passing yet.

### Error : Can't resolve all parameters for Component

With Angular 8.1 and `jest-preset-angular`, the error below telling it cannot resolve the constructor dependencies ([see issue on github](https://github.com/thymikee/jest-preset-angular/issues/288)) :

```text
Can't resolve all parameters for AppComponent: (?).
```

The work around is to update the tsconfig.spec.json :

```json
tsconfig.spec.json

   "compilerOptions": {
+    "emitDecoratorMetadata": true,
     "outDir": "./out-tsc/spec",
```

The Angular CLI takes over some of the TS -> JS transpilation using transformers, especially when it's about the decorators and reflection. To make ts-jest not lose the parameter information upon compilation without the AST transformation, you can set "emitDecoratorMetadata": true in your tsconfig.spec.json for now.

This would make the trick.

### Alternatives with providers

Alternatively, we can use a factory instead of `useClass`. Using a factory is somewhat easier.

```ts
function ActivatedRouteFactory() {
  return (): unknown => {
    return {
      snapshot: { data: { markdown: 'developer-test' } }
    };
  };
}
...
    providers: [
        MarkdownService,
        MarkedOptions,
       { provide: ActivatedRoute, useFactory: ActivatedRouteFactory },
    ]
```

Or we can use a value with `useValue` :

```ts
const ActivatedRouteMock = {
  snapshot: { data: { markdown: 'developer-test' } }
} as unknown as ActivatedRoute;
...
    providers: [
        MarkdownService,
        MarkedOptions,
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },

```

Or simply with this :

```ts
    providers: [
        MarkdownService,
        MarkedOptions,
        {provide: ActivatedRoute, useValue: { snapshot: { data: { markdown: 'developer-test' } } } },
```

The test should be passing.

### Adding tests

First, let's add this test to make sure the html contains a `<markdown>` tag..

```ts
it('should containt markdown in html', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('markdown');
    expect(title).toBeTruthy();
});
```

Then add this test to check it the mdPath attribute retrieved from the ActivatedRout. 

```ts
it('should set mdPath from route', () => {
    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.snapshot.data = { markdown: 'developer-test-mdPath' };
    component.ngOnInit();
    console.log(`mdPath : ${component.mdPath}`);
    expect(component.mdPath).toContain('developer-test-mdPath');
});
```

Now, all our tests are ok.
