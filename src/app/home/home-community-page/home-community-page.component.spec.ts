import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';

import { HomeCommunityPageComponent } from './home-community-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('HomeCommunityPageComponent', () => {
  let component: HomeCommunityPageComponent;
  let fixture: ComponentFixture<HomeCommunityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      declarations: [ HomeCommunityPageComponent ],
      providers: [
        MarkdownService,
        MarkedOptions
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should containt markdown in html', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('markdown');
    expect(title).toBeTruthy();
  });
});
