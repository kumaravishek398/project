import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  repeatPass: string = 'none';

  displayMessage: string = '';

  isAccountCreated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    confirmpassword: new FormControl(''),
  });

  registerSubmit() {
    if (this.Password.value == this.ConfirmPassword.value) {
      console.log('submitted');
      this.repeatPass = 'none';
      this.authService
        .registerUser([
          this.registerForm.value.firstname,
          this.registerForm.value.lastname,
          this.registerForm.value.email,
          this.registerForm.value.mobilenumber,
          this.registerForm.value.password,
        ])
        .subscribe((res) => {
          if (res == 'Success') {
            this.displayMessage = 'Account Created Successfully !!';
            this.isAccountCreated = true;
          } else if (res == 'Already Exist') {
            this.displayMessage = 'Account already exist !';
            this.isAccountCreated = false;
          } else {
            this.displayMessage = 'something went wrong';
            this.isAccountCreated = false;
          }
        });
    } else {
      this.repeatPass = 'inline';
    }
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get MobileNumber(): FormControl {
    return this.registerForm.get('mobilenumber') as FormControl;
  }

  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl {
    return this.registerForm.get('confirmpassword') as FormControl;
  }
}
