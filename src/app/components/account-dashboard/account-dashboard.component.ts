import { JsonPipe } from '@angular/common';
import {Component, OnInit, Signal, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterModule} from '@angular/router';
import {AWSUser, GoogleUser} from 'src/app/models/users';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import { UserAccountDetailsComponent } from '../user-account-details/user-account-details.component';
import { UserAccountCcAmexComponent } from '../user-account-cc-amex/user-account-cc-amex.component';
import { UserAccountCurrentDirectDebitsComponent } from '../user-account-current-direct-debits/user-account-current-direct-debits.component';
import { DirectDebit } from 'src/app/models/cards';
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs";

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [
    JsonPipe,
    MatButtonModule,
    UserAccountDetailsComponent,
    UserAccountCcAmexComponent,
    UserAccountCurrentDirectDebitsComponent,
    RouterModule
  ],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.scss'
})
export class AccountDashboardComponent implements OnInit{

  currentUser$ = signal({});

  constructor(
    // private loggedInUserService: LoggedInUserService,
    private router: Router,
    private authService: AuthService,
  ) {
    // this.currentUser = this.loggedInUserService.getCurrentUser();
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(
        map((user: any) => {
          this.currentUser$.set(user);
        })
      )
      .subscribe();
  }

  async signOut(): Promise<void> {
    await this.authService.logout();
    // this.loggedInUserService.loggedIn.set(false);
    this.router.navigateByUrl('/login');
  }
}
