import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CtaContentCardsComponent } from './components/cta-content-cards/cta-content-cards.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { authGuard } from './guards/auth.guard';
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  { path: '', component: CtaContentCardsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'account-dashboard',
    component: AccountDashboardComponent,
    canActivate: [authGuard]
  },
  { path: '**', component: CtaContentCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
