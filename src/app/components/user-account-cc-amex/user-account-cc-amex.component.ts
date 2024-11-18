import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { XanoStripeService } from 'src/app/services/xano-stripe.service';

@Component({
  selector: 'app-user-account-cc-amex',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
     <mat-card class="my-3">
          <div class="mx-2 my-2 card-one">
              <mat-card-header>
                  <mat-card-title>Cards</mat-card-title>
                  <mat-card-subtitle>
                      You have {{ currentAmex().length }} American Express cards right now!
                  </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                  <div class="my-3">

                  </div>
              </mat-card-content>
              <mat-card-actions>
                  <button mat-raised-button color="primary" (click)="onCheckOut('10')">ADD AMEX</button>
              </mat-card-actions>
          </div>
      </mat-card>
  `,
  styleUrl: './user-account-cc-amex.component.scss'
})
export class UserAccountCcAmexComponent {
  currentAmex = input<any>();

  constructor(
    private xanoStripeService: XanoStripeService
  ) {}

  onCheckOut(subscriptionPrice: string) {
    console.log('subscriptionPrice:', subscriptionPrice);
    // this.xanoStripeService
    //   .createCheckoutSession(subscriptionPrice)
    //   .pipe(
    //     switchMap((session: any) => {
    //       console.log('session:', session);
    //     })
    //   )
    //   .subscribe(result => {
    //     console.log('result:', result);
    //     if (result.error) {
    //       console.log('Error', result.error.message);
    //       alert(result.error.message);
    //     }
    //   })
  }
}
