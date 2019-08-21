import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';

import { GuidesMarkdownPageComponent } from './guides-markdown-page.component';


describe('GuidesMarkdownPageComponent', () => {
  let component: GuidesMarkdownPageComponent;
  let fixture: ComponentFixture<GuidesMarkdownPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      declarations: [ GuidesMarkdownPageComponent ],
      providers: [
        MarkdownService,
        MarkedOptions,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesMarkdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
