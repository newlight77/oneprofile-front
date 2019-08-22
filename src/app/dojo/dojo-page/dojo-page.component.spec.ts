import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';


import { DojoPageComponent } from './dojo-page.component';

describe('DojoPageComponent', () => {
  let component: DojoPageComponent;
  let fixture: ComponentFixture<DojoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ DojoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DojoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tab menus', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const title = compiled.querySelector('div.nav-container>nav');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Coding Dojo');
    expect(title.textContent).toContain('Statements');
    expect(title.textContent).toContain('Bootstrap');
  });
});
