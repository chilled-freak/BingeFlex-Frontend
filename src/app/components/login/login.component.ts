import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged(); 
    });
  }

  onSubmit(data) {
    console.log(data);
    const body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.password);
    // this.authService.postData('login', body.toString()).subscribe(response => {
    //   this.authService.setLoader(false);
    //   if (response.data) {
    //     const res = response.data;
    //     localStorage.setItem('token', res.token);
    //     localStorage.setItem('email', res.email);
    //     localStorage.setItem('firstName', res.first_name);
    //     localStorage.setItem('pass', data.password);
    //     this.router.navigateByUrl('/starter');
    //   }
    // }, error => {
    //     this.authService.setLoader(false);
    //     this.toast.error(error);
    //   });
}

onLoginFormValuesChanged() {
  for (const field in this.loginFormErrors) {
    if (!this.loginFormErrors.hasOwnProperty(field)) {
      continue;
    }

    // Clear previous errors
    this.loginFormErrors[field] = {};

    // Get the control
    const control = this.loginForm.get(field);

    if (control && control.dirty && !control.valid) {
      this.loginFormErrors[field] = control.errors;
    }
  }
}

}
