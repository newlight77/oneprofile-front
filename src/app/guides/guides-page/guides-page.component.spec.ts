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

    const title = compiled.querySelector('div.nav-container>nav');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Developer');
    expect(title.textContent).toContain('DevOps');
    expect(title.textContent).toContain('Gitflow');
    expect(title.textContent).toContain('Angular');
    expect(title.textContent).toContain('Java');
  });
});
