import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { StatementsPageComponent } from './statements-page.component';

describe('StatementsPageComponent', () => {
  let component: StatementsPageComponent;
  let fixture: ComponentFixture<StatementsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ StatementsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tab menus', () => {
    component.statements = [
      { title: 'Statement Title',
        sommary: 'Statement Summary',
        markdown: 'Statement Markdown' },
    ];

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const statements = compiled.querySelector('div.statement-container>div');
    expect(statements).toBeTruthy();

    expect(statements.textContent).toContain('Statement Title');
    expect(statements.textContent).toContain('Statement Summary');
  });
});
