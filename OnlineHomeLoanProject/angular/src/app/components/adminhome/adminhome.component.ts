import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/services/customer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss'],
})
export class AdminhomeComponent implements OnInit {
  constructor(public custDetailsService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.custDetailsService.getCustomers();
  }

  submit(form: NgForm) {
    this.updateCustomer(form);
  }

  populateCustomer(selectedCustomer: Customer) {
    this.custDetailsService.customerData = Object.assign({}, selectedCustomer);
  }

  updateCustomer(myForm: NgForm) {
    this.custDetailsService.updateStatus().subscribe((d) => {
      this.resetForm(myForm);

      this.refreshData();
      Swal.fire('Status Updated !');
      console.log('status updated');
    });
  }

  resetForm(myForm: NgForm) {
    myForm.form.reset();

    this.custDetailsService.customerData = new Customer();
  }

  refreshData() {
    this.custDetailsService.getCustomers();
  }

  logOut() {
    this.custDetailsService.removeAdminToken();
    this.router.navigateByUrl('/home');
  }
}
