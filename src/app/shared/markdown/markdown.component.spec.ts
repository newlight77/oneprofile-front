import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';

import { MarkdownComponent } from './markdown.component';

const ActivatedRouteMock = {
  snapshot: {
    data: { markdown: 'developer-test' },
    params: { statement: 'statement-test'}
  }
} as unknown as ActivatedRoute;

class ActivatedRouteStub {
  get snapshot() {
    return {
      data: { markdown: 'developer-test' },
      params: { statement: 'statement-test'}
    };
  }
}

function ActivatedRouteFactory() {
  return (): unknown => {
    return {
      snapshot: { data: { markdown: 'developer-test' } }
    };
  };
}

class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('MarkdownComponent', () => {
  let component: MarkdownComponent;
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      declarations: [ MarkdownComponent ],
      providers: [
        MarkdownService,
        MarkedOptions,
        // { provide: ActivatedRoute, useValue: { snapshot: { data: { markdown: 'developer-test' } } } },
        // { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        // { provide: ActivatedRoute, useFactory: ActivatedRouteFactory },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should contain markdown in html', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('markdown');
    expect(title).toBeTruthy();
  });

  it('should set mdPath from route', () => {
    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.snapshot.data = { mdSubDir: 'developer-test-mdPath' };
    activatedRoute.snapshot.params = { mdFilename: 'statement-test' };
    component.ngOnInit();
    expect(component.mdPath).toContain('developer-test-mdPath');
    expect(component.mdPath).toContain('statement-test');
  });
});
