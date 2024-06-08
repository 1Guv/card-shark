import { SocialAuthService } from '@abacritt/angularx-social-login';
import { JsonPipe } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GoogleUser } from 'src/app/models/users';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import { UserAccountDetailsComponent } from '../user-account-details/user-account-details.component';
import { UserAccountCcAmexComponent } from '../user-account-cc-amex/user-account-cc-amex.component';
import { UserAccountCurrentDirectDebitsComponent } from '../user-account-current-direct-debits/user-account-current-direct-debits.component';
import { DirectDebit } from 'src/app/models/cards';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [
    JsonPipe,
    MatButtonModule,
    UserAccountDetailsComponent,
    UserAccountCcAmexComponent,
    UserAccountCurrentDirectDebitsComponent
  ],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.scss'
})
export class AccountDashboardComponent {

  currentUser: Signal<GoogleUser>;

  constructor(
    private loggedInUserService: LoggedInUserService,
    private authService: SocialAuthService,
    private router: Router
  ) {
    this.currentUser = this.loggedInUserService.getCurrentUser();
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl('');
  }
}
