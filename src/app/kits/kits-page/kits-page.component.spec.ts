import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { KitsPageComponent } from './kits-page.component';

describe('KitsPageComponent', () => {
  let component: KitsPageComponent;
  let fixture: ComponentFixture<KitsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsPageComponent ],
      imports: [ RouterTestingModule, NoopAnimationsModule, MaterialModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsPageComponent);
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
    expect(primary.textContent).toContain('CI');
    expect(primary.textContent).toContain('CD');
    const secondary = compiled.querySelector('div.nav-container>nav.nav-bar-secondary');
    expect(secondary).toBeTruthy();
    expect(secondary.textContent).toContain('Angular');
    expect(secondary.textContent).toContain('Java');
  });
});
