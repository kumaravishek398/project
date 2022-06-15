import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loantracking',
  templateUrl: './loantracking.component.html',
  styleUrls: ['./loantracking.component.scss'],
})
export class LoantrackingComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  displayUser: string = this.authService.loadCurrentUser();
  logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('/home');
  }
}
