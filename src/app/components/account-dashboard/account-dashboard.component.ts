import { JsonPipe } from '@angular/common';
import {Component, OnInit, Signal, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterModule} from '@angular/router';
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
    private router: Router,
    private authService: AuthService,
  ) {
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
    await this.router.navigateByUrl('/login');
  }
}
