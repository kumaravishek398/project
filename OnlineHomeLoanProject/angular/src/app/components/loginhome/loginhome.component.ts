import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss'],
})
export class LoginhomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  DisplayText: string = '';
  isApplicationCreated: boolean = false;

  alertWithSuccess() {
    Swal.fire(
      'Thank You',
      this.isApplicationCreated
        ? 'Your Application is Submitted Successfully !'
        : 'Application is Already Submitted !',
      'success'
    );
  }

  customerForm = new FormGroup({
    employment: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    monthlyincome: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(5),
      Validators.maxLength(8),
    ]),
    loanamount: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
    ]),
    tenure: new FormControl('', [
      Validators.required,
      Validators.pattern('([1-9]|1[0-9]|20)'),
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    adhaar: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(12),
      Validators.maxLength(12),
    ]),
    pan: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });

  customerSubmitted() {
    if (this.Adhaar.value !== null) {
      this.authService
        .loanAplication([
          this.customerForm.value.employment,
          this.customerForm.value.organization,
          this.customerForm.value.monthlyincome,
          this.customerForm.value.loanamount,
          this.customerForm.value.tenure,
          this.customerForm.value.firstname,
          this.customerForm.value.lastname,
          this.customerForm.value.gender,
          this.customerForm.value.dob,
          this.customerForm.value.mobilenumber,
          this.customerForm.value.adhaar,
          this.customerForm.value.pan,
        ])
        .subscribe((res) => {
          if (res == 'Success') {
            this.DisplayText = 'Application Submitted Successfully';
            this.isApplicationCreated = true;
          } else if (res == 'Already Exist') {
            this.DisplayText = 'Application already submitted';
            this.isApplicationCreated = false;
          } else {
            this.DisplayText = 'Something went wrong';
            this.isApplicationCreated = false;
          }
        });
    }
  }

  get Employement(): FormControl {
    return this.customerForm.get('employment') as FormControl;
  }
  get Organization(): FormControl {
    return this.customerForm.get('organization') as FormControl;
  }
  get MonthlyIncome(): FormControl {
    return this.customerForm.get('monthlyincome') as FormControl;
  }
  get LoanAmount(): FormControl {
    return this.customerForm.get('loanamount') as FormControl;
  }
  get Tenure(): FormControl {
    return this.customerForm.get('tenure') as FormControl;
  }
  get FirstName(): FormControl {
    return this.customerForm.get('firstname') as FormControl;
  }
  get LastName(): FormControl {
    return this.customerForm.get('lastname') as FormControl;
  }
  get Gender(): FormControl {
    return this.customerForm.get('gender') as FormControl;
  }
  get DateOfBirth(): FormControl {
    return this.customerForm.get('dob') as FormControl;
  }
  get MobileNumber(): FormControl {
    return this.customerForm.get('mobilenumber') as FormControl;
  }
  get Adhaar(): FormControl {
    return this.customerForm.get('adhaar') as FormControl;
  }
  get Pan(): FormControl {
    return this.customerForm.get('pan') as FormControl;
  }

  displayUser: string = this.authService.loadCurrentUser();

  logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('/home');
  }
}
