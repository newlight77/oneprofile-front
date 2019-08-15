## Forms Validation

Why is Form Validation Needed? Form validation is required to prevent web form abuse by malicious users. Improper validation of form data is one of the main causes of security vulnerabilities. It exposes your website to attacks such as header injections, cross-site scripting, and SQL injections.

We developing any web page, we must do some validation of inputs from users for accuracy and completeness.

Here we are going to use Reactive Forms.

## Reactive Forms

Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a simple form control, progress to using multiple controls in a group, validate form values, and implement more advanced forms.

Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around observable streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

Reactive forms also provide a straightforward path to testing because you are assured that your data is consistent and predictable when requested. Any consumers of the streams have access to manipulate that data safely.

Reactive forms differ from template-driven forms in distinct ways. Reactive forms provide more predictability with synchronous access to the data model, immutability with observable operators, and change tracking through observable streams. If you prefer direct access to modify data in your template, template-driven forms are less explicit because they rely on directives embedded in the template, along with mutable data to track changes asynchronously. See the Forms Overview for detailed comparisons between the two paradigms.

## Registering the reactive forms module

To use reactive forms, import ReactiveFormsModule from the @angular/forms package and add it to your NgModule's imports array, in the module where components use Forms, for instance, we want to use them in the Login component. So we have to import the ReactiveFormsModule in the CoreModule.

```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class CoreModule { }
```

Now we ca use Reactive Forms to validate user inputs.

## Using Reactive forms in Login component

First, import the FormControl :

```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

export class LoginComponent {
  loginForm = new FormControl('');
}
export class LoginComponent implements OnInit {

  constructor() {
      loginForm = new FormControl('');
  }

  ngOnInit() {
  }

}
```

Use the constructor of FormControl to set its initial value, which in this case is an empty string. By creating these controls in your component class, you get immediate access to listen for, update, and validate the state of the form input.

## Register the control in the template

After we create the control in the component class, we must associate it with a form control element in the template. Update the template with the form control using the formControl binding provided by FormControlDirective included in ReactiveFormsModule.

```html
    <mat-card>
        <mat-form-field>
        <input matInput type="email" placeholder="Username" [formControl]="email" />
        </mat-form-field>
        <mat-form-field>
        <input matInput type="password" placeholder="Password" [formControl]="password" />
        </mat-form-field>
        <br />
        <button mat-raised-button color="primary">Signin</button>
    </mat-card>
```

Note:
> For a more detailed list of classes and directives provided by ReactiveFormsModule, see the [Reactive forms API](https://angular.io/guide/reactive-forms#reactive-forms-api) section.

But wait, we may prefer to use a FormBuilder and Validators.

### Using FormBuilder and Validator

Let's go back to the LoginComponent class, and instead of using FormControl class, we are going to use FormBuilder and Validators classes. And we are going to use a FormGroup to group input item in the form. And we still initialize the loginForm in the constructor.

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
  }
}

```

Then, let's see what we should have in the the html :

```html
<mat-card>
    <form [formGroup]="loginForm">
        <mat-form-field>
        <input matInput type="email" placeholder="Username" formControlName="email" />
        </mat-form-field>
        <mat-form-field>
        <input matInput type="password" placeholder="Password" formControlName="password" />
        </mat-form-field>
        <br />
        <button mat-raised-button color="primary">Signin</button>
    </form>
</mat-card>
```

We can see a bit of difference. As we use the GroupForm, we can use `formControlName` insteand of `[formControl]`. That allow use to write the behavior of the control in the form more programatically like this :

```ts
this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
```

Just as a form control instance gives you control over a single input field, a form group instance tracks the form state of a group of form control instances (for example, a form). Each control in a form group instance is tracked by name when creating the form group. The following example shows how to manage multiple form control instances in a single group.

### FormBuilder

Creating form control instances manually can become repetitive when dealing with multiple forms. The FormBuilder service provides convenient methods for generating controls. The FormBuilder service is an injectable provider that is provided with the reactive forms module. We inject it through the constructor.

```ts
import { FormBuilder } from '@angular/forms';
...
constructor(private fb: FormBuilder) { }
```

The FormBuilder service has three methods: control(), group(), and array(). These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays.

### Displaying the form values

You can display the value in these ways:

- Through the valueChanges observable where you can listen for changes in the form's value in the template using AsyncPipe or in the component class using the subscribe() method.
- With the value property. which gives you a snapshot of the current value.
The following example shows you how to display the current value using interpolation in the template.

```html
        <p><label>Email: {{ loginForm.get('email').value }}</label></p>
```

The displayed value changes as you update the form control element. Reactive forms provide access to information about a given control through properties and methods provided with each instance.

We now can replace a form control value. Reactive forms have methods to change a control's value programmatically, which gives you the flexibility to update the value without user interaction. A form control instance provides a setValue() method that updates the value of the form control and validates the structure of the value provided against the control's structure. For example, when retrieving form data from a backend API or service, use the setValue() method to update the control to its new value, replacing the old value entirely.

```ts
defaultEmail() {
  this.loginForm.patchValue({
      email: 'newlight77@gmail.com',
      password: 'password'
    });
}
```

Update the template with a button to simulate an email update. When you click the Update Email button, the value entered in the form control element is reflected as its current value.

```html
<button mat-raised-button color="primary" (click)="defaultEmail()">Default Email</button>
```

So when this button is clicked, the email and password fields are filled with default values. As a result, the signin buttion is activated.

You may notice the default methods use a patchValue method. There are two ways to update the model value:

- Use the setValue() method to set a new value for an individual control. The setValue() method strictly adheres to the structure of the form group and replaces the entire value for the control.

```ts
this.loginForm.get('email').setValue('newlight77@gmail.com');
this.loginForm.get('password').setValue('password');
```

- Use the patchValue() method to replace any properties defined in the object that have changed in the form model.

```ts
this.loginForm.patchValue({
      email: 'newlight77@gmail.com',
      password: 'password'
    });
```

The strict checks of the setValue() method help catch nesting errors in complex forms, while patchValue() fails silently on those errors. But patch is quite useful when we want to simply modify a few attribute - and only them, in an object.

### Displaying the form status

When you add a required field to the form control, its initial status is invalid. This invalid status propagates to the parent form group element, making its status invalid. Access the current status of the form group instance through its status property.

```ts
  <p><label>Form Status: {{ loginForm.status }}</label></p>

```
