import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  currentAdmin: BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl = 'https://localhost:7167/api/';
  jwtHelperService = new JwtHelperService();

  listCustomer: Customer[] = []; //fot getting data customer details

  customerData: Customer = new Customer(); //for post/insert and update/put data

  getCustomers() { //used for take collection of data
    this.http
      .get(this.baseUrl + 'Customer')
      .toPromise()
      .then((res) => (this.listCustomer = res as Customer[]));
  }

  updateStatus() { //updating the status
    return this.http.put(
      `${this.baseUrl + 'Customer'}/${this.customerData.customerID}`,
      this.customerData
    );
  }

  registerUser(user: Array<String>) {
    return this.http.post(
      this.baseUrl + 'User/CreateUser',
      {
        FirstName: user[0],
        LastName: user[1],
        Email: user[2],
        MobileNumber: user[3],
        Password: user[4],
      },
      {
        responseType: 'text',
      }
    );
  }

  loginuser(loginInfo: Array<String>) {
    return this.http.post(
      this.baseUrl + 'User/LoginUser',
      {
        Email: loginInfo[0],
        Password: loginInfo[1],
      },
      {
        responseType: 'text',
      }
    );
  }

  adminUser(adminInfo: Array<String>) {
    return this.http.post(
      this.baseUrl + 'User/AdminLogin',
      {
        AdminEmailID: adminInfo[0],
        AdminPassword: adminInfo[1],
      },
      {
        responseType: 'text',
      }
    );
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.loadCurrentUser();
    return token;
  }

  setAdminToken(token: string) {
    localStorage.setItem('admin_token', token);
    this.loadCurrentAdmin();
    return token;
  }

  loadCurrentUser() {
    const token = localStorage.getItem('access_token');
    const userInfo =
      token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo
      ? {
          id: userInfo.id,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
          mobile: userInfo.mobile,
        }
      : null;
    this.currentUser.next(data);
    return userInfo.firstname;
  }

  loadCurrentAdmin() {
    const token = localStorage.getItem('admin_token');
    const adminInfo =
      token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = adminInfo
      ? {
          id: adminInfo.id,
          email: adminInfo.email,
        }
      : null;
    this.currentAdmin.next(data);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ||
      localStorage.getItem('admin_token')
      ? true
      : false;
  }

  isActive() {
    return localStorage.getItem('access_token');
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  removeAdminToken() {
    localStorage.removeItem('admin_token');
  }

  loanAplication(cust: Array<String>) {
    return this.http.post(
      this.baseUrl + 'User/CustomerApplication',
      {
        Employement: cust[0],
        Organization: cust[1],
        MonthlyIncome: cust[2],
        LoanAmount: cust[3],
        Tenure: cust[4],
        FirstName: cust[5],
        LastName: cust[6],
        Gender: cust[7],
        DateOfBirth: cust[8],
        MobileNumber: cust[9],
        Adhaar: cust[10],
        Pan: cust[11],
      },
      {
        responseType: 'text',
      }
    );
  }
}
