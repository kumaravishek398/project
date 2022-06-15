import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FaqComponent } from './components/faq/faq.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeComponent } from './components/home/home.component';
import { LoantrackingComponent } from './components/loantracking/loantracking.component';
import { LoginComponent } from './components/login/login.component';
import { LoginhomeComponent } from './components/loginhome/loginhome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'features',
    component: FeaturesComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'customerhome',
    component: LoginhomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'loantracking',
    component: LoantrackingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
