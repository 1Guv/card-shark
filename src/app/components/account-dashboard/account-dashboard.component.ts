import { SocialAuthService } from '@abacritt/angularx-social-login';
import { JsonPipe } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GoogleUser } from 'src/app/models/users';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import { StripeService } from 'ngx-stripe';
import { XanoStripeService } from 'src/app/services/xano-stripe.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [
    JsonPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.scss'
})
export class AccountDashboardComponent {

  currentUser: Signal<GoogleUser>;

  constructor(
    private loggedInUserService: LoggedInUserService,
    private authService: SocialAuthService,
    private router: Router,
    private stripeService: StripeService,
    private xanoStripeService: XanoStripeService
  ) {
    this.currentUser = this.loggedInUserService.getCurrentUser();
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl('');
  }

  onCheckOut(subscriptionPrice: string) {
    console.log('subscriptionPrice:', subscriptionPrice);
    this.xanoStripeService
      .createCheckoutSession(subscriptionPrice)
      .pipe(
        switchMap((session: any) => {
          console.log('session:', session);
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        })
      )
      .subscribe(result => {
        console.log('result:', result);
        if (result.error) {
          console.log('Error', result.error.message);
          alert(result.error.message);
        }
      })
  }

}
