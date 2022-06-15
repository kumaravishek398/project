import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginAuth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  isUserValid: boolean = false;

  loginSubmitted() {
    this.loginAuth
      .loginuser([this.loginForm.value.email, this.loginForm.value.password])
      .subscribe((res) => {
        if (res == 'Failure') {
          this.isUserValid = false;
          alert('Login Unsuccessfull');
        } else {
          this.isUserValid = true;
          this.loginAuth.setToken(res);
          this.router.navigateByUrl('/customerhome');
        }
      });
  }

  adminSubmitted() {
    this.loginAuth
      .adminUser([this.adminForm.value.email, this.adminForm.value.password])
      .subscribe((res) => {
        if (res == 'Failure') {
          this.isUserValid = false;
          alert('Login Unsuccessfull');
        } else {
          this.isUserValid = true;
          this.loginAuth.setAdminToken(res);
          this.router.navigateByUrl('/adminhome');
        }
      });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get AdminEmail(): FormControl {
    return this.adminForm.get('email') as FormControl;
  }

  get AdminPassword(): FormControl {
    return this.adminForm.get('password') as FormControl;
  }

  simpleAlert() {
    Swal.fire(this.isUserValid ? 'Login Successful' : 'Login Successful');
  }
}
