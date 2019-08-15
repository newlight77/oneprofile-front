import { fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

});
