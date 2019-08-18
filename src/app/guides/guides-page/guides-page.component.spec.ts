import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { GuidesPageComponent } from './guides-page.component';

describe('GuidesPageComponent', () => {
  let component: GuidesPageComponent;
  let fixture: ComponentFixture<GuidesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
      declarations: [ GuidesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tab menus', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const primary = compiled.querySelector('div.nav-container>nav.nav-bar-primary');
    expect(primary).toBeTruthy();
    expect(primary.textContent).toContain('Developer');
    expect(primary.textContent).toContain('DevOps');
    expect(primary.textContent).toContain('Gitflow');
    const secondary = compiled.querySelector('div.nav-container>nav.nav-bar-secondary');
    expect(secondary).toBeTruthy();
    expect(secondary.textContent).toContain('Angular');
    expect(secondary.textContent).toContain('Java');
  });
});
